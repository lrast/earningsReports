# simple data fetching
from database.read_data import get_numbers, get_submissions
from data_transformation import submission_processing, numbers_processing
from validate_impute import VIConst


def get_data(year, columns):
    """ data fetching pipeline
        numerical data -> duplicate removal -> pivot and join

    """
    numerical_data = get_numbers(year, columns)
    print('numbers fetched')
    numerical_data = numbers_processing(numerical_data)

    print('numbers cleaned')  # to do: speed up data cleaning
    #notes = pivot_to_table(notes)
    #append notes to numerical data
    Asset = VIConst('Assets') - VIConst('LiabilitiesAndStockholdersEquity')
    Equity = VIConst('Assets') - VIConst('Liabilities') - VIConst('StockholdersEquity')

    Asset.validate_and_impute(numerical_data)
    Equity.validate_and_impute(numerical_data)

    document_data = submission_processing(get_submissions(year))

    print('documents fetched')

    return numerical_data.merge(document_data, on='adsh')


def balance_sheet_data(year):
    """ Balance sheet specifice data processing  """
    balance_cols = ['Assets', 'Liabilities', 'StockholdersEquity',
                    'LiabilitiesAndStockholdersEquity',
                    ]

    nums, notes = numbers_processing(get_numbers(year, balance_cols))
    # return numerical_data, notes

    # check global constraints (assets == LiabilitiesAndStockholdersEquity)
    unequal = nums[~nums[['Assets', 'LiabilitiesAndStockholdersEquity']].isna().any() &
                   nums['Assets'] != nums['LiabilitiesAndStockholdersEquity']].index
    notes.loc[unequal, 'Assets_notes'] = '*'

    all_entries = ~nums[['Assets', 'Liabilities', 'StockholdersEquity']].isna().any(axis=1)

    # impute missing data values
    # Fill assets in from LiabilitiesAndStockholdersEquity
    nums['Assets'].fillna(value=nums['LiabilitiesAndStockholdersEquity'], inplace=True)


    # we need two of the three (assets, Liabilities, StockholdersEquity)

