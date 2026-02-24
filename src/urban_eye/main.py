import streamlit as st

from .controllers.main_controller import MainController
from .styles import STYLES


def run() -> None:
    st.set_page_config(page_title="Urban Eye Pro | EAN", page_icon="🏙️", layout="wide")
    st.markdown(STYLES, unsafe_allow_html=True)

    controller = MainController()
    controller.run()
