import streamlit as st
import polars as pl

from utilities.components import ColumnControls

st.markdown(
    """
<style>
  :root {
    --pinnedSidebarWidth: clamp(300px, 22vw, 460px);
    --pinnedSidebarGap: 1.5rem;
  }

  div.block-container {
    padding-right: calc(var(--pinnedSidebarWidth) + var(--pinnedSidebarGap)) !important;
  }

  div[data-testid="stHorizontalBlock"] > div:nth-child(2) {
    position: fixed !important;
    top: 3.5rem !important;
    bottom: 1rem !important;
    right: var(--pinnedSidebarGap) !important;
    width: var(--pinnedSidebarWidth) !important;
    z-index: 998 !important;
    background: var(--background-color) !important;
    overflow-y: auto !important;
    padding-bottom: 2rem !important;
    padding-left: 2rem !important;
  }
</style>
""",
    unsafe_allow_html=True,
)

# data set up
full_data = pl.read_parquet("data/sheets.parquet")
labels = full_data['label'].unique()

st.title("Yearly Financials")

# Main content (80%) | Right sidebar (20%)
main_col, sidebar_col = st.columns([0.8, 0.2])

# Table controls in the main content
with main_col:
    years = list(range(1994, 2027))[::-1]
    selected_year = st.selectbox("Select Year", years, index=1)

    # selecting the data we need
    full_data = full_data.filter(pl.col('year') == selected_year)

    columns = st.multiselect("Select Columns", labels,
                             default=['Assets', 'Liabilities'],
                             key="columns_selected"
                             )

    column_controls = {col: ColumnControls(col) for col in columns}

    full_data = full_data.filter(pl.col('label').is_in(columns))

# Table controls in the sidebar
with sidebar_col:
    for column in columns:
        st.write(f'__{column}__')
        col_df = full_data.filter(pl.col('label') == column)

        current_settings = column_controls[column]
        current_settings.render(col_df)

# Render table
with main_col:
    # apply filters from the sidebar selectors
    table_data = full_data

    to_show = table_data.pivot(on='label', values='value', index=['company', 'tickers'])

    for settings in column_controls.values():
        to_show = to_show.filter(settings.get_filter_expression())

    st.dataframe(
        to_show, 
        width='stretch',
        height=600,
        hide_index=True,
        column_config={k: v.get_column_formatting()
                       for k, v in column_controls.items()}
    )
