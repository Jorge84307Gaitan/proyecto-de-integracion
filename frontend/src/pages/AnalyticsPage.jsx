import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Form,
  Input,
  Select,
  Space,
  Statistic,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createIncident } from "../services/incidents.service";
import { useAuth } from "../context/AuthContext";

export default function AnalyticsPage() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const { token, isAuthenticated } = useAuth();
  const [form] = Form.useForm();

  const normalizeUpload = (event) => {
    if (Array.isArray(event)) {
      return event;
    }
    return event?.fileList || [];
  };

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
    } catch (err) {
      setError(err?.response?.data?.message || "No se pudo guardar el reporte");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="reports-grid">
      <Card title="Reporte de incidente (Analitica)">
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

          <Space wrap>
            <Button type="primary" htmlType="submit" loading={saving}>
              Guardar reporte
            </Button>
          </Space>
        </Form>
      </Card>

      <Card title="Estado de movilidad (placeholder)">
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Statistic title="Incidentes (24h)" value="-" />
          <Statistic title="Estado" value="-" />
          <div style={{ opacity: 0.8 }}>
            Aqui iran KPIs, mapa y resultados de IA (huecos/baches, confianza, severidad).
          </div>
        </Space>
      </Card>
    </section>
  );
}
