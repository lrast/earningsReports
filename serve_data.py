# 'backend' functions for working with data between the database and frontend

from fetch_data import get_data


class DataBuffer(object):
    """ DataBuffer: holds the current working data, so that we don't have to
        refetch it too frequently
    """
    def __init__(self):
        super(DataBuffer, self).__init__()
        self.year = None
        self.current_data = None
        self.columns = ['AssetsCurrent', 'LiabilitiesCurrent', 'Revenues']

    def fetch(self, year, unit):
        """ primary interface:
            format and return the data for a specific year and units
        """
        if year != self.year:
            self.reset_buffer(year)

        to_return = self.current_data.copy()
        units = {'$': 1, 'millions $': 1E6, 'billions $': 1E9}
        to_return[self.columns] = to_return[self.columns] / units[unit]

        return transform_to_links(to_return)

    def reset_buffer(self, year):
        """ fetch data for a year """
        self.year = year
        self.current_data = get_data(year, self.columns)

    def change_columns(self, columns):
        """ reset the column values """
        self.columns = columns
        self.reset_buffer(self.year)


def transform_to_links(data):
    data['url'] = '[filing]('+data['url'] + ')'
    return data
