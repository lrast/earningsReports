# backend functions for working with data between the database and frontend

import pandas as pd

from finance_logic import get_balance_sheet_data

from database.read_data import get_submissions
from data_preprocessing import submission_processing

from utilities import columns_to_return


class DataBuffer(object):
    """ DataBuffer: holds the current working data, so that we don't have to
        refetch it too frequently
    """
    def __init__(self):
        super(DataBuffer, self).__init__()
        self.year = None
        self.units = {'$': 1, 'millions $': 1E6, 'billions $': 1E9}
        self.data = None
        self.documents = None
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
        self.ratio_cols = set(['CurrentAssets/Liabilities', 'WorkingCapital/Debt'])

    def request(self, year, unit, columns):
        """ primary interface
        for now, only supporting one year.
        !!! To add: Abilty to display multiple years
        """
        if set(columns) == set(self.columns) and year == self.year:
            # no data to fetch
            pass
        elif self.data is None or year != self.year:
            # fetch all
            self.columns = columns
            self.year = year
            self.data = self.get_data(year, columns)
            self.documents = submission_processing(get_submissions(year))
        else:
            self.columns = columns
            col_to_fetch = list(set(columns) - set(self.data.columns))
            new_data = self.get_data(year, col_to_fetch)

            self.data = pd.merge(self.data, new_data[['adsh'] + col_to_fetch],
                                 on='adsh', how='outer')

        to_return = pd.merge(
                            self.documents[['adsh', 'name', 'url']],
                            self.data[columns_to_return(self.columns)], 
                            on='adsh', how='left'
                            )

        unit_ful = list(set(self.columns) - self.ratio_cols)
        to_return[unit_ful] = to_return[unit_ful] / self.units[unit]
        return to_return, self.display_format()

    def display_format(self):
        display_columns = []

        for col_name in self.columns:
            display_columns.append({'field': col_name,
                                    'filter': "agNumberColumnFilter",
                                    "valueFormatter": {"function": "withCaveats(params)"}})
        return display_columns

    def get_data(self, year, columns):
        return get_balance_sheet_data(year, columns)
