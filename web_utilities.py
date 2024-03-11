# (planned) utilities for web data

def original_statement_urls(data):
    """ Redirect for the original copy of a statement in the edgar database """
    # SEC website folder http://www.sec.gov/Archives/edgar/data/{cik}/{accession}/

    # !!! no joy here. need to debug

    baseURL = 'https://www.sec.gov/ixviewer/ix.html?doc=/Archives/edgar/data/{cik}/{adsh}/{instance}'

    def makeurl(row):
        return baseURL.format(cik=row['cik'], instance=row['instance'],
                              adsh=row['adsh'].replace('-', '')
                              )

    return data.apply(makeurl, axis=1)


def get_pricing_and_ticker(company):
    """ fetch market data for a given symbol """
    pass
