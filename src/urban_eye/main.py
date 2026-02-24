import streamlit as st

from .styles import STYLES
from .views import render_header, render_home


def run() -> None:
    st.set_page_config(page_title="Urban Eye Pro | EAN", page_icon="🏙️", layout="wide")
    st.markdown(STYLES, unsafe_allow_html=True)

    render_header()
    section = st.sidebar.selectbox("Panel", ["Inicio"])

    if section == "Inicio":
        render_home()
