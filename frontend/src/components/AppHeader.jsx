import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useAuth } from "../context/AuthContext";

export default function AppHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="ue-header">
      <div className="ue-brand">
        <Link to="/menu/inicio" className="ue-logo-wrap">
          <img src="/logo_urban.png" alt="Urban Eye" className="ue-logo" />
        </Link>
        <div className="ue-title-block">
          <h1>Urban Eye: Movilidad Inteligente</h1>
          <p>Universidad EAN - Facultad de Ingenieria</p>
        </div>
      </div>

      <nav className="ue-nav">
        <NavLink to="/menu/inicio" end>
          Inicio
        </NavLink>
      </nav>

      <div className="ue-auth">
        <Button type="primary" onClick={handleLogout}>
          Salir
        </Button>
      </div>
    </header>
  );
}
