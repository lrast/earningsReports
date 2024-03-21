# 'backend' functions for working with data between the database and frontend

def transform_to_links(data):
    data['url'] = '[filing]('+data['url'] + ')'
    return data