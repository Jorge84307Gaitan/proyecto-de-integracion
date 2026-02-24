import streamlit as st
from src.urban_eye.views import render_header, render_home
from src.urban_eye.repositories.incident_repository import init_db, save_incident, list_incidents


class MainController:
    def run(self) -> None:
        init_db()
        render_header()
        section = st.sidebar.selectbox("Panel", ["Inicio", "Reportar"])

        if section == "Inicio":
            click = render_home()
            if click:
                self.show_reports()

        elif section == "Reportar":
            self.handle_report()

    def show_reports(self) -> None:
        st.subheader("Reportes registrados")
        rows = list_incidents()
        st.dataframe(rows, use_container_width=True)

    def handle_report(self) -> None:
        st.subheader("Reporte de incidente")
        tipo = st.selectbox("Tipo de incidente", ["Accidente", "Bache", "Semaforo"])
        descripcion = st.text_area("Descripcion")

        if st.button("Guardar reporte", type="primary", use_container_width=True):
            save_incident(tipo, descripcion)
            st.success("Reporte guardado")

