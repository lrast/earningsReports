from __future__ import annotations

import json
import math

from typing import TYPE_CHECKING

import altair as alt
import polars as pl
import streamlit as st
from humanize import scientific

from components.controls import symexp, symlog
from page_state import get_data_selection

if TYPE_CHECKING:
    import pandas as pd

# --- constants ---

MIN_TABLE_HEIGHT = 400
ROW_HEIGHT = 35
CHART_HEIGHT = 280

PAD_FRACTION = 0.12
MIN_SYMLOG_PAD = 0.05
SINGLE_VALUE_PAD_FRACTION = 0.15


# --- y-axis helpers ---

def scientific_tick_label(value: float) -> str:
    if value == 0:
        return "0"
    label = scientific(abs(value), precision=1)
    return f"-{label}" if value < 0 else label


def scientific_axis(ticks: list[float]) -> alt.Axis:
    if not ticks:
        return alt.Axis(values=None, labelExpr=alt.Undefined)

    labels = [scientific_tick_label(tick) for tick in ticks]
    return alt.Axis(
        values=ticks,
        labelExpr=f"{json.dumps(labels)}[indexof({json.dumps(ticks)}, datum.value)]",
    )


def _linear_ticks_for_domain(
    data_min: float, data_max: float, *, count: int = 5
) -> tuple[tuple[float, float], list[float]]:
    if data_min == data_max:
        half = max(abs(data_min) * SINGLE_VALUE_PAD_FRACTION, 1.0)
        lo, hi = data_min - half, data_max + half
    else:
        pad = (data_max - data_min) * PAD_FRACTION
        lo, hi = data_min - pad, data_max + pad

    if not math.isfinite(lo) or not math.isfinite(hi):
        return (lo, hi), [0.0]

    span = hi - lo
    raw_step = span / max(count - 1, 1)
    magnitude = 10 ** math.floor(math.log10(raw_step))
    residual = raw_step / magnitude
    step = (10 if residual > 5 else 5 if residual > 2 else 2 if residual > 1 else 1) * magnitude

    start = math.floor(lo / step) * step
    end = hi + step * 0.01
    tick_count = math.ceil((end - start) / step)
    ticks = sorted({
        *(start + i * step for i in range(tick_count) if start + i * step <= end),
        *( [0.0] if lo <= 0 <= hi else [] ),
    })

    if ticks:
        return (min(ticks[0], lo), max(ticks[-1], hi)), ticks
    return (lo, hi), ticks


def _symlog_ticks_for_domain(
    data_min: float, data_max: float
) -> tuple[tuple[float, float], list[float]]:
    if data_min == data_max:
        center = symlog(data_min) if data_min != 0 else 0.0
        pad = max(MIN_SYMLOG_PAD, SINGLE_VALUE_PAD_FRACTION)
        domain_lo, domain_hi = symexp(center - pad), symexp(center + pad)
    else:
        s_lo, s_hi = symlog(data_min), symlog(data_max)
        span = s_hi - s_lo
        pad = max(span * PAD_FRACTION, MIN_SYMLOG_PAD)
        domain_lo, domain_hi = symexp(s_lo - pad), symexp(s_hi + pad)

    ticks = [0.0] if domain_lo < 0 < domain_hi else []

    if data_max > 0:
        pos_lo = domain_lo if domain_lo > 0 else max(domain_hi * 1e-6, 1e-30)
        ticks.extend(
            mantissa * 10**exp
            for exp in range(
                math.floor(math.log10(pos_lo)),
                math.ceil(math.log10(domain_hi)) + 1,
            )
            for mantissa in (1, 2, 5)
            if pos_lo <= mantissa * 10**exp <= domain_hi
        )

    if data_min < 0:
        neg_lo, neg_hi = abs(domain_hi), abs(domain_lo)
        ticks.extend(
            -(mantissa * 10**exp)
            for exp in range(
                math.floor(math.log10(neg_lo)),
                math.ceil(math.log10(neg_hi)) + 1,
            )
            for mantissa in (1, 2, 5)
            if neg_lo <= mantissa * 10**exp <= neg_hi
        )

    ticks = sorted(set(ticks)) or [data_min, data_max]
    return (domain_lo, domain_hi), ticks


