# backend functions for working with data between the database and frontend

import pandas as pd

from finance_logic import get_balance_sheet_data, get_cash_flow_data
from read_data import get_submissions
from utilities import columns_and_notes


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
                        'Revenues', 'CostOfRevenue', 'GrossProfit',
                        'OperatingExpenses',  'OperatingIncomeLoss'
                        ]

        self.possible_cols = ['Assets', 'Liabilities', 'StockholdersEquity',
                              'AssetsCurrent', 'LiabilitiesCurrent', 'CurrentAssets/Liabilities',
                              'WorkingCapital/Debt', 
                              'Revenues', 'CostOfRevenue', 'GrossProfit',
                              'OperatingExpenses',  'OperatingIncomeLoss',
                              'CommonStockDividendsPerShareDeclared',
                              'NetIncomeLoss', 'ProfitLoss']

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
        if self.data is None or year != self.year:
            # fetch all
            self.year = year
            self.documents = get_submissions(year)
            self.data = self.get_data(year, columns)
        elif set(columns).issubset(set(self.columns)) and year == self.year:
            # no data to fetch
            pass
        else:
            col_to_fetch = list(set(columns) - set(self.data.columns))
            new_data = self.get_data(year, col_to_fetch)

            self.data = self.data.join(new_data[columns_and_notes(col_to_fetch)],
                                       how='outer')

        self.columns = columns

        to_return = self.documents[['name', 'url']].join(
                     self.data[columns_and_notes(self.columns)],
                     how='left'
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
        data = pd.DataFrame(index=self.documents.index)
        for data_fetcher in [get_balance_sheet_data, get_cash_flow_data]:
            new_data = data_fetcher(year, columns)
            if new_data is not None:
                data = data.join(new_data)

        return data
