import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "antd/dist/reset.css";
import "./styles/global.scss";

const theme = {
  token: {
    colorPrimary: "#004a99",
    colorInfo: "#00a1df",
    borderRadius: 12,
    colorBgLayout: "#0e1117",
    colorTextBase: "#000000",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ConfigProvider>
  </React.StrictMode>
);
