import React from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProjectView from "../features/projects/ProjectView";
import TaskView from "../features/tasks/TaskView.jsx";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleLogOut = () => {
    localStorage.removeItem("Login token");
    navigate("/");
  };

  return (
    <>
      <main>
        <div className="container-fluid">
          <div className="row justify-content-between flex-wrap">
            <div className="col-md-2">
              <Sidebar />
            </div>
            <div className="col-md-10 py-4">
              <div className="container">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleSearch}
                  >
                    <i className="bi bi-search"></i>
                  </button>
                </div>

                <div className="pt-4">
                  <div className="mt-4">
                    {/* Projects  */}
                    <ProjectView />
                  </div>
                </div>

                <div className="py-5">
                  <div className="mt-4">
                    {/* Tasks  */}
                    <TaskView />
                  </div>
                </div>
                <div className="float-end mt-4">
                  <button className="btn btn-primary" onClick={handleLogOut}>
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default DashboardPage;
