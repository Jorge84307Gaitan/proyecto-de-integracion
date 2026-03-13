import { useEffect, useState } from "react";
import { Alert, Button, Card, Select, Space, Table, Tag } from "antd";
import { downloadPdf, listIncidents } from "../services/incidents.service";
import { useAuth } from "../context/AuthContext";

export default function ReportsPage() {
  const [loading, setLoading] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [error, setError] = useState("");
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [period, setPeriod] = useState("weekly");
  const { token } = useAuth();

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      const data = await listIncidents();
      setIncidents(data);
    } catch (err) {
      setError(err?.response?.data?.message || "No fue posible listar reportes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const onDownloadPdf = async () => {
    try {
      setDownloadingPdf(true);
      setError("");

      const blob = await downloadPdf({ token, period });
      const url = window.URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
      const a = document.createElement("a");
      a.href = url;

      const suffix = period === "daily" ? "diario" : period === "monthly" ? "mensual" : "semanal";
      a.download = `reporte-${suffix}-${new Date().toISOString().slice(0, 10)}.pdf`;

      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err?.response?.data?.message || "No se pudo descargar el PDF");
    } finally {
      setDownloadingPdf(false);
    }
  };

  return (
    <section>
      <Card
        title="Reportes registrados"
        extra={
          <Space wrap>
            <Select
              value={period}
              onChange={setPeriod}
              style={{ width: 160 }}
              options={[
                { value: "daily", label: "Diario" },
                { value: "weekly", label: "Semanal" },
                { value: "monthly", label: "Mensual" },
              ]}
            />
            <Button onClick={onDownloadPdf} loading={downloadingPdf}>
              Descargar PDF
            </Button>
            <Button onClick={fetchIncidents} loading={loading}>
              Recargar
            </Button>
          </Space>
        }
      >
        {error && <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }} />}
        <Table
          rowKey="_id"
          loading={loading}
          dataSource={incidents}
          pagination={{ pageSize: 6 }}
          columns={[
            { title: "Tipo", dataIndex: "tipo", render: (value) => <Tag color="blue">{value}</Tag> },
            { title: "Descripcion", dataIndex: "descripcion" },
            {
              title: "Fecha",
              dataIndex: "createdAt",
              render: (value) => new Date(value).toLocaleString(),
            },
            {
              title: "Imagen",
              dataIndex: "imageUrl",
              render: (value) =>
                value ? (
                  <a href={value} target="_blank" rel="noreferrer">
                    Ver
                  </a>
                ) : (
                  "-"
                ),
            },
          ]}
        />
      </Card>
    </section>
  );
}
