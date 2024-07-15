# utilities for columns with notes
def columns_to_return(columns):
    """ Columns and their corresponding notes """
    out = []
    for col_name in columns:
        out.append(col_name)
        out.append(col_name + '_notes')
    return out


def make_notes_from_parents(data, colDependencies):
    """ Accumulate note attached to parent columns """
    for name, dependencies in colDependencies.items():
        data[f'{name}_notes'] = None
        for col in dependencies:
            data[f'{name}_notes'].fillna(f'{col}_notes')

    return data


# URL parsing
def original_statement_urls(data):
    """ Redirect for the original copy of a statement in the edgar database """
    # SEC website folder http://www.sec.gov/Archives/edgar/data/{cik}/{accession}/

    basic_URL = 'https://www.sec.gov/Archives/edgar/data/{cik}/{adsh_strip}/{adsh_full}-index.html'
    interactive_URL = 'https://www.sec.gov/ixviewer/ix.html?doc=/Archives/edgar/data/{cik}/{adsh}/{instance}'

    def makeurl(row):
        if row['instance'][-8:] == '_htm.xml':
            # try linking to the interactive version of the document
            instance = row['instance'][:-8] +'.htm'
            return interactive_URL.format(cik=row['cik'], instance=instance,
                                          adsh=row['adsh'].replace('-', '')
                                          )
        else:
            # fallback and link to the document in the archive
            return basic_URL.format(cik=row['cik'],
                                    adsh_strip=row['adsh'].replace('-', ''),
                                    adsh_full=row['adsh']
                                    )

    return data.apply(makeurl, axis=1)