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

## Front end (React / Vite)

All front-end tooling lives under `frontend/` (`package.json`, `node_modules`, `vite.config.js`). Source components are in `frontend/components/`; Vite bundles them into `app/static/dist/`, which Streamlit loads at runtime.

From `frontend/`:

- `npm install` — install dependencies (first time, or after `package.json` changes)
- `npm run build` — production build into `app/static/dist/`
- `npm run dev` — same build in watch mode; recompiles when you edit components

Run `npm run build` after changing front-end code before starting Streamlit (or keep `npm run dev` running in another terminal while you work).

## Run

`streamlit run app/Home.py`
