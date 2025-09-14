import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/authContext/Index.jsx";
import { ThemeProvider } from "./contexts/themeContext/ThemeProvider.jsx";
import { ModalProvider } from "./contexts/modalContext/ModalProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
