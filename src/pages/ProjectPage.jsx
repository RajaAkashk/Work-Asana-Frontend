import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { fetchTasks } from "../features/tasks/taskSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import "../style/style.css";

function ProjectPage() {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);

  const [searchParams, setSearchParams] = useSearchParams(); // URL Params Hook

  const taskStatus = searchParams.get("taskStatus") || "";
  const prioritySort = searchParams.get("prioritySort") || "";
  const dateSort = searchParams.get("dateSort") || "";

  useEffect(() => {
    dispatch(fetchTasks({ taskStatus, prioritySort, dateSort }));
  }, [taskStatus, prioritySort, dateSort, dispatch]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case "To Do":
        return "text-secondary bg-secondary-subtle";
      case "In Progress":
      case "Medium":
        return "text-warning bg-warning-subtle";
      case "Completed":
        return "text-success bg-success-subtle";
      case "Low":
        return "text-secondary bg-secondary-subtle";
      case "Blocked":
        return "text-dark bg-dark-subtle";
      case "High":
        return "text-danger bg-danger-subtle";
      default:
        return "text-info bg-info-subtle";
    }
  };

  return (
    <>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <Sidebar />
            </div>
            <div className="col-md-10">
              <div className="container py-4">
                <h2>ProjectPage</h2>

                <div className="p-4">
                  <div className="mb-2 d-flex flex-wrap justify-content-between">
                    {/* Sort Buttons */}
                    <div>
                      <span className="fw-medium">Sort By: </span>
                      <button
                        onClick={() => updateFilter("prioritySort", "Low-High")}
                        className={`sortButton badge p-2 text-bg-light border ms-2 ${
                          prioritySort === "Low-High" ? "active" : ""
                        }`}
                      >
                        Priority Low-High
                      </button>
                      <button
                        onClick={() => updateFilter("prioritySort", "High-Low")}
                        className={`sortButton badge p-2 text-bg-light border ms-2 ${
                          prioritySort === "High-Low" ? "active" : ""
                        }`}
                      >
                        Priority High-Low
                      </button>
                      <button
                        onClick={() =>
                          updateFilter("dateSort", "Newest-Oldest")
                        }
                        className={`sortButton badge p-2 text-bg-light border ms-2 ${
                          dateSort === "Newest-Oldest" ? "active" : ""
                        }`}
                      >
                        Newest First
                      </button>
                      <button
                        onClick={() =>
                          updateFilter("dateSort", "Oldest-Newest")
                        }
                        className={`sortButton badge p-2 text-bg-light border ms-2 ${
                          dateSort === "Oldest-Newest" ? "active" : ""
                        }`}
                      >
                        Oldest First
                      </button>
                    </div>

                    {/* Filter Dropdown */}
                    <div className="d-flex align-items-center">
                      <select
                        value={taskStatus}
                        onChange={(e) =>
                          updateFilter("taskStatus", e.target.value)
                        }
                        className="form-select"
                      >
                        <option value="">Filter</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="To Do">To Do</option>
                        <option value="Blocked">Blocked</option>
                      </select>
                      <button className="col-md-6 btn btn-primary ms-3 d-flex">
                        <i class="bi bi-plus-lg me-2"></i> <span>New Task</span>
                      </button>
                    </div>
                  </div>

                  {/* Task List */}
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th style={{ background: "#f7eeff", border: "0px" }}>
                          TASKS
                        </th>
                        <th style={{ background: "#f7eeff", border: "0px" }}>
                          OWNER
                        </th>
                        <th style={{ background: "#f7eeff", border: "0px" }}>
                          PRIORITY
                        </th>
                        <th style={{ background: "#f7eeff", border: "0px" }}>
                          DUE ON
                        </th>
                        <th
                          style={{ background: "#f7eeff", border: "0px" }}
                          colSpan={2}
                        >
                          STATUS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {status === "loading" ? (
                        <tr>
                          <td colSpan="5" className="text-center">
                            Loading...
                          </td>
                        </tr>
                      ) : error ? (
                        <tr>
                          <td colSpan="5" className="text-center text-danger">
                            Error fetching tasks
                          </td>
                        </tr>
                      ) : tasks.length > 0 ? (
                        tasks.map((task) => (
                          <tr key={task._id}>
                            <td className="fw-medium pt-3">{task.name}</td>
                            {/* <td> */}
                            {/* {task.owners
                                ?.map((owner) => owner.name)
                                .join(", ")} */}

                            <td className="px-4 pt-2 position-relative">
                              <div className="d-flex gap-2">
                                {Array.isArray(task.owners) &&
                                task.owners.length > 0 ? (
                                  task.owners.map((member) => {
                                    const initials = member.name
                                      .split(" ")
                                      .map((name) => name[0].toUpperCase())
                                      .join("");

                                    return (
                                      <div
                                        key={member._id}
                                        className="profile-pic"
                                        style={{
                                          display: "inline-block",
                                          width: "40px",
                                          height: "40px",
                                          border: "1px solid #f7eeff",
                                          borderRadius: "50%",
                                          // backgroundColor: "#9556ce",
                                          backgroundColor:
                                            "rgba(137, 19, 251, 0.07)",
                                          color: "#9556ce",
                                          textAlign: "center",
                                          lineHeight: "40px",
                                          marginRight: "-3px",
                                          fontWeight: "bold",
                                        }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-custom-class="custom-tooltip"
                                        data-bs-title="This top tooltip is themed via CSS variables."
                                      >
                                        {initials}{" "}
                                        {/* {task.owners.length === 1 && (
                                          <span
                                            style={{
                                              position: "absolute",
                                              // bottom: "17px",
                                              // left: "15px",
                                              fontSize: "17px",
                                              color: "#000",
                                            }}
                                          >
                                            {task.owners[0].name}
                                          </span>
                                        )} */}
                                      </div>
                                    );
                                  })
                                ) : (
                                  <p>No owners found</p>
                                )}
                              </div>
                            </td>
                            <td className="pt-3">
                              <span
                                className={`badge ${getBadgeClass(
                                  task.priority
                                )}`}
                              >
                                {task.priority}
                              </span>
                            </td>
                            <td className="pt-3">
                              {new Date(task.createdAt).toLocaleDateString(
                                "en-gb"
                              )}
                              {/* <span className="fw-medium">
                                {new Date(
                                  new Date(task.createdAt).setDate(
                                    new Date(task.createdAt).getDate() +
                                      task.timeToComplete
                                  )
                                ).toLocaleDateString("en-GB", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span> */}
                            </td>
                            <td className="pt-3">
                              <span
                                className={`badge ${getBadgeClass(
                                  task.status
                                )}`}
                              >
                                {task.status}
                              </span>
                            </td>
                            <td className="px-4 pt-3">
                              <Link>
                                {" "}
                                <i class="bi bi-arrow-right"></i>
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No tasks found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProjectPage;