# --- chart helpers ---

def value_y_encoding(chart_data: pd.DataFrame, *, log_scale: bool = False) -> alt.Y:
    """Build Altair y-encoding with data-driven linear or symlog scale."""
    values = chart_data["value"].dropna()
    values = values[values.map(math.isfinite)]
    if values.empty:
        raise ValueError("No finite values to chart.")

    data_min, data_max = values.min(), values.max()

    if log_scale:
        domain, ticks = _symlog_ticks_for_domain(data_min, data_max)
        scale = alt.Scale(
            type="symlog",
            base=10,
            constant=1,
            domain=list(domain),
            nice=False,
        )
    else:
        domain, ticks = _linear_ticks_for_domain(data_min, data_max)
        scale = alt.Scale(domain=list(domain), nice=False)

    return alt.Y(
        "value:Q",
        title="Value",
        scale=scale,
        axis=scientific_axis(ticks),
    )


def render_concept_chart(
    chart_data: pd.DataFrame,
    *,
    log_scale: bool,
    companies: list[str],
) -> None:
    """Render a single concept line chart."""
    chart = (
        alt.Chart(chart_data)
        .mark_line()
        .encode(
            x=alt.X("fiscal_year:O", title="Year", sort="ascending"),
            y=value_y_encoding(chart_data, log_scale=log_scale),
            color=alt.Color(
                "company:N",
                title="Company",
                scale=alt.Scale(domain=companies),
            ),
            tooltip=["company", "fiscal_year", "value"],
        )
        .properties(width="container", height=CHART_HEIGHT)
    )
    st.altair_chart(chart, width="stretch")


# --- page render ---

full_data = pl.read_parquet("data/sheets.parquet")
data_selection = get_data_selection()
selected_columns = data_selection.selected_columns
selected_ciks = data_selection.selected_ciks

st.title("Multi-Year Financials")

if not selected_ciks:
    st.info(
        "Select companies on **Yearly Financials** (checkbox column in the table), "
        "then return here for multi-year comparisons."
    )
    st.page_link("pages/YearlyFinancials.py", label="Go to Yearly Financials", icon="📊")
    st.stop()

n_companies = len(selected_ciks)
n_concepts = len(selected_columns)
st.caption(
    f"{n_companies} {'company' if n_companies == 1 else 'companies'}, "
    f"{n_concepts} {'concept' if n_concepts == 1 else 'concepts'} "
    "(from Yearly Financials selections)"
)

filtered = full_data.filter(
    pl.col("label").is_in(selected_columns),
    pl.col("cik").is_in(list(selected_ciks)),
)

if filtered.height == 0:
    st.warning("No data matches the current company and concept selections.")
    st.stop()

label_order = {label: index for index, label in enumerate(selected_columns)}
pivot_df = (
    filtered.pivot(
        on="fiscal_year",
        values="value",
        index=["company", "label"],
        sort_columns=True,
    )
    .sort(
        "company",
        pl.col("label").replace_strict(label_order, default=len(selected_columns)),
    )
)

st.subheader("Trends by concept")
log_scale = st.toggle("Log scale", value=False)

for i, concept in enumerate(selected_columns):
    if i > 0:
        st.divider()

    st.write(f"**{concept}**")
    concept_df = filtered.filter(pl.col("label") == concept).select(
        "fiscal_year", "company", "tickers", "value"
    )

    if concept_df.height == 0:
        st.info(f"No data available for {concept}.")
        continue

    render_concept_chart(
        concept_df.to_pandas(), log_scale=log_scale,
        companies=filtered.select("company").unique().sort("company")["company"].to_list()
    )

st.divider()
st.subheader("Pivot table")
st.dataframe(
    pivot_df,
    width="stretch",
    height=max(MIN_TABLE_HEIGHT, pivot_df.height * ROW_HEIGHT),
    hide_index=True,
    column_config={
        str(col): st.column_config.NumberColumn(format="compact")
        for col in pivot_df.columns
        if col not in {"company", "label"}
    },
)
