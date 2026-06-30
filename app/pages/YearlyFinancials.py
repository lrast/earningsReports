import streamlit as st
import polars as pl

from components.controls import ColumnControls
from page_state import get_data_selection

YEARLY_EDITOR_KEY = "yearly_financials_editor"
SIDEBAR_COLLAPSED_KEY = "yearly_financials_sidebar_collapsed"
SIDEBAR_WIDTH_KEY = "yearly_financials_sidebar_width"
SIDEBAR_WIDTH_SLIDER_KEY = "yearly_financials_sidebar_width_slider"

MIN_TABLE_HEIGHT = 600
# Header + 200px chart + axes/padding/margin between blocks (rounded up).
SIDEBAR_ITEM_HEIGHT = 225
DEFAULT_SIDEBAR_WIDTH = 0.22
MIN_SIDEBAR_WIDTH = 0.15
MAX_SIDEBAR_WIDTH = 0.45

# data set up
full_data = pl.read_parquet("data/sheets.parquet")
metadata = pl.read_parquet("data/metadata.parquet")
labels = metadata['label']

st.title("Yearly Financials")

collapsed = st.session_state.setdefault(SIDEBAR_COLLAPSED_KEY, False)
sidebar_frac = st.session_state.setdefault(SIDEBAR_WIDTH_KEY, DEFAULT_SIDEBAR_WIDTH)

if collapsed:
    main_col = st.container()
    sidebar_col = None
else:
    main_frac = max(1.0 - MAX_SIDEBAR_WIDTH, 1.0 - sidebar_frac)
    main_col, sidebar_col = st.columns([main_frac, sidebar_frac], gap="medium")

# Table controls in the main content
with main_col:
    if collapsed:
        _, expand_col = st.columns([1, 0.12])
        with expand_col:
            if st.button(
                "▶",
                key="yearly_financials_sidebar_toggle",
                help="Show the filter panel",
            ):
                st.session_state[SIDEBAR_COLLAPSED_KEY] = False
                st.rerun()

    years = list(range(1994, 2027))[::-1]
    selected_year = st.selectbox("Select Year", years, index=1)

    # selecting the data we need
    full_data = full_data.filter(pl.col('fiscal_year') == selected_year)

    data_selection = get_data_selection()
    columns = st.multiselect(
        "Select Columns",
        labels,
        default=data_selection.selected_columns,
        accept_new_options=True,
    )
    data_selection.selected_columns = list(columns)

    column_controls = {col: ColumnControls(col) for col in columns}

    full_data = full_data.filter(pl.col('label').is_in(columns))

table_height = max(MIN_TABLE_HEIGHT, len(columns) * SIDEBAR_ITEM_HEIGHT)

# Table controls in the sidebar
filter_reset_nonce = st.session_state.setdefault("filter_reset_nonce", 0)

if sidebar_col is not None:
    with sidebar_col:
        with st.container(key="table_filter_sidebar"):
            reset_col, settings_col, toggle_col = st.columns([2, 1, 1], gap="small")
            with reset_col:
                if st.button("Reset filters", use_container_width=True):
                    st.session_state["filter_reset_nonce"] += 1
                    st.rerun()
            with settings_col:
                with st.popover("⚙", help="Filter panel width"):
                    st.slider(
                        "Width (%)",
                        min_value=int(MIN_SIDEBAR_WIDTH * 100),
                        max_value=int(MAX_SIDEBAR_WIDTH * 100),
                        value=int(sidebar_frac * 100),
                        key=SIDEBAR_WIDTH_SLIDER_KEY,
                        on_change=lambda: st.session_state.update(
                            {SIDEBAR_WIDTH_KEY: st.session_state[SIDEBAR_WIDTH_SLIDER_KEY] / 100}
                        ),
                    )
            with toggle_col:
                if st.button(
                    "◀",
                    key="yearly_financials_sidebar_collapse",
                    help="Hide the filter panel",
                ):
                    st.session_state[SIDEBAR_COLLAPSED_KEY] = True
                    st.rerun()

            for i, column in enumerate(columns):
                if i > 0:
                    st.divider()
                st.write(f'__{column}__')
                col_df = full_data.filter(pl.col('label') == column)

                current_settings = column_controls[column]
                current_settings.render(
                    col_df,
                    chart_key=f"filter_{column}_{filter_reset_nonce}",
                )

# Render table
with main_col:
    data_selection = get_data_selection()

    # apply filters from the sidebar selectors
    table_data = full_data

    to_show = table_data.pivot(on='label', values='value', index=['cik', 'company', 'tickers'])

    filter_in_selected = data_selection.cik_filter_expression()

    for settings in column_controls.values():
        to_show = to_show.filter(settings.get_filter_expression() | filter_in_selected)

    display_df = data_selection.with_select_column(to_show, columns)

    edited_df = st.data_editor(
        display_df,
        width='stretch',
        height=table_height,
        hide_index=True,
        num_rows="fixed",
        key=YEARLY_EDITOR_KEY,
        column_order=["Select", "company", "tickers", *columns],
        disabled=["cik", "company", "tickers", *columns],
        column_config={
            "Select": st.column_config.CheckboxColumn("", default=False),
            "cik": None,
            **{k: v.get_column_formatting() for k, v in column_controls.items()},
        },
    )

    if data_selection.sync_from_editor(edited_df):
        st.rerun()
