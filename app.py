from dash import Dash, dcc, html
import dash_ag_grid as dag

from fetch_data import get_data, get_years

df = get_data(2022, ['AssetsCurrent', 'LiabilitiesCurrent', 'Revenues'])

app = Dash(__name__)

columnDefs = [
    {'field': 'name'},
    {'field': 'AssetsCurrent', "filter": "agNumberColumnFilter"},
    {'field': 'LiabilitiesCurrent', "filter": "agNumberColumnFilter"},
    {'field': 'Revenues', "filter": "agNumberColumnFilter"}
]


grid = dag.AgGrid(
    id="finanicals-table",
    rowData=df.to_dict("records"),
    columnDefs=columnDefs,
    style={"height": 600, "width": "100%"}
)

years = get_years()

# to do: improve arrangement of page
# to do: load our data, allow the loaded data to change
# to do: make the numbers more readable
# to do: make the names into urls

app.layout = html.Div([
                        html.Div([
                              html.Label(['year:']),
                              dcc.Dropdown(years, id='year-dropdown'),
                            ], style={'width': '33.33%'}),
                        html.Div([
                              html.Label(['units']),
                              dcc.Dropdown(['$', 'millions $', 'billions $'],
                                           id='unit-dropdown'),
                            ], style={'width': '33.33%'}),
                        grid
                       ])

if __name__ == "__main__":
    app.run(debug=False)
