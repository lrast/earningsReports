import streamlit as st
from edgar import get_filings, set_identity, Company

from utilities.renderers import render_rich

set_identity("Your Name yourname@domain.com")

st.title("Browser view of Rich documents")


company = Company("AAPL")
#financials = company.get_financials()

render_rich(company.cash_flow())
