# data cleaning, imputation, and transformation steps at run time

import sqlite3
import pandas as pd

from utilities import original_statement_urls


def get_numbers(year, columns):
    """ Fetch and process all columns from a given year
     """
    #to do: filter only columns that use the correct unit of measure

    con = sqlite3.connect('data/processed/all10k.db')
    query = """ SELECT adsh, tag, ddate, dyear, version, coreg, qtrs, 
                 uom, value, footnote FROM num
                 WHERE (dyear=:year) AND {tagfilters}
            """
    tagfilters = "(" + \
                 " OR ".join([f"tag = :tag{i}" for i in range(len(columns))])\
                 + ")"
    query = query.format(tagfilters=tagfilters)

    params = {f'tag{i}': coli for i, coli in enumerate(columns)}
    params.update(year=str(year))

    data = pd.read_sql_query(query, con, params=params,
                             dtype={'value': float, 'adsh': str})

    # data processing
    data, notes_dups = data_processing(data)

    pivot_data = data[['adsh', 'tag', 'value']
                      ].pivot_table(index='adsh',
                                    columns='tag',
                                    values='value'
                                    )

    notes = pd.DataFrame(index=pivot_data.index,
                         columns=list(map(lambda x: x+'_notes',
                                          pivot_data.columns)),
                         dtype='string'
                         )

    # to do: incorporate notes from duplicate removal

    return pivot_data.join(notes)


def get_submissions(year):
    """ Fetch information for all documents submitted in a given year  """
    con = sqlite3.connect('data/processed/all10k.db')

    query = """SELECT adsh, cik, name, period AS period_filed, prevrpt, instance
                FROM sub WHERE fy=:year
            """

    document_data = pd.read_sql_query(query, con, params={'year': str(year)},
                                      dtype={'prevrpt': int, 'adsh': str})

    document_data['period_filed'] = pd.to_datetime(document_data['period_filed'])
    document_data['prevrpt'] = (document_data['prevrpt'] == 1)
    document_data['url'] = original_statement_urls(document_data)

    document_data = document_data.drop('instance', axis=1)
    document_data = document_data.set_index('adsh')
    return document_data


def get_years():
    con = sqlite3.connect('data/processed/all10k.db')

    all_years = pd.read_sql_query("""SELECT DISTINCT fy FROM sub;""", con)
    all_years = all_years[~all_years['fy'].isnull()]

    all_years = all_years['fy'].to_list()
    all_years.sort(reverse=True)

    return all_years


def data_processing(numerical_data):
    """ remove duplicates """
    duplicate_ind = numerical_data.duplicated(['adsh', 'tag'], keep=False)

    duplicated_rows = numerical_data[duplicate_ind]
    unique_rows = numerical_data[~duplicate_ind]

    notes = []

    def removal_rules(dup_rows):
        """ methods for handling duplicate measurements"""
        # check for multiple registrants, select only the base
        if not dup_rows['coreg'].isna().all():
            dup_rows = dup_rows[dup_rows['coreg'].isna()]
            if dup_rows.shape[0] == 1:
                return dup_rows

        # check for multiple quarters reported, select only all 4 or the largest
        if not dup_rows['qtrs'].duplicated().all():
            max_qtrs = dup_rows['qtrs'].max()

            if max_qtrs < '4':
                dup_rows = dup_rows[dup_rows['qtrs'] == max_qtrs]
            else:
                dup_rows = dup_rows[dup_rows['qtrs'] == '4']

            if dup_rows.shape[0] == 1:
                if max_qtrs < '4':
                    notes.append({'adsh': dup_rows['adsh'].iloc[0],
                                  'tag': dup_rows['tag'].iloc[0],
                                  'notes': f'{max_qtrs} quarters'
                                  })

                return dup_rows

        # check for multiple quarters, select the most recent
        # later we can also compare against filing quarter
        if not dup_rows['ddate'].duplicated().all():
            dup_rows = dup_rows[dup_rows['ddate'] == dup_rows['ddate'].max()]
            if dup_rows.shape[0] == 1:
                return dup_rows

        # multiple currencies
        if not dup_rows['uom'].duplicated().all():
            dup_rows = dup_rows[dup_rows['uom'] == 'USD']
            if dup_rows.shape[0] == 1:
                return dup_rows

        # are all of the rows the same anyway?
        if dup_rows['value'].duplicated().all():
            return dup_rows.iloc[0:1]

        print(dup_rows)

        raise Exception('Failure to remove duplicated data')

    unified_rows = duplicated_rows.groupby(['adsh', 'tag']).apply(removal_rules)

    numerical_data = pd.concat([unique_rows, unified_rows])

    return numerical_data, pd.DataFrame(notes)
