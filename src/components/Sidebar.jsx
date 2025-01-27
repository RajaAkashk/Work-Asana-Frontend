import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-100 py-4 vh-100" style={{ background: "#8913fb12" }}>
      <h2 className="text-center" style={{ color: "#6818f1" }}>
        Workasana
      </h2>
      <nav className="pt-5 px-5">
        <ul className="list-unstyled">
          <li className="">
            <Link className="text-decoration-none text-secondary fs-5" to="/">
              <i className="bi bi-bounding-box"></i> Dashboard
            </Link>
          </li>
          <li className="mt-3">
            <Link
              className="text-decoration-none text-secondary fs-5"
              to="/project"
            >
              <i className="me-2 bi bi-file-earmark"></i> Project
            </Link>
          </li>
          <li className="mt-3">
            <Link
              className="text-decoration-none text-secondary fs-5"
              to="/team"
            >
              <i className="me-2 bi bi-person-lines-fill"></i> Team
            </Link>
          </li>
          <li className="mt-3">
            <Link
              className="text-decoration-none text-secondary fs-5"
              to="/report"
            >
              <i className="me-2 bi bi-bar-chart-fill"></i> Report
            </Link>
          </li>
          <li className="mt-3">
            <Link
              className="text-decoration-none text-secondary fs-5"
              to="/settings"
            >
              <i className="me-2 bi bi-gear"></i> Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
