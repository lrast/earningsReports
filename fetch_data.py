# simple data fetching
import sqlite3
import pandas as pd


def get_entries(year, columns):
    """ Fetch requisite data from the database """

    con = sqlite3.connect('data/processed/all10k.db')

    # to change: select all companies w/ null values if the entries are not there
    # change to a right join, drop documne adsh
    query = """ SELECT * FROM
                (SELECT adsh, tag, ddate, dyear, version, coreg, qtrs, 
                 uom, value, footnote FROM num
                 WHERE (dyear=:year) AND {tagfilters}
                ) AS number_table
                INNER JOIN
                (SELECT adsh AS adsh_, cik, name, period AS period_filed, prevrpt,
                 instance FROM sub
                 WHERE fy=:year) AS filedata
                ON filedata.adsh_ == number_table.adsh
            """

    tagfilters = "(" + \
                 " OR ".join([f"tag = :tag{i}" for i in range(len(columns))])\
                 + ")"
    query = query.format(tagfilters=tagfilters)

    params = {f'tag{i}': coli for i, coli in enumerate(columns)}
    params.update(year=str(year))

    entries = pd.read_sql_query(query, con, params=params,
                                dtype={'prevrpt': int, 'value': float})

    entries = entries.drop('adsh_', axis=1)
    entries['period_filed'] = pd.to_datetime(entries['period_filed'])
    entries['prevrpt'] = (entries['prevrpt'] == 1)

    return entries


def process_to_table(data):
    pass
