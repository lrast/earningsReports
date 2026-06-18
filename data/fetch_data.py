import pandas as pd

from edgar import set_identity, Company, reference
from edgar.enums import PeriodType


from rich.progress import track

# set to proper id for edgar usage
id = "Your Name yourname@domain.com"
set_identity(id)


def selected_datapoints(file_name='fetched.parquet'):
    """Fetch selected datapoints across years and companies

    Limited to companies with an active ticker symbol
    """
    all_data = []

    # querying only companies with a ticker
    ticker_cik_refs = reference.tickers.get_cik_tickers()

    i = 0
    for cik in track(ticker_cik_refs['cik'].unique()):
        cik = int(cik)

        i += 1
        if i > 0 and i % 1000 == 0:
            pd.concat(all_data).to_parquet(file_name, index=False)

        company = Company(cik)
        facts = company.get_facts()

        def query(): return facts.query().by_form_type('10-K')

        if facts is None:  # make sure the data is available
            continue

        # 1) assemble all of the tickers
        tickers = ','.join(ticker_cik_refs.loc[
                        ticker_cik_refs['cik'] == cik,
                        'ticker'
                ])

        # market data reported on the 10-K
        public_float = query().by_concept('dei:EntityPublicFloat').to_dataframe()
        public_float = clean_and_dedup_data(public_float)

        shares_outstanding = query().by_concept('dei:EntityCommonStockSharesOutstanding').to_dataframe()
        shares_outstanding = clean_and_dedup_data(shares_outstanding)

        # other data
        financials_data = query().by_period_type(PeriodType.ANNUAL).to_dataframe()
        financials_data = clean_and_dedup_data(financials_data)

        # balance sheets data is not period type annual
        balance_data = query().by_statement_type("BalanceSheet").to_dataframe()
        balance_data = clean_and_dedup_data(balance_data)

        data = pd.concat([public_float, shares_outstanding, financials_data, balance_data])
        data['cik'] = cik
        data['tickers'] = tickers
        data['company'] = company.name

        all_data.append(data)

    pd.concat(all_data).to_parquet(file_name, index=False)


def clean_and_dedup_data(df):
    """ cleaning and de-duplicating rows.

    There are a couple of things happening at the same time:
    1) previous-year data-points reported on later statements

    2) the _first_ statement that we have report non-duplicated information
        from earlier years

    """
    if len(df) == 0:
        return df

    df['period_end'] = pd.to_datetime(df['period_end'])

    # hard remove any duplicated concept, value, period_ends
    # note: this breaks the fiscal_year encoding
    df = df.drop_duplicates(subset=['concept', 'value', 'period_end'])

    # genuine multiply reported values: 
    # Take the one that has more significant figures (frequently casuse mismatches)
    # Tie break with reported year (bigger is better)

    df['precision_score'] = df['value'].fillna(0).astype(str).str.rstrip('0.').str.len()
    df_sorted = df.sort_values(by=['concept', 'period_end', 'precision_score',
                                   'fiscal_year'])
    df = df_sorted.drop_duplicates(subset=['concept', 'period_end'], keep='last')

    # set fiscal_year based on end date
    years_ended = df['period_end'].dt.year
    df['fiscal_year'] = years_ended

    # drop columns with broken associations, working columns
    df = df.drop(columns=['accession', 'filing_date', 'precision_score'])

    return df
