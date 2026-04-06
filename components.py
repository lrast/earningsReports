# resuable components
import streamlit as st
import polars as pl
import altair as alt

import math
import json
from humanize import scientific


class ColumnControls:
    def __init__(self, column_name):
        self.column_name = column_name
        self.log_scale = True
        self.range = None

        self.value = None

    def render(self, column_values):
        self.log_scale = st.checkbox("log scale", key=f'log_{self.column_name}',
                                     value=True)

        if self.log_scale:
            column_values = column_values.filter(pl.col('value') > 0)

        if column_values.height > 0:
            chart_data = column_values.to_pandas()
            selected_interval = alt.selection_interval('interval')

            # Log histogram: Vega-Lite cannot reliably combine bin + log on one field
            # (bars often do not render). Bin in log space, map edges back to the
            # original scale, then draw interval bars — see histogram_log in Vega-Lite.
            if self.log_scale:
                v = chart_data["value"]
                x_ticks = axis_ticks_engineering(float(v.min()), float(v.max()))
                x_tick_labels = list(tick_labels(x_ticks))
                histogram = (
                    alt.Chart(chart_data)
                    .transform_calculate(
                        log_x="log(datum.value)/log(10)",
                    )
                    .transform_bin(
                        bin=alt.Bin(maxbins=150),
                        field="log_x",
                        as_="bin_log_x",
                    )
                    .transform_calculate(
                        x1="pow(10, datum.bin_log_x)",
                        x2="pow(10, datum.bin_log_x_end)",
                    )
                    .mark_bar()
                    .encode(
                        x=alt.X(
                            "x1:Q",
                            title=f"{self.column_name} Value",
                            scale=alt.Scale(type="log", base=10),
                            axis=alt.Axis(
                                values=x_ticks,
                                labelExpr=f"{json.dumps(x_tick_labels)}[indexof({json.dumps(x_ticks)}, datum.value)]",
                            ),
                        ),
                        x2=alt.X2("x2:Q"),
                        y=alt.Y("count():Q"),
                    )
                )
            else:
                histogram = (
                    alt.Chart(chart_data)
                    .mark_bar()
                    .encode(
                        alt.X(
                            "value:Q",
                            bin=alt.Bin(maxbins=150),
                            title=f"{self.column_name} Value",
                        ),
                        y="count()",
                    )
                )

            histogram = histogram.properties(
                width=300,
                height=200,
                title="",
            ).add_params(selected_interval)

            # update the column sate to account for graph selections
            event = st.altair_chart(histogram, width='stretch', on_select='rerun')

            interval_state = event["selection"]["interval"]
            if len(interval_state) == 0:
                self.range = None
            else:
                # Channel field may be "value" (linear hist) or "x1" (log hist)
                self.range = interval_state.get("value") or interval_state.get(
                    "x1"
                )

        else:
            st.info(f"No data available for {self.column_name}.")

    def get_filter_expression(self):
        """ polars expression capturing the filter criteria """
        if self.range is None:
            return True
        else:
            return pl.col(self.column_name).is_between(*self.range)

    def get_column_formatting(self):
        """Display formatting for the corresponding column"""
        return st.column_config.NumberColumn(format=f"compact")


def axis_ticks_engineering(vmin: float, vmax: float) -> list[float]:
    """Ticks at 10^{3k} for integers k, where they fall inside the data span.
    """
    k_lo = math.floor(math.log10(vmin) / 3)
    k_hi = math.floor(math.log10(vmax) / 3)
    return [10 ** (3 * k) for k in range(k_lo, k_hi + 1)]


def tick_labels(ticks):
    def make_label(value): return scientific(value, precision=0)[4:]

    return map(make_label, ticks)
