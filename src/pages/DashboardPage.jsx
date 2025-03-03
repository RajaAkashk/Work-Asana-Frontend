import React, { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProjectView from "../features/projects/ProjectView";
import TaskView from "../features/tasks/TaskView.jsx";
import { fetchProjects } from "../features/projects/projectSlice.js";
import { fetchTasks } from "../features/tasks/taskSlice.js";
import { useSelector, useDispatch } from "react-redux";

function DashboardPage() {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const { projects } = useSelector((state) => state.projects);
  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTasks());
  }, [dispatch]);

  // console.log("projects & tasks", projects, tasks);

  const handleSearch = (e) => {
    const searchedValue = e.target.value.toLowerCase();
    setSearchQuery(e.target.value);

    if (!searchedValue) {
      setSearchResult([]);
      return;
    }

    const filteredProjectsResults = projects.filter((data) =>
      data.name.toLowerCase().includes(searchedValue)
    );

    const filteredTasksResults = tasks.filter((data) =>
      data.name.toLowerCase().includes(searchedValue)
    );

    setSearchResult([...filteredProjectsResults, ...filteredTasksResults]); // Replace previous results

    console.log("Searching for:", e.target.value);
  };
  console.log(searchResult);

  const getBadgeClass = (status) => {
    switch (status) {
      case "To Do":
        return "text-bg-secondary";
      case "In Progress":
        return "text-bg-primary";
      case "Completed":
        return "text-bg-success";
      case "Blocked":
        return "text-bg-danger";
      default:
        return "text-bg-secondary";
    }
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
                    onChange={handleSearch}
                  />
                  <button disabled className="btn btn-outline-secondary">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
                <div className="row">
                  {searchResult && searchResult.length > 0 ? (
                    searchResult.map((data) => (
                      <div className="col-md-4 mt-4" key={data._id}>
                        <div className="card h-100">
                          <div className="card-body">
                            <span
                              className={`badge ${getBadgeClass(data.status)}`}
                            >
                              {data.status}
                            </span>
                            <h5 className="card-title mt-3">{data.name}</h5>
                            <p className="card-text">{data.description}</p>
                            <small className="card-text">
                              {" "}
                              <strong>Created At: </strong>
                              {data.createdAt
                                ? new Date(data.createdAt).toLocaleDateString()
                                : "N/A"}
                            </small>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
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
                    </>
                  )}
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
