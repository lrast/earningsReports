# Extracting the data we want
import glob
import polars as pl


def read_folder(directory):
    """ read all of the data out of a given folder """
    dtype_overrides = {'adsh': pl.String, 'cik': pl.String, 'aciks': pl.String}
    num = pl.read_csv(directory + '/num.txt', separator='\t', dtypes=dtype_overrides)
    sub = pl.read_csv(directory + '/sub.txt', separator='\t', dtypes=dtype_overrides)
    tag = pl.read_csv(directory + '/tag.txt', separator='\t', dtypes=dtype_overrides, truncate_ragged_lines=True)
    pre = pl.read_csv(directory + '/pre.txt', separator='\t', dtypes=dtype_overrides)

    return sub, tag, num, pre


def filter_statements(sub, tag, num, pre):
    """ we only need data from the right forms """

    # filter out the 10-K statements
    sub = sub.filter(pl.col('form') == '10-K')
    num = num.filter(pl.col('adsh').is_in(sub['adsh']))
    pre = pre.filter(pl.col('adsh').is_in(sub['adsh']))

    # filter out the different tags

    return sub, tag, num, pre


def accumulate_data():
    """ put together the datasets  """
    all_data = glob.glob('data/raw/*')
    all_data.sort()

    db_url = 'sqlite:///data/processed/all10k.db'

    for directory in all_data:
        print(directory)
        sub, tag, num, pre = read_folder(directory)
        sub, tag, num, pre = filter_statements(sub, tag, num, pre)

        sub.write_database('sub', db_url, if_table_exists='append')
        tag.write_database('tag', db_url, if_table_exists='append')
        num.write_database('num', db_url, if_table_exists='append')
        pre.write_database('pre', db_url, if_table_exists='append')

