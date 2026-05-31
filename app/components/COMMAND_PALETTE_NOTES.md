# Command palette — investigation notes (2026-05-28)

Notes from debugging why `DUMMY_COMMANDS = make_commands()` breaks the palette. Instrumentation and experimental fixes were reverted; see `make_commands()` in `command_palette.py` (still present, not wired by default).

## Symptom

Assigning real data works in Python but the palette stops responding (Cmd/Ctrl+K does nothing useful / component never becomes interactive).

```python
commands = make_commands()
DUMMY_COMMANDS = commands
```

With the small hard-coded `DUMMY_COMMANDS` list, the palette works.

## Root cause (confirmed with runtime logs)

**Payload size.** `make_commands()` builds the full navigation tree at import time:

- ticker → (company?) → statement → year  
- ~20,339 top-level tickers + companies  
- Nested `options` through all years  

Serializing that tree for the Streamlit custom component is about **208 MB** of JSON (`payload_bytes: 207962314` in logs). The bridge to the browser and/or kbar never recovers; the bundled React code never reached healthy `buildActions` with that payload.

This is not an import failure: `make_commands()` completes in ~1.5s when run from the repo root (`streamlit run app/Home.py`).

## Other issues (design / follow-up)

1. **Frontend depth** — `CommandPalette.jsx` only registers **two levels**: each command’s direct `options` become kbar children. Deeper nodes (statement → year, or company under multi-company tickers) are never registered unless the JSX is changed to recurse (as in the partial fix below).

2. **Label map** — `_command_labels_by_id()` only maps immediate children. Deep selection IDs would not get friendly labels in `SELECTED_COMMAND_KEY` without a recursive walk.

3. **Parquet path** — `data/sheets.parquet` is relative to process cwd. Works from repo root; fails if cwd is `app/`.

4. **ID joining** — nested ids concatenate with `?` repeatedly (e.g. `?ticker=X?company=Y?statement=...`). Prefer consistent `&` separators when building query-style ids.

## Partial solutions tried (reverted)

### 1. Shallow command list (~1.7 MB)

- `make_commands()` returned only top-level tickers and companies (no nested `options`).
- `@st.cache_data` + absolute path to parquet.
- Palette worked again; user searches ticker/company and selects a leaf id like `?ticker=AAPL`.

Trade-off: no statement/year drill-down in the palette until a second phase is added.

### 2. Recursive kbar registration (frontend)

- `commandToActions()` walked nested `options` and set `perform` on leaf nodes.
- Required `npm run build` in `frontend/` to update `app/assets/js/command_palette.js`.

Needed together with a **small** payload; recursion alone does not fix 208 MB.

### 3. Middle ground (not fully shipped)

- Dropping **year** nesting only shrinks JSON to ~11 MB / ~122k nodes — still heavy for kbar.
- Practical target: keep payload under ~2 MB and action count in a range kbar can search (thousands, not hundreds of thousands).

## Recommended direction

1. **Do not** send the full tree through `data={"commands": ...}` on every run.
2. **Do** use one or more of:
   - Top-level search only (ticker/company), then navigate in-app or a second step.
   - Lazy children: user picks a root in the palette → Streamlit reruns with a **small** `commands` slice for that subtree.
   - Precomputed flat leaves for a bounded set (e.g. statement + default year only), not every year × every company.
3. **Update** `CommandPalette.jsx` to recurse if nested `options` remain part of the schema.
4. **Cache** parquet reads with `@st.cache_data` and resolve parquet via `Path(__file__).resolve().parents[2] / "data" / "sheets.parquet"`.

## How to re-enable real commands safely

Uncomment at bottom of `command_palette.py` only after payload is bounded:

```python
# commands = make_commands()
# DUMMY_COMMANDS = commands
```

Verify in Python before wiring:

```python
import json
from components.command_palette import make_commands  # after shaping API
print(len(json.dumps({"commands": make_commands()})))
```

Aim for **well under ~5 MB**; ~1–2 MB for ~20k shallow rows was acceptable in testing.
