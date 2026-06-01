import polars as pl
import json


def make_commands_json():
    data = pl.read_parquet('data/sheets.parquet')

    companies = data['company'].unique().drop_nulls().sort()
    tickers = data['tickers'].explode().unique().drop_nulls().sort()
    years = data['year'].unique().drop_nulls().sort(descending=True)

    # ticker to company translation
    pairs = data[['company', 'tickers']].explode('tickers').unique().drop_nulls()
    ticker_to_company = dict(pairs.group_by('tickers').agg(pl.col("company")).iter_rows())

    # make the statement_commands
    statement_commands = [
                          { "slug": "balance_sheet", "name": "Balance Sheet" },
                          { "slug": "income", "name": "Income" },
                          { "slug": "equity", "name": "Equity" },
                          { "slug": "cash_flow", "name": "Cash Flow" },
                          { "slug": "comprehensive_income", "name": "Comprehensive Income" }
    ]

    # make the year commands
    year_commands = [{"slug": str(year), "name": str(year)} for year in years]

    # make company commands - handling edge cases of tickers that have been reassigned
    company_ticker_commands = {}

    for ticker in tickers:
        associated_companies = ticker_to_company[ticker]
        if len(associated_companies) > 1:
            # just resolve via company name
            for c in associated_companies:
                company_ticker_commands[f'ticker:{ticker}/company:{c}'] = {"name": f'{ticker} - {c}',
                                                                           "section": "Tickers",
                                                                           "priority": 20}
        else:
            company_ticker_commands[f'ticker:{ticker}'] = {"name": f'{ticker} - {associated_companies[0]}',
                                                           "section": "Tickers",
                                                           "priority": 20}

    company_name_commands = {f'company:{cname}': {'name': cname, "section": "Companies", "priority": 10}
                             for cname in companies
                             }

    json.dump({
        "commands": company_name_commands | company_ticker_commands,
        "subcommands": statement_commands,
        "subsubcommands": year_commands,
    }, open('frontend/src/command_palette_commands.json', 'w'))


if __name__ == '__main__':
    make_commands_json()
