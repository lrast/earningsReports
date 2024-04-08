# simple data fetching
import sqlite3
import pandas as pd

from web_utilities import original_statement_urls
from data_transformation import remove_duplicates


def get_data(year, columns):
    """ data fetching pipeline
        numerical data -> duplicate removal -> pivot and join

    """
    numerical_data = get_numbers(year, columns)
    numerical_data, notes = remove_duplicates(numerical_data)

    numerical_data = pivot_to_table(numerical_data)
    #notes = pivot_to_table(notes)
    #append notes to numerical data

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


def get_years():
    con = sqlite3.connect('data/processed/all10k.db')

    all_years = pd.read_sql_query("""SELECT DISTINCT fy FROM sub;""", con)

    all_years = all_years[~all_years['fy'].isnull()]

    return all_years['fy'].to_list()


def pivot_to_table(numerical_data):
    """ pivot 
    """
    pivot = numerical_data[['adsh', 'tag', 'value']].pivot_table(index='adsh',
                                                                 columns='tag',
                                                                 values='value'
                                                   ).reset_index()

    return pivot
