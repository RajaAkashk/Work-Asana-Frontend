import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-3" style={{ backgroundColor: "#f5f5ff" }}>
      <div>
        <h2
          className="fw-bold text-center"
          style={{ color: "#6818f1", cursor: "pointer" }}
          onClick={() => setIsOpen(!isOpen)}
        >
          Workasana
        </h2>
      </div>

      {isOpen && (
        <nav className="px-2">
          <ul className="list-unstyled mt-4">
            <li>
              <NavLink
                to="/dashboard"
                className="text-decoration-none fs-5"
                style={({ isActive }) => ({
                  color: isActive ? "#6818F1" : "#a6a4a4",
                })}
              >
                <i className="bi bi-bounding-box"></i> Dashboard
              </NavLink>
            </li>
            <li className="mt-3">
              <NavLink
                to="/project"
                className="text-decoration-none fs-5"
                style={({ isActive }) => ({
                  color: isActive ? "#6818F1" : "#a6a4a4",
                })}
              >
                <i className="me-2 bi bi-file-earmark"></i> Project
              </NavLink>
            </li>
            <li className="mt-3">
              <NavLink
                to="/team"
                className="text-decoration-none fs-5"
                style={({ isActive }) => ({
                  color: isActive ? "#6818F1" : "#a6a4a4",
                })}
              >
                <i className="me-2 bi bi-person-lines-fill"></i> Team
              </NavLink>
            </li>
            <li className="mt-3">
              <NavLink
                to="/report"
                className="text-decoration-none fs-5"
                style={({ isActive }) => ({
                  color: isActive ? "#6818F1" : "#a6a4a4",
                })}
              >
                <i className="me-2 bi bi-bar-chart-fill"></i> Report
              </NavLink>
            </li>
            <li className="mt-3">
              <NavLink
                to="/setting"
                className="text-decoration-none fs-5"
                style={({ isActive }) => ({
                  color: isActive ? "#6818F1" : "#a6a4a4",
                })}
              >
                <i className="me-2 bi bi-gear"></i> Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
