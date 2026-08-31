import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./component/App";
import { AuthProvider } from "./provider/AuthProvider";
import { ShopProvider } from "./provider/ShopProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 1. ƏN XARİCDƏ AuthProvider OLMALIDIR */}
      <AuthProvider>
        {/* 2. DAXİLİNDƏ ShopProvider */}
        <ShopProvider>
          <App />
        </ShopProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);