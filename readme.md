# Corporate earnings data

The overall goal of this application is to build a data interface for earnings report data exploration.


Objectives for AI / search component of this application:
1. Plot the returns of an alternative SPY that weights securities by earnings rather than market cap.

2. What is the right sheet to find cost of goods sold? (eg)



## Supporting
1. edgartools - fetch corporate data from the Edgar webpage
2. yfinance - fetch market data from yahoo finance
3. streamlit - data visualization and manipulation
4. kbar / ninja-keys: javascript command palette libraries


## Rejected:
No ag-grid. It's massively slower than the streamlit builtin (due to JSON vs arrow encodings, I guess)

## Run

`streamlit run app/Home.py`
