import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
