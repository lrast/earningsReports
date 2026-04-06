import streamlit as st
from renderers import render_rich
from edgar import get_filings, set_identity, Company

st.set_page_config(layout="wide")

set_identity("Your Name yourname@domain.com")

st.title("Browser view of Rich documents")

company = Company("AAPL")
financials = company.get_financials()

_ = render_rich(financials.cashflow_statement())
