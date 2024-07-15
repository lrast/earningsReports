# tools for implementing the financial logic
import pandas as pd

from database.read_data import get_numbers
from data_preprocessing import numbers_processing

from utilities import make_notes_from_parents, columns_to_return


def get_balance_sheet_data(year, columns):
    """ Balance sheet data
    """
    balance_cols = ['Assets', 'Liabilities', 'AssetsCurrent', 'LiabilitiesCurrent',
                    'LiabilitiesAndStockholdersEquity', 'StockholdersEquity',
                    'CurrentAssets/Liabilities', 'WorkingCapital/Debt'
                    ]

    if len(set(balance_cols).intersection(columns)) == 0:
        return

    data = numbers_processing(get_numbers(year, balance_cols))

    # constraints on the data
    AssetvsTotal = VIConst('Assets') - VIConst('LiabilitiesAndStockholdersEquity')
    EquityisDiff = VIConst('Assets') - VIConst('Liabilities') - VIConst('StockholdersEquity')

    AssetvsTotal.validate_and_impute(data)
    EquityisDiff.validate_and_impute(data)

    # compute ratios
    data['CurrentAssets/Liabilities'] = data['AssetsCurrent'] / data['LiabilitiesCurrent']
    data['WorkingCapital/Debt'] = (data['AssetsCurrent'] - data['LiabilitiesCurrent']) / \
        data['Liabilities']

    data = make_notes_from_parents(data, {'CurrentAssets/Liabilities':
                                          ['AssetsCurrent', 'LiabilitiesCurrent'],
                                          'WorkingCapital/Debt':
                                          ['AssetsCurrent', 'LiabilitiesCurrent', 'Liabilities']
                                          })

    return data[columns_to_return(columns)]


class VIConst(object):
    """ Validation and Interpolation Constraint:
        captures relations that should hold on the data, for example
        StockholdersEquity = Assets - Liabilities
        becomes
        VIConst(Assets) - VIConst(Liabilities) - VIConst(StockholdersEquity)
        Which should always be zeros
        This expression can then be used to validate and interpolate a dataframe
     """
    def __init__(self, expression, atoms=None, signs=None):
        if atoms is None:
            self.expression = f'df.{expression}'
            self.atoms = [expression]
            self.signs = {expression: 1}
        else:
            self.expression = f'{expression}'
            self.atoms = atoms
            self.signs = signs

    def __repr__(self):
        return self.expression

    def __add__(self, other):
        return VIConst(f'{self.expression} + {other.expression}', atoms=self.atoms+other.atoms)

    def __sub__(self, other):
        signs = self.signs.copy()
        signs.update({key: -1*value for key, value in other.signs.items()})

        return VIConst(f'{self.expression} - {other.expression}',
                       atoms=self.atoms+other.atoms, signs=signs)

    def validate(self, data):
        # only validate columns without nan
        to_check = ~data[self.atoms].isna().any(axis=1)

        # TO DO: round the number of significant digits
        column_results = pd.eval(self.expression, local_dict={'df': data[to_check]})

        validation_fail = column_results.index[column_results != 0.]

        note_cols = [name+'_notes' for name in self.atoms]
        data.loc[validation_fail, note_cols] = '*'

    def impute(self, data):
        for missing in self.atoms:
            # we can impute everywhere only one column is na
            imputable = data[missing].isna() & (data[self.atoms].isna().sum(axis=1) == 1)

            for_impute = data[self.atoms][imputable].fillna(0)
            imputed_values = pd.eval(self.expression, local_dict={'df': for_impute})
            data.loc[imputable, missing] = -1 * self.signs[missing] * imputed_values

            data.loc[imputable, missing+'_notes'] = '**'

    def validate_and_impute(self, data):
        self.validate(data)
        self.impute(data)
