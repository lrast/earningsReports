# tools for implementing the financial logic
import pandas as pd

from read_data import get_numbers
from utilities import make_notes_from_parents, columns_and_notes


def get_balance_sheet_data(year, columns):
    """ Balance sheet data
    """
    balance_cols = ['Assets', 'Liabilities', 'StockholdersEquity',
                    'AssetsCurrent', 'LiabilitiesCurrent',
                    'CurrentAssets/Liabilities', 'WorkingCapital/Debt',
                    ]

    if len(set(balance_cols).intersection(columns)) == 0:
        return

    validation_cols = [
                    'LiabilitiesAndStockholdersEquity',
                    'StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest',
                    ]

    minority_equity_cols = [
                    'MinorityInterest',
                    'NonredeemableNoncontrollingInterest',
                    'RedeemableNoncontrollingInterestEquityCommonCarryingAmount',
                    'RedeemableNoncontrollingInterestEquityCarryingAmount',
                    'RedeemableNoncontrollingInterestEquityFairValue'
                    ]

    balance_cols += validation_cols
    balance_cols += minority_equity_cols

    data = get_numbers(year, balance_cols)

    # condense minority equity and set default to zero
    data['TotalMinorityEquity'] = data[minority_equity_cols].fillna(0.).sum(axis=1)
    data['TotalMinorityEquity_notes'] = pd.Series(dtype='string')

    # constraints on the data
    AssetvsTotal = VIConst('Assets') - VIConst('LiabilitiesAndStockholdersEquity')
    EquityisDiff = VIConst('LiabilitiesAndStockholdersEquity') - VIConst('Liabilities') \
        - VIConst('StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest')
    MinorityShares = VIConst('StockholdersEquity') + VIConst('TotalMinorityEquity') - \
        VIConst('StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest')

    data = apply_constraint_list([AssetvsTotal, MinorityShares, EquityisDiff], data)

    # compute ratios
    data['CurrentAssets/Liabilities'] = data['AssetsCurrent'] / data['LiabilitiesCurrent']
    data['WorkingCapital/Debt'] = (data['AssetsCurrent'] - data['LiabilitiesCurrent']) / \
        data['Liabilities']

    data = make_notes_from_parents(data, {'CurrentAssets/Liabilities':
                                          ['AssetsCurrent', 'LiabilitiesCurrent'],
                                          'WorkingCapital/Debt':
                                          ['AssetsCurrent', 'LiabilitiesCurrent', 'Liabilities']
                                          })

    return data[columns_and_notes(columns)]


