from dash import Dash, dcc, html, callback, Output, Input
import dash_ag_grid as dag


from fetch_data import get_years
from serve_data import DataBuffer


# to do: improve arrangement of page
# investigate other columns
# fetch price data


app = Dash(__name__)

data_buffer = DataBuffer()

grid = dag.AgGrid(
    id="financials-table",
    style={"height": 600, "width": "100%"}
)


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
                        dcc.Loading(
                            id="loading-1",
                            type="default",
                            children=grid
                        )
                       ])


@callback(
    Output("financials-table", "rowData"),
    Output("financials-table", "columnDefs"),
    Input('year-dropdown', 'value'),
    Input('unit-dropdown', 'value')
)
def update_unit(year, unit):
    data, columnDefs = data_buffer.fetch(year, unit)
    return data.to_dict("records"), columnDefs


if __name__ == "__main__":
    app.run(debug=False)
