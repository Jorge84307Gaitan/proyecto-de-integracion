from pathlib import Path

import streamlit as st


PROJECT_ROOT = Path(__file__).resolve().parents[2]
ASSETS_DIR = PROJECT_ROOT / "assets"


def render_header() -> None:
    col_logo, col_title = st.columns([1, 4])
    with col_logo:
        logo_path = ASSETS_DIR / "logo_urban.png"
        if logo_path.exists():
            st.image(str(logo_path), width=200)
        else:
            st.image(
                "https://universidadean.edu.co/sites/default/files/logo-ean-header.png",
                width=200,
            )

    with col_title:
        st.markdown(
            "<div class='header-ean'><h1>Urban Eye: Movilidad Inteligente</h1>"
            "<p>Universidad EAN - Facultad de Ingenieria</p></div>",
            unsafe_allow_html=True,
        )

def render_home() -> bool:
    st.markdown(
        "<h2 style='color: white; text-align: center;'>Servicios Urban Eye</h2>",
        unsafe_allow_html=True,
    )

    c1, c2, c3 = st.columns(3)

    with c1:
        click_reportes = st.button(
            "REPORTES\n\nVer incidentes registrados",
            key="card_reportes",
            use_container_width=True,
        )

    with c2:
        st.markdown(
            """<div class="stCard"><h3>Analitica</h3><p>Consulta el estado de la movilidad.</p></div>""",
            unsafe_allow_html=True,
        )

    with c3:
        st.markdown(
            """<div class="stCard"><h3>EAN Labs</h3><p>Innovacion academica.</p></div>""",
            unsafe_allow_html=True,
        )

    return click_reportes