def get_cash_flow_data(year, columns):
    """ Cash flow data
    """
    cash_flow_cols = ['Revenues', 'CostOfRevenue', 'GrossProfit',
                      'OperatingExpenses', 'OperatingIncomeLoss',
                      'CommonStockDividendsPerShareDeclared',
                      'ProfitLoss', 'NetIncomeLoss'
                      ]

    if len(set(cash_flow_cols).intersection(columns)) == 0:
        return

    validation_cols = ['PreferredStockDividendsIncomeStatementImpact',
                       'NetIncomeLossAvailableToCommonStockholdersBasic'
                       ]

    minority_income_cols = [
                         'NetIncomeLossAttributableToNoncontrollingInterest',
                         'NetIncomeLossAttributableToNoncontrollingInterestOfSubsidiary'
                        ]

    # parent fields in the data
    revenue_fields = SubFields('Revenues', ['RevenueFromContractWithCustomerExcludingAssessedTax'])
    cost_fields = SubFields('CostOfRevenue', ['CostOfGoodsAndServicesSold'])
    operating_cost_fields = SubFields('OperatingExpenses',
                                      ['SellingAndMarketingExpense',
                                       'SellingGeneralAndAdministrativeExpense',
                                       'GeneralAndAdministrativeExpense',
                                       'ResearchAndDevelopmentExpense',
                                       ])

    # constraints on the data
    DefineGrossProfit = VIConst('Revenues') - VIConst('CostOfRevenue') - VIConst('GrossProfit')
    DefineOperatingIncome = VIConst('GrossProfit') - VIConst('OperatingExpenses') - \
        VIConst('OperatingIncomeLoss')
    ProfitVsNetIncome = VIConst('ProfitLoss') - VIConst('NetIncomeLoss') \
        - VIConst('TotalNetMinorityIncome') 
    NetIncomeForShareholders = VIConst('NetIncomeLoss') \
        - VIConst('NetIncomeLossAvailableToCommonStockholdersBasic') \
        - VIConst('PreferredStockDividendsIncomeStatementImpact')

    # run data processing 
    cash_flow_cols += validation_cols
    cash_flow_cols += minority_income_cols
    cash_flow_cols += revenue_fields.child_cols
    cash_flow_cols += cost_fields.child_cols
    cash_flow_cols += operating_cost_fields.child_cols

    data = get_numbers(year, cash_flow_cols)

    data = revenue_fields.impute_parent(data)
    data = cost_fields.impute_parent(data)
    data = operating_cost_fields.impute_parent(data)

    # condense minority holders and set default to zero
    data['TotalNetMinorityIncome'] = data[minority_income_cols].fillna(0.).sum(axis=1)
    data['TotalNetMinorityIncome_notes'] = pd.Series(dtype='string')

    data = apply_constraint_list([DefineGrossProfit, DefineOperatingIncome,
                                 NetIncomeForShareholders, ProfitVsNetIncome],
                                 data)

    # compute ratios
    #data['CurrentAssets/Liabilities'] = data['AssetsCurrent'] / data['LiabilitiesCurrent']
    #data['WorkingCapital/Debt'] = (data['AssetsCurrent'] - data['LiabilitiesCurrent']) / \
    #    data['Liabilities']

    #data = make_notes_from_parents(data, {'CurrentAssets/Liabilities':
    #                                      ['AssetsCurrent', 'LiabilitiesCurrent'],
    #                                      'WorkingCapital/Debt':
    #                                      ['AssetsCurrent', 'LiabilitiesCurrent', 'Liabilities']
    #                                      })

    return data[columns_and_notes(columns)]


class SubFields(object):
    """SubFields describes fields that are itemized versions of a specific field
       These fields should be summed to determine the parent field, but only if
       the parent field is not given.
     """
    def __init__(self, parent_col, child_cols):
        super(SubFields, self).__init__()
        self.parent_col = parent_col
        self.child_cols = child_cols

    def impute_parent(self, data):
        na_parents = data[self.parent_col].isna()
        fill_data = data[na_parents][self.child_cols].fillna(0.).sum(axis=1)

        data[self.parent_col] = data[self.parent_col].fillna(fill_data)
        return data


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
        signs = self.signs.copy()
        signs.update(other.signs)
        return VIConst(f'{self.expression} + {other.expression}',
                       atoms=self.atoms+other.atoms, signs=signs)

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
        changes_made = False

        for missing in self.atoms:
            # we can impute everywhere only one column is na
            imputable = data[missing].isna() & (data[self.atoms].isna().sum(axis=1) == 1)

            for_impute = data[self.atoms][imputable].fillna(0)
            imputed_values = pd.eval(self.expression, local_dict={'df': for_impute})

            data.loc[imputable, missing] = -1 * self.signs[missing] * imputed_values
            data.loc[imputable, missing+'_notes'] = '†'

            changes_made = changes_made or imputable.any()

        return changes_made

    def validate_and_impute(self, data):
        self.validate(data)
        self.impute(data)


def apply_constraint_list(constraints, data):
    # run validation
    for constraint in constraints:
        constraint.validate(data)

    # run impute
    go = 1
    while go:
        change = False
        for constraint in constraints:
            new = constraint.impute(data)
            change = change or new

        go = change

    return data
