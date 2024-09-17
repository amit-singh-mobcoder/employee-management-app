import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Employees from "./pages/Employees.jsx";
import AddEmployee from "./pages/AddEmployee.jsx";
import { EmployeeProvider } from "./context/EmployeeContext.jsx";
import { PrevSelectedSkillProvider } from "./context/PrevSelectedSkill.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EmployeeProvider>
      <PrevSelectedSkillProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/addemployee" element={<AddEmployee />} />
          </Routes>
        </BrowserRouter>
      </PrevSelectedSkillProvider>
    </EmployeeProvider>
  </React.StrictMode>
);
