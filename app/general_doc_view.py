import streamlit as st
from edgar import get_filings, set_identity, Company

from utilities.renderers import render_rich

set_identity("Your Name yourname@domain.com")

st.title("Browser view of Rich documents")

company = Company("AAPL")
#financials = company.get_financials()

_ = render_rich(company.cash_flow())


REACT_COMPONENT = """
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script crossorigin src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel">
  const { useState } = React;
  function MyComponent() {
    const [count, setCount] = useState(0);
    return (
      <div>
        <p style={{ color: 'white' }}>Count: {count}</p>
        <button onClick={() => setCount(c => c + 1)}>Increment</button>
      </div>
    );
  }
  ReactDOM.createRoot(document.getElementById('root')).render(<MyComponent />);
</script>
"""
st.components.v1.html(REACT_COMPONENT, height=200)
