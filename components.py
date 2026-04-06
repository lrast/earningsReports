# resuable components
import streamlit as st
import polars as pl
import altair as alt
import numpy as np


class ColumnControls:
    def __init__(self, column_name):
        self.column_name = column_name
        self.log_scale = True
        self.unit = "1"
        self.range = None

        self.value = None

    def render(self, column_values):
        self.log_scale = st.checkbox("log scale", key=f'log_{self.column_name}',
                                     value=True)

        if self.log_scale:
            # filter positive only
            column_values = column_values.filter(pl.col('value') > 0
                                        ).with_columns(pl.col('value'
                                        ).log10())

        if column_values.height > 0:
            chart_data = column_values.to_pandas()
            selected_interval = alt.selection_interval('interval')

            histogram = alt.Chart(chart_data).mark_bar().encode(
                alt.X('value:Q', bin=alt.Bin(maxbins=200), title=f"{self.column_name} Value",
                      ),
                y='count()',
            ).properties(
                width=300,
                height=200,
                title=''
            ).add_params(selected_interval)

            # update the column sate to account for graph selections
            event = st.altair_chart(histogram, width='stretch', on_select='rerun')

            selected_range = event['selection']['interval']
            if len(selected_range) == 0:
                self.range = None
            else:
                if self.log_scale:
                    self.range = list(map(lambda x: np.power(10, x),
                                          selected_range['value'])
                                      )
                else:
                    self.range = selected_range['value']

        else:
            st.info(f"No data available for {self.column_name}.")

    def get_filter_expression(self):
        """ polars expression capturing the filter criteria """
        if self.range is None:
            return True
        else:
            return pl.col(self.column_name).is_between(*self.range)
