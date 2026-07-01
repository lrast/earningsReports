"""Sort tabular company data by search-query relevance."""

from __future__ import annotations

import polars as pl
from rapidfuzz import fuzz, utils

_PROCESSOR = utils.default_process


def _ticker_relevance(query: str, tickers: str | None) -> float:
    if not tickers:
        return 0.0
    processed_query = _PROCESSOR(query)
    return max(
        (
            fuzz.ratio(processed_query, _PROCESSOR(ticker))
            for ticker in tickers.split(",")
            if ticker.strip()
        ),
        default=0.0,
    )


def _row_relevance(company: str, tickers: str | None, query: str) -> float:
    company_score = fuzz.WRatio(query, company, processor=_PROCESSOR)
    return max(company_score, _ticker_relevance(query, tickers))


def sort_by_company_relevance(
    frame: pl.DataFrame,
    query: str,
    *,
    company_col: str = "company",
    tickers_col: str = "tickers",
) -> pl.DataFrame:
    """Return *frame* sorted by how well *company_col* matches *query*.

    Non-matching rows are kept and appear after matches. An empty query
    preserves the incoming row order.
    """
    q = query.strip()
    if not q or frame.is_empty():
        return frame

    relevance = (
        pl.struct(company_col, tickers_col)
        .map_elements(
            lambda row: _row_relevance(row[company_col], row[tickers_col], q),
            return_dtype=pl.Float64,
        )
        .alias("_company_relevance")
    )

    return (
        frame.with_columns(relevance)
        .sort("_company_relevance", descending=True)
        .drop("_company_relevance")
    )
