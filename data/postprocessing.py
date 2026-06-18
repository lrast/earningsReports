# cleaning and formatting the assembled datasheets 
import pandas as pd


def basic_cleaning(df):
    # set the types
    df['fiscal_year'] = df['fiscal_year'].astype(int)
    df['period_start'] = pd.to_datetime(df['period_start'], unit='s')
    df['period_end'] = pd.to_datetime(df['period_end'], unit='s')

    # handle overlapping labels:
    # rename concepts with overlapping labels that differ only in prefix 
    concepts_by_label = df.groupby('label')['concept']

    for concepts in concepts_by_label.unique()[(concepts_by_label.nunique() > 1)]:
        if len(concepts) == 2:
            for old_name in concepts:
                prefix, name = old_name.split(':')
                if prefix == 'srt':
                    new_name = 'us-gaap:' + name
                    df.loc[df['concept'] == old_name, 'concept'] = new_name

    # more deduplication: now on the fiscal year
    # same value duplicates
    df = df.drop_duplicates(subset=['concept', 'fiscal_year', 'cik', 'value'], keep='first')

    # tie break by later period-end date
    df_sorted = df.sort_values(by=['concept', 'cik', 'fiscal_year', 'period_end'])
    df = df_sorted.drop_duplicates(subset=['concept', 'fiscal_year', 'cik'], keep='last')

    return df


def concept_filtering(df, threashold=0.95):
    """ filter concepts: most concepts appear for less than 5% of companies
    """
    concept_data = df.pivot(index=['cik', 'fiscal_year'], columns='concept', values='value')
    concept_sparsity = concept_data.isna().mean()

    common_concepts = concept_data.columns[concept_sparsity < threashold]
    df = df[df['concept'].isin(common_concepts)]

    # also return concepts and labels sorted by frequency
    concept_labels = df[['concept', 'label', 'statement_type']].drop_duplicates()
    sparsity_df = pd.DataFrame(concept_sparsity[concept_sparsity < threashold].sort_values()
                               ).reset_index()
    metadata = pd.merge(sparsity_df, concept_labels, on='concept', how='left')
    metadata = metadata

    return df, metadata


if __name__ == '__main__':
    data = pd.read_parquet('fetched.parquet')
    data = basic_cleaning(data)
    data, metadata = concept_filtering(data)

    data.to_parquet('sheets.parquet', index=False)
    metadata.to_parquet('metadata.parquet', index=False)
