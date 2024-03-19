# simple data fetching
import sqlite3
import pandas as pd

from web_utilities import original_statement_urls


def get_data(year, columns):
    """ data fetching pipeline
        numerical data -> duplicate removal -> pivot and join

    """
    # 1. get numerical data entries
    numerical_data = get_numbers(year, columns)
    numerical_data = process_to_table(numerical_data)

    document_data = get_submissions(year)

    return numerical_data.merge(document_data, on='adsh')


def get_numbers(year, columns):
    """ Fetch all columns from a given year """
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

    entries = pd.read_sql_query(query, con, params=params,
                                dtype={'value': float, 'adsh': str})

    return entries


def get_submissions(year):
    """ Fetch company information for submissions in a given year """
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

    return document_data


def process_to_table(numerical_data):
    """ process number data to table by:
        1. removal of duplicates
        2. pivot 
    """

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

        # are all of the rows the same anyway?
        if dup_rows['value'].duplicated().all():
            return dup_rows.iloc[0:1]

        raise Exception('Failure to remove duplicated data')

    unified_rows = duplicated_rows.groupby(['adsh', 'tag']).apply(removal_rules)

    numerical_data = pd.concat([unique_rows, unified_rows])

    pivot = numerical_data[['adsh', 'tag', 'value']].pivot_table(index='adsh',
                                                                 columns='tag',
                                                                 values='value'
                                                   ).reset_index()

    return pivot, pd.DataFrame(notes)
