# database reading functions

import sqlite3
import pandas as pd


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

    return document_data


def get_years():
    con = sqlite3.connect('data/processed/all10k.db')

    all_years = pd.read_sql_query("""SELECT DISTINCT fy FROM sub;""", con)
    all_years = all_years[~all_years['fy'].isnull()]

    return all_years['fy'].to_list()
