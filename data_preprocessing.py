# data cleaning, imputation, and transformation steps at run time

import pandas as pd

from web_utilities import original_statement_urls


def submission_processing(document_data):
    """ processing stages for  """
    document_data['url'] = original_statement_urls(document_data)

    document_data = document_data.drop('instance', axis=1)
    return document_data


def numbers_processing(numerical_data, uom=None):
    """ Use the metadata to make sure that the data says what we think it says.
     """
    # filter only columns that use the correct unit of measure

    numerical_data, notes_dups = remove_duplicates(numerical_data)

    # to do: incorporate notes from duplicate removal

    pivot_data = numerical_data[['adsh', 'tag', 'value']
                                ].pivot_table(index='adsh',
                                              columns='tag',
                                              values='value'
                                              )

    notes = pd.DataFrame(index=pivot_data.index,
                         columns=list(map(lambda x: x+'_notes',
                                          pivot_data.columns))
                         )

    return pivot_data.join(notes)


def remove_duplicates(numerical_data):
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

