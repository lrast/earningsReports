import time
import pandas as pd

from edgar import set_identity, get_filings, Company

from rich.progress import track

# set to proper id for edgar usage
id = "Your Name yourname@domain.com"
set_identity(id)


def fetch_datasheets(file_name='sheets', write_interval=50):
    """Fetch all of the data-sheets by company:
    Each company fetchs all information across years
    """
    ciks_found = {}

    for year in range(time.gmtime().tm_year, 1993, -1):
        filings = get_filings(year=year, form='10-K')
        print(year, len(ciks_found))
        for filing in track(filings):
            if filing.cik in ciks_found:
                continue

            curr_sheets = assemble_sheets(filing)

            if len(ciks_found) == 0:
                all_sheets = curr_sheets
            else:
                all_sheets = pd.concat([all_sheets, curr_sheets])

            if len(ciks_found) % write_interval == 0:
                all_sheets.to_parquet(file_name, index=False)

            ciks_found[filing.cik] = True

        # make sure to write the last set of filings
        all_sheets.to_parquet(file_name, index=False)


def assemble_sheets(filing):
    """ Get all sheets for a given filing
    Note: there is another set of filings:
        -  filing.xbrl().statements.cashflow_statement().to_dataframe()
    For now, I think the company filings are enough
    """
    company = Company(filing.cik)

    # company datasheets
    sheets = pd.concat([
            process_company_sheet(company.balance_sheet(periods=30, annual=True)),
            process_company_sheet(company.cash_flow(periods=30, annual=True)),
            process_company_sheet(company.income_statement(periods=30, annual=True))
            ])

    if len(sheets) > 0:
        sheets = sheets.reset_index()
        sheets = sheets.rename(columns={name: int(name[3:]) for name in sheets.columns
                                        if name[0:2] == 'FY'})
        sheets = sheets.melt(id_vars=['concept', 'label']
                             ).rename(columns={'variable': 'year'})

        sheets['company'] = company.name
        sheets['tickers'] = [company.tickers for i in range(len(sheets))]
        sheets['cik'] = filing.cik

    return sheets


def process_company_sheet(sheet):
    if sheet is None:
        return pd.DataFrame([])
    sheet = sheet.to_dataframe()

    if len(sheet) == 0:
        return pd.DataFrame([])

    return sheet[~sheet.is_abstract].drop(columns=['depth', 'is_abstract',
                                          'is_total', 'section', 'confidence'])
