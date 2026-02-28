import { Button, Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section>
      <h2 className="section-title">Servicios Urban Eye</h2>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Link to="/menu/reportes">
            <Card className="service-card clickable-card">
              <h3>Reportes</h3>
              <p>Ver incidentes registrados</p>
            </Card>
          </Link>
        </Col>
        <Col xs={24} md={8}>
          <Card className="service-card">
            <h3>Analitica</h3>
            <p>Consulta el estado de la movilidad.</p>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="service-card">
            <h3>EAN Labs</h3>
            <p>Innovacion academica.</p>
          </Card>
        </Col>
      </Row>
    </section>
  );
}
