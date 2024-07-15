# backend functions for working with data between the database and frontend

from fetch_data import get_data

import pandas as pd


class DataBuffer(object):
    """ DataBuffer: holds the current working data, so that we don't have to
        refetch it too frequently
    """
    def __init__(self):
        super(DataBuffer, self).__init__()
        self.year = None
        self.units = {'$': 1, 'millions $': 1E6, 'billions $': 1E9}
        self.data = None
        self.columns = [
                        'Assets', 'Liabilities', 'StockholdersEquity',
                        'AssetsCurrent', 'LiabilitiesCurrent', 'CurrentAssets/Liabilities',
                        'WorkingCapital/Debt',
                        ]

        self.possible_cols = ['Assets', 'Liabilities', 'StockholdersEquity',
                              'AssetsCurrent', 'LiabilitiesCurrent', 'CurrentAssets/Liabilities',
                              'WorkingCapital/Debt', 'Revenues', 'CommonStockDividendsPerShareDeclared',
                              'CostsAndExpenses', 'NetIncomeLoss', 'OperatingIncomeLoss',
                              'RevenueFromContractWithCustomerExcludingAssessedTax',
                              'ProfitLoss', 'GrossProfit']

        # 'CommonStockDividendsPerShareDeclared',
        # 'Revenues', 'EntityPublicFloat', 'EarningsPerShareBasic',
        # 'EarningsPerShareDiluted',
        # ]

    ### !!! To add: Abilty to display multiple years

    def request(self, year, unit, columns):
        """ primary interface
        for now, only supporting one year.
        """
        # what columns do I need to fetch?
        self.columns = columns
        unit_num = self.units[unit]

        if self.data is None or year != self.year:  # fetch all
            self.year = year
            col_to_fetch = columns
            self.data = get_data(year, col_to_fetch)
        else:
            col_to_fetch = list(set(columns) - set(self.data.columns))
            new_data = get_data(year, col_to_fetch) #, with_labels=False)

            self.data = pd.merge(self.data, new_data[['adsh'] + col_to_fetch], on='adsh', how='outer')
            print(self.data.columns)


        # apply the unit transformation 
        to_return = self.data[['name', 'url'] + self.columns].copy()
        
        to_return[self.columns] = to_return[self.columns] / self.units[unit]

        return to_return, self.display_format()

    def display_format(self):
        display_columns = []

        for col_name in self.columns:
            display_columns.append({'field': col_name,
                                    'filter': "agNumberColumnFilter",
                                    "valueFormatter": {"function": "withCaveats(params)"}})
        return display_columns

    def fetch_data(self, year, unit, columns, with_labels=True):
        columns_to_fetch = self.data_relationships.get_dependencies(columns)
        raw_data = get_data(year, columns_to_fetch)
