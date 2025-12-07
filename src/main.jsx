import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ProjectManagementProvider from "./contexts/project-management-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProjectManagementProvider>
      <App />
    </ProjectManagementProvider>
  </React.StrictMode>
);
