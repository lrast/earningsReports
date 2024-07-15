# simple data fetching
from database.read_data import get_numbers, get_submissions
from data_preprocessing import submission_processing, numbers_processing
from finance_logic import VIConst


def get_data(year, columns):
    """ data fetching pipeline
        numerical data -> duplicate removal -> pivot and join

    """
    # to do: parse requested columns into data to fetch.
    balance_cols = ['Assets', 'Liabilities', 'AssetsCurrent', 'LiabilitiesCurrent',
                    'LiabilitiesAndStockholdersEquity', 'StockholdersEquity',
                    'CurrentAssets/Liabilities', 'WorkingCapital/Debt'
                    ]

    to_fetch = {'balance': False}

    for col in columns:
        if col in balance_cols:
            to_fetch['balance'] = True

    balance_data = balance_sheet_ratios(get_balance_sheet_data(year))

    operations_data = get_operations_data(year)

    document_data = submission_processing(get_submissions(year))

    all_data = balance_data.merge(operations_data, on='adsh', how='outer')

    return all_data.merge(document_data, on='adsh', how='outer')


def get_balance_sheet_data(year):
    """ Balance sheet specifice data processing  """
    balance_cols = ['Assets', 'Liabilities', 'AssetsCurrent', 'LiabilitiesCurrent',
                    'LiabilitiesAndStockholdersEquity', 'StockholdersEquity',
                    ]

    balance_data = numbers_processing(get_numbers(year, balance_cols))

    # constraints on the data
    AssetvsTotal = VIConst('Assets') - VIConst('LiabilitiesAndStockholdersEquity')
    EquityisDiff = VIConst('Assets') - VIConst('Liabilities') - VIConst('StockholdersEquity')

    AssetvsTotal.validate_and_impute(balance_data)
    EquityisDiff.validate_and_impute(balance_data)

    balance_data.drop(['LiabilitiesAndStockholdersEquity', 'LiabilitiesAndStockholdersEquity_notes'],
                      axis='columns', inplace=True)

    return balance_data


def balance_sheet_ratios(balance_data):
    # computing ratios

    # to do: book value per share
    balance_data['CurrentAssets/Liabilities'] = \
        balance_data['AssetsCurrent'] / balance_data['LiabilitiesCurrent']
    balance_data['WorkingCapital/Debt'] = \
        (balance_data['AssetsCurrent'] - balance_data['LiabilitiesCurrent']) / \
        balance_data['Liabilities']

    balance_data = make_notes(balance_data, {'CurrentAssets/Liabilities':
                                             ['AssetsCurrent', 'LiabilitiesCurrent'],
                                             'WorkingCapital/Debt':
                                             ['AssetsCurrent', 'LiabilitiesCurrent', 'Liabilities']
                                             })
    return balance_data


def get_operations_data(year):
    """ in plain text, we want:
    Revenues,
    Net
    Interest
    Earnings per share
    Dividend
     """
    operations_cols = ['Revenues', 'CommonStockDividendsPerShareDeclared',
                       'RevenueFromContractWithCustomerExcludingAssessedTax',
                       'CostsAndExpenses', 'NetIncomeLoss', 'OperatingIncomeLoss',
                       'ProfitLoss', 'GrossProfit']

    operations_data = numbers_processing(get_numbers(year, operations_cols))

    return operations_data


def earnings_ratios():
    """in plain text, we want:
        Net / revenue

    """
    pass


def earnings_balance_ratios():
    """in plain text, we want:
        Net / book value

    """
    pass


def price_dependent_ratios():
    """in plain text, we want:
    price / earnings
    price / book value
    market cap / revenues

    dividend yield

    """
    pass


def make_notes(data, colDependencies):
    for name, dependencies in colDependencies.items():
        data[f'{name}_notes'] = None
        for col in dependencies:
            data[f'{name}_notes'].fillna(f'{col}_notes')

    return data
