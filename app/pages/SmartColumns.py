import streamlit as st
import polars as pl

metadata = pl.read_parquet("data/metadata.parquet")
labels = metadata["label"].to_list()


st.title("Smart Columns")

st.markdown(
    "Column filling and extrapolation."
)

st.button("", icon="➕", use_container_width=True)
