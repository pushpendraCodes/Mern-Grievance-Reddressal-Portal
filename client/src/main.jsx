/**
=========================================================
* Material Tailwind Dashboard React - v2.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/material-tailwind-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-tailwind-dashboard-react/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "./context/index";
import "../public/css/tailwind.css";

import User_context from "./Context1/User_context";

// src\context\index.jsx

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <User_context>
    <BrowserRouter>
      <ThemeProvider>

        <MaterialTailwindControllerProvider>


        <App/>

        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
    </User_context>
  </React.StrictMode>
);
