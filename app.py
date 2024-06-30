from dash import Dash, dcc, html, callback, Output, Input, Patch
import dash_ag_grid as dag


from database.read_data import get_years
from serve_data import DataBuffer


# to do: improve arrangement of page
# investigate other columns
# fetch price data


app = Dash(__name__)

data_buffer = DataBuffer()

grid = dag.AgGrid(
    id="financials-table",
    style={"height": 1000, "width": "100%"},
    dashGridOptions={"rowSelection": "multiple", "animateRows": False},
)

persistent_columns = [
                        {'field': 'name', 'filter': 'agTextColumnFilter', 'checkboxSelection': True},
                        {'field': 'url',
                         "cellRenderer": "FormatURL"}
                     ]

app.layout = html.Div([
                        html.Div([
                              html.Label(['year:']),
                              dcc.Dropdown(get_years(), '2022',
                                           id='year-dropdown',
                                           clearable=False),
                            ], style={'width': '33.33%'}),
                        html.Div([
                              html.Label(['units']),
                              dcc.Dropdown(['$', 'millions $', 'billions $'],
                                           '$',
                                           id='unit-dropdown',
                                           clearable=False),
                            ], style={'width': '33.33%'}),
                        html.Div([
                            dcc.Loading(
                                id="loading-1",
                                type="default",
                                children=grid
                            )
                        ])





                    ])


@callback(
    Output("financials-table", "rowData"),
    Output("financials-table", "columnDefs"),
    Input('year-dropdown', 'value'),
    Input('unit-dropdown', 'value')
)
def update_unit(year, unit):
    data, columnDefs = data_buffer.fetch(year, unit)

    columnDefs = persistent_columns + columnDefs

    return data.to_dict("records"), columnDefs


@callback(
    Output("financials-table", "dashGridOptions"),
    Input("financials-table", "selectedRows"),
)
def row_pinning_top(selected_rows):
    grid_option_patch = Patch()
    grid_option_patch["pinnedTopRowData"] = selected_rows
    return grid_option_patch


if __name__ == "__main__":
    app.run(debug=False)
