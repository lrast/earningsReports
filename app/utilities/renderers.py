# helpers for rendering
import streamlit as st
from rich.console import Console


def render_rich(rich_object):
    """
    Renders any Rich object (Table, Panel, Text, etc.) into Streamlit.
    """
    # 1. Create a console that records its output
    console = Console(record=True, width=100)
    
    # 2. Print the object to this invisible console
    console.print(rich_object)
    
    # 3. Export to HTML with inline styles (no external CSS needed)
    # code_format="{code}" removes the surrounding <pre> and <html> tags
    html_content = console.export_html(inline_styles=True, code_format="{code}")
    
    # 4. Wrap it in a div with a terminal-like font
    st.html(f"""
        <div style="font-family: 'Courier New', monospace; white-space: pre; 
                    background-color: #0c0c0c; color: #cccccc; padding: 25px; 
                    
                    border-radius: 5px; line-height: 1.2; overflow-x: auto;">
            {html_content}
        </div>
    """, width="stretch")
