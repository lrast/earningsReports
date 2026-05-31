"""Command palette: styles, JS component, and command selection handling."""
from __future__ import annotations
from collections.abc import Callable

import streamlit as st
import polars as pl


from utilities.load_assets import COMMAND_PALETTE_CSS, load_css, load_js_component

COMMAND_PALETTE_KEY = "_app_js_command_palette"
SELECTED_COMMAND_KEY = "_command_palette_selected_command"


def make_commands_old():
    """ Process company data to a list of possible commands """

    # Fetch data
    data = pl.read_parquet('data/sheets.parquet')
    companies = data['company'].unique().drop_nulls().sort()
    tickers = data['tickers'].explode().unique().drop_nulls().sort()
    years = data['year'].unique().drop_nulls().sort(descending=True)

    statements = ['Balance Sheet', 'Cash Flow Statement', 'Income Statement',
                  'Statement of Equity', 'Comprehensive Income']

    # ticker to company translation
    pairs = data[['company', 'tickers']].explode('tickers').unique().drop_nulls()
    ticker_to_company = dict(pairs.group_by('tickers').agg(pl.col("company")).iter_rows())

    command_name = {
        'Balance Sheet': 'balance',
        'Cash Flow Statement': 'cash_flow',
        'Income Statement': 'income',
        'Statement of Equity': 'equity',
        'Comprehensive Income': 'comprehensive_income'
    }

    # making commands:
    def year_command(year, parent_id):
        return {"id": parent_id + f'?year={year}', 'name': str(year)}

    def statement_command(statement, parent_id):
        my_id = parent_id + f'?statement={command_name[statement]}'
        command = {"id": my_id,
                   'name': statement,
                   'options': []}
        for year in years:
            command['options'].append(year_command(year, my_id))
        return command

    def company_command(company, parent_id):
        my_id = parent_id + f'?company={company}'
        command = {"id": my_id,
                   'name': company,
                   'section': 'Company',
                   'options': []}
        for statement in statements:
            command['options'].append(statement_command(statement, my_id))
        return command

    def ticker_command(ticker, parent_id):
        my_id = parent_id + f'?ticker={ticker}'
        command = {"id": my_id,
                   'name': ticker,
                   "section": 'Ticker',
                   'options': []}

        if len(ticker_to_company[ticker]) == 1:
            for statement in statements:
                command['options'].append(statement_command(statement, my_id))
        else:
            for company in ticker_to_company[ticker]:
                command['options'].append(company_command(company, my_id))
        return command

    return [ticker_command(ticker, '') for ticker in tickers] + \
           [company_command(company, '') for company in companies]


def generate_base_commands():
    pass


def generate_sub_commands(command_id):
    pass



DUMMY_COMMANDS: list[dict] = [
    {
        "id": "refresh-data",
        "name": "Refresh data",
        "icon": "🔄",
        "section": "Data",
        "options": [
            {"id": "refresh-data/all", "name": "All sources"},
            {"id": "refresh-data/filings", "name": "Filings only"},
            {"id": "refresh-data/tables", "name": "Tables only"},
        ],
    },
    {
        "id": "export-csv",
        "name": "Export to CSV",
        "icon": "📤",
        "section": "Data",
        "options": [
            {"id": "export-csv/current", "name": "Current view"},
            {"id": "export-csv/selection", "name": "Selected rows"},
            {"id": "export-csv/full", "name": "Full dataset"},
        ],
    },
    {
        "id": "toggle-filters",
        "name": "Toggle filters",
        "icon": "🔍",
        "section": "View",
        "options": [
            {"id": "toggle-filters/year", "name": "Year filter"},
            {"id": "toggle-filters/company", "name": "Company filter"},
            {"id": "toggle-filters/metric", "name": "Metric filter"},
        ],
    },
    {
        "id": "reset-layout",
        "name": "Reset layout",
        "icon": "📐",
        "section": "View",
        "options": [
            {"id": "reset-layout/columns", "name": "Column widths"},
            {"id": "reset-layout/sidebar", "name": "Sidebar panels"},
            {"id": "reset-layout/everything", "name": "Everything"},
        ],
    },
    {
        "id": "open-settings",
        "name": "Open settings",
        "icon": "⚙️",
        "section": "App",
        "options": [
            {"id": "open-settings/display", "name": "Display"},
            {"id": "open-settings/data", "name": "Data sources"},
            {"id": "open-settings/shortcuts", "name": "Keyboard shortcuts"},
        ],
    },
]

# commands = make_commands()
# DUMMY_COMMANDS = commands


def _command_labels_by_id() -> dict[str, str]:
    labels: dict[str, str] = {}
    for cmd in DUMMY_COMMANDS:
        for opt in cmd.get("options", []):
            labels[opt["id"]] = f"{cmd['name']} → {opt['name']}"
    return labels


_COMMAND_BY_ID = _command_labels_by_id()

_JS_COMPONENTS: dict[str, st.components.v2.types.ComponentRenderer] = {}


def mount_command_palette(*, on_change: Callable[[], None] | None = None):
    """Load palette styles, mount the JS component, and record the chosen command."""
    st.markdown(load_css(COMMAND_PALETTE_CSS), unsafe_allow_html=True)

    key = COMMAND_PALETTE_KEY
    if "command_palette" not in _JS_COMPONENTS:
        _JS_COMPONENTS["command_palette"] = load_js_component(
            "command_palette", "command_palette.js"
        )


    component_state = st.session_state.get(key, {})
    selected_id = component_state.get("value")
    data = {"commands": DUMMY_COMMANDS}

    def _handle_palette_change() -> None:
        state = st.session_state.get(key, {})
        target_id = state.get("value")
        if target_id and target_id in _COMMAND_BY_ID:
            st.session_state[SELECTED_COMMAND_KEY] = _COMMAND_BY_ID[target_id]
        if on_change is not None:
            on_change()

    return _JS_COMPONENTS["command_palette"](
        data=data,
        default={"value": selected_id},
        key=key,
        height=0,
        on_value_change=_handle_palette_change,
    )
