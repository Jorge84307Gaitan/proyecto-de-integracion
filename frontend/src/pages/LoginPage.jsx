import { useState } from "react";
import { Alert, Button, Card, Form, Input, Space, } from "antd";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login: loginContext } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      setError("");
      const response =
        mode === "login" ? await login(values) : await register(values);
      loginContext(response.token, response.user);
      navigate("/reportes");
    } catch (err) {
      setError(err?.response?.data?.message || "No se pudo autenticar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="auth-card">
      <div className="auth-welcome-banner">
        <img src="/logo_urban.png" alt="Urban Eye" className="auth-welcome-logo" />
        <h2>Bienvenido a Urban Eye</h2>
        <p>Movilidad inteligente</p>
      </div>

      {error && <Alert type="error" message={error} showIcon />}

      <Form layout="vertical" onFinish={onFinish}>
        {mode === "register" && (
          <Form.Item
            name="name"
            label="Nombre"
            rules={[{ required: true, message: "Ingresa tu nombre" }]}
          >
            <Input placeholder="Nombre completo" />
          </Form.Item>
        )}

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Ingresa un email valido", type: "email" }]}
        >
          <Input placeholder="correo@ejemplo.com" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, min: 6, message: "Minimo 6 caracteres" }]}
        >
          <Input.Password placeholder="******" />
        </Form.Item>

        <Space>
          <Button htmlType="submit" type="primary" loading={loading}>
            {mode === "login" ? "Ingresar" : "Registrar"}
          </Button>
          <Button
            type="default"
            onClick={() => setMode((current) => (current === "login" ? "register" : "login"))}
          >
            {mode === "login" ? "Crear cuenta" : "Ya tengo cuenta"}
          </Button>
        </Space>
      </Form>
    </Card>
  );
}
