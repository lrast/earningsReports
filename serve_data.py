# backend functions for working with data between the database and frontend

from fetch_data import get_data


class DataBuffer(object):
    """ DataBuffer: holds the current working data, so that we don't have to
        refetch it too frequently
    """
    def __init__(self):
        super(DataBuffer, self).__init__()
        self.year = None
        self.current_data = None
        self.columns = [
                        'Revenues', 'CommonStockDividendsPerShareDeclared',
                        'CostsAndExpenses', 'NetIncomeLoss', 'OperatingIncomeLoss',
                        'RevenueFromContractWithCustomerExcludingAssessedTax',
                        'ProfitLoss', 'GrossProfit'
                        ]

        self.possible_cols = ['Assets', 'Liabilities', 'StockholdersEquity',
                              'AssetsCurrent', 'LiabilitiesCurrent', 'CurrentAssets/Liabilities',
                              'WorkingCapital/Debt', 'Revenues', 'CommonStockDividendsPerShareDeclared',
                              'CostsAndExpenses', 'NetIncomeLoss', 'OperatingIncomeLoss',
                              'RevenueFromContractWithCustomerExcludingAssessedTax',
                              'ProfitLoss', 'GrossProfit']

                        #  
                        #'CommonStockDividendsPerShareDeclared',
                        #'Revenues', 'EntityPublicFloat', 'EarningsPerShareBasic',
                        #'EarningsPerShareDiluted',
                        #]


    ### !!! To add:
    # 1. Caching mechanisms
    # 2. Abilty to display multiple years


    def fetch(self, year, unit):
        """ primary interface:
            format and return the data for a specific year and units
        """
        if year != self.year:
            self.reset_buffer(year)

        to_return = self.current_data.copy()
        units = {'$': 1, 'millions $': 1E6, 'billions $': 1E9}
        to_return[self.columns] = to_return[self.columns] / units[unit]

        return to_return, self.fetch_display_columns()

    def fetch_display_columns(self):
        display_columns = []

        for col_name in self.columns:
            display_columns.append({'field': col_name,
                                    'filter': "agNumberColumnFilter",
                                    "valueFormatter": {"function": "withCaveats(params)"}})
        return display_columns

    def reset_buffer(self, year):
        """ fetch data for a year """
        self.year = year
        self.current_data = get_data(year, self.columns)

    def change_columns(self, columns):
        """ reset the column values """
        self.columns = columns
        self.reset_buffer(self.year)


def transform_to_links(data):
    data['url'] = '[filing]('+data['url'] + ')'
    return data
