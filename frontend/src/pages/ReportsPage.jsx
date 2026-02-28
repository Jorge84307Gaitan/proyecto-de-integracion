import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Form,
  Input,
  Select,
  Space,
  Table,
  Tag,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createIncident, listIncidents } from "../services/incidents.service";
import { useAuth } from "../context/AuthContext";

export default function ReportsPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [error, setError] = useState("");
  const { token, isAuthenticated } = useAuth();
  const [form] = Form.useForm();

  const normalizeUpload = (event) => {
    if (Array.isArray(event)) {
      return event;
    }
    return event?.fileList || [];
  };

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

  const onFinish = async (values) => {
    if (!isAuthenticated) {
      setError("Debes iniciar sesion para crear reportes");
      return;
    }
    try {
      setSaving(true);
      setError("");
      const imageFile = values.image?.[0]?.originFileObj;
      await createIncident({
        token,
        tipo: values.tipo,
        descripcion: values.descripcion,
        imageFile,
      });
      form.resetFields();
      await fetchIncidents();
    } catch (err) {
      setError(err?.response?.data?.message || "No se pudo guardar el reporte");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="reports-grid">
      <Card title="Reporte de incidente">
        {error && <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }} />}

        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name="tipo"
            label="Tipo de incidente"
            rules={[{ required: true, message: "Selecciona un tipo de incidente" }]}
          >
            <Select
              options={[
                { value: "Accidente", label: "Accidente" },
                { value: "Bache", label: "Bache" },
                { value: "Semaforo", label: "Semaforo" },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="descripcion"
            label="Descripcion"
            rules={[{ required: true, message: "Describe el incidente" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="image"
            label="Imagen (opcional)"
            valuePropName="fileList"
            getValueFromEvent={normalizeUpload}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Seleccionar archivo</Button>
            </Upload>
          </Form.Item>

          <Space>
            <Button type="primary" htmlType="submit" loading={saving}>
              Guardar reporte
            </Button>
            <Button onClick={fetchIncidents} loading={loading}>
              Recargar
            </Button>
          </Space>
        </Form>
      </Card>

      <Card title="Reportes registrados">
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
