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
        self.range = None

        self.value = None

    def render(self, column_values, *, chart_key=None):

        if column_values.height > 0:
            chart_data = column_values.to_pandas()
            selected_interval = alt.selection_interval('interval')

            # Symlog histogram: Vega-Lite cannot reliably combine bin + symlog on one
            # field (bars often do not render). Bin in symlog space, map edges back to
            # the original scale, then draw interval bars.
            v = chart_data["value"]
            vmin, vmax = float(v.min()), float(v.max())
            x_domain = axis_domain_symlog(vmin, vmax)
            x_ticks = axis_ticks_symlog(vmin, vmax)
            x_tick_labels = list(tick_labels(x_ticks))
            symlog_sign = "(datum.value >= 0 ? 1 : -1)"
            symlog_x = f"{symlog_sign} * log(1 + abs(datum.value))/log(10)"
            bin_sign = "(datum.bin_symlog_x >= 0 ? 1 : -1)"
            bin_end_sign = "(datum.bin_symlog_x_end >= 0 ? 1 : -1)"
            histogram = (
                alt.Chart(chart_data)
                .transform_calculate(symlog_x=symlog_x)
                .transform_bin(
                    bin=alt.Bin(maxbins=150),
                    field="symlog_x",
                    as_="bin_symlog_x",
                )
                .transform_calculate(
                    x1=f"{bin_sign} * (pow(10, abs(datum.bin_symlog_x)) - 1)",
                    x2=f"{bin_end_sign} * (pow(10, abs(datum.bin_symlog_x_end)) - 1)",
                )
                .mark_bar()
                .encode(
                    x=alt.X(
                        "x1:Q",
                        title=None,
                        scale=alt.Scale(
                            type="symlog",
                            base=10,
                            constant=1,
                            domain=x_domain,
                            nice=False,
                        ),
                        axis=alt.Axis(
                            values=x_ticks or None,
                            labelExpr=(
                                f"{json.dumps(x_tick_labels)}[indexof({json.dumps(x_ticks)}, datum.value)]"
                                if x_ticks
                                else alt.Undefined
                            ),
                        ),
                    ),
                    x2=alt.X2("x2:Q"),
                    y=alt.Y("count():Q", title=None, axis=alt.Axis(labels=False)),
                )
            )

            histogram = histogram.properties(
                width=300,
                height=200,
                title="",
                padding={"left": 5, "top": 5, "right": 5, "bottom": 5},
            ).configure_view(
                strokeWidth=0,
            ).configure_axisX(
                labelPadding=2,
                titlePadding=0,
            ).add_params(selected_interval)

            # update the column sate to account for graph selections
            event = st.altair_chart(
                histogram, width='stretch', on_select='rerun', key=chart_key
            )

            interval_state = event["selection"]["interval"]
            if len(interval_state) == 0:
                self.range = None
            else:
                # Channel field may be "value" (linear hist) or "x1" (symlog hist)
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


def symlog(x: float) -> float:
    if x == 0:
        return 0.0
    return math.copysign(math.log1p(abs(x)) / math.log(10), x)


def symexp(y: float) -> float:
    if y == 0:
        return 0.0
    return math.copysign(10 ** abs(y) - 1, y)


def axis_domain_symlog(
    vmin: float, vmax: float, *, pad_fraction: float = 0.03
) -> list[float]:
    """Anchor symlog domain at zero when data is one-sided."""
    if vmin >= 0:
        s_hi = symlog(vmax)
        pad = pad_fraction * s_hi if s_hi > 0 else 0.05
        return [0.0, symexp(s_hi + pad)]
    if vmax <= 0:
        s_lo = symlog(vmin)
        pad = pad_fraction * abs(s_lo) if s_lo < 0 else 0.05
        return [symexp(s_lo - pad), 0.0]

    s_lo, s_hi = symlog(vmin), symlog(vmax)
    span = s_hi - s_lo
    pad = pad_fraction * span if span > 0 else 0.05
    return [symexp(s_lo - pad), symexp(s_hi + pad)]


def axis_ticks_symlog(vmin: float, vmax: float) -> list[float]:
    """Ticks at 0 and ±10^{3k} on sides that contain data."""
    abs_max = max(abs(vmin), abs(vmax))
    if abs_max == 0:
        return [0.0]
    k_hi = math.floor(math.log10(abs_max) / 3)
    if k_hi < 0:
        return [0.0] if vmin >= 0 else []

    ticks: list[float] = [0.0]
    for k in range(0, k_hi + 1):
        magnitude = 10 ** (3 * k)
        if vmin < 0 and -magnitude >= vmin:
            ticks.append(-magnitude)
        if vmax > 0 and magnitude <= vmax:
            ticks.append(magnitude)
    return sorted(set(ticks))


def tick_labels(ticks):
    def make_label(value):
        if value == 0:
            return "0"
        label = scientific(abs(value), precision=0)[4:]
        return f"-{label}" if value < 0 else label

    return map(make_label, ticks)
