import React from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProjectView from "../features/projects/ProjectView";
import TaskView from "../features/tasks/TaskView.jsx";

function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };
  return (
    <>
      <main>
        <div className="container-fluid">
          <div className="row justify-content-between flex-wrap">
            <div className="col-md-2 ">
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
                    <ProjectView />
                  </div>
                </div>

                <div className="py-5">
                  <div className="mt-4">
                    {/* Tasks  */}
                    <TaskView />
                  </div>
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
