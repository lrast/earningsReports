from dash import Dash, dcc, html, callback, Output, Input
import dash_ag_grid as dag


from fetch_data import get_years
from serve_data import DataBuffer


# to do: improve arrangement of page
# improve query speed
# investigate other columns
# fetch price data


app = Dash(__name__)

columnDefs = [
    {'field': 'name', 'filter': 'agTextColumnFilter'},
    {'field': 'AssetsCurrent', "filter": "agNumberColumnFilter"},
    {'field': 'LiabilitiesCurrent', "filter": "agNumberColumnFilter"},
    {'field': 'Revenues', "filter": "agNumberColumnFilter"},
    {'field': 'period_filed'},
    {'field': 'url', 'cellRenderer': 'markdown'}
]


grid = dag.AgGrid(
    id="financials-table",
    columnDefs=columnDefs,
    style={"height": 600, "width": "100%"}
)

data_buffer = DataBuffer()

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
    Input('year-dropdown', 'value'),
    Input('unit-dropdown', 'value')
)
def update_unit(year, unit):
    return data_buffer.fetch(year, unit).to_dict("records")


if __name__ == "__main__":
    app.run(debug=False)
