import { Navigate, Route, Routes } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import HomePage from "./pages/HomePage";
import ReportsPage from "./pages/ReportsPage";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./context/AuthContext";
import "./styles/layout.scss";

function ProtectedLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-shell">
      <AppHeader />
      <main className="app-content">
        <Routes>
          <Route path="inicio" element={<HomePage />} />
          <Route path="reportes" element={<ReportsPage />} />
          <Route path="" element={<Navigate to="inicio" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/menu/inicio" replace /> : <LoginPage />}
      />
      <Route path="/menu/*" element={<ProtectedLayout />} />
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/menu/inicio" : "/login"} replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
