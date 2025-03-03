import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="w-100 py-4"
      style={{ background: "#8913fb12", minHeight: "100rem" }}
    >
      <h2 className="text-center" style={{ color: "#6818f1" }}>
        Workasana
      </h2>
      <nav className="pt-5 px-5">
        <ul className="list-unstyled">
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
    </div>
  );
}

export default Sidebar;
