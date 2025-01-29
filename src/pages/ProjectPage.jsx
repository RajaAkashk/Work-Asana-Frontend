import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { fetchTasks } from "../features/tasks/taskSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../style/style.css";

function ProjectPage() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [taskList, setTaskList] = useState([]);

  const dispatch = useDispatch();

  const { tasks, status, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (selectedFilter) {
      const filterTasks = tasks.filter(
        (task) => task.status === selectedFilter
      );
      setTaskList(filterTasks);
    } else {
      setTaskList(tasks);
    }
  }, [selectedFilter, tasks]);

  const statusFilterHandler = (event) => {
    event.preventDefault();
    const { value } = event.target;
    console.log("setSelectedFilter", value);
    setSelectedFilter(value);
  };

  const sortByHandler = (option) => {
    console.log("Sort value:", option);

    // Create a shallow copy of tasks to avoid mutating the original array
    let sortedTasks = [...tasks];

    // Define the priority mapping
    const priorityMap = {
      Low: 1,
      Medium: 2,
      High: 3,
    };

    switch (option) {
      case "Priority High-Low":
        // Sort descending: high -> medium -> low
        sortedTasks = sortedTasks.sort(
          (a, b) => priorityMap[b.priority] - priorityMap[a.priority]
        );

        break;
      case "Priority Low-High":
        // Sort ascending: low -> medium -> high
        sortedTasks = sortedTasks.sort(
          (a, b) => priorityMap[a.priority] - priorityMap[b.priority]
        );

        break;
      case "Newest First":
        sortedTasks = sortedTasks.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ); // Sort descending based on createdAt date

        break;
      case "Oldest First":
        sortedTasks = sortedTasks.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        ); // Sort ascending based on createdAt date

        break;
      default:
        sortedTasks = tasks; // If no sort option matches, return tasks as is
    }

    console.log("Sorted Tasks:", sortedTasks);

    // Optionally, update state if using React
    setTaskList(sortedTasks);
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
                    <div>
                      <span className="fw-medium">Sort By: </span>
                      <button
                        onClick={() => sortByHandler("Priority Low-High")}
                        className="sortButton badge p-2 text-bg-light border ms-2"
                      >
                        Priority Low-High
                      </button>
                      <button
                        onClick={() => sortByHandler("Priority High-Low")}
                        className="sortButton badge p-2 text-bg-light border ms-2"
                      >
                        Priority High-Low
                      </button>
                      <button
                        onClick={() => sortByHandler("Newest First")}
                        className="sortButton badge p-2 text-bg-light border ms-2"
                      >
                        Newest First
                      </button>
                      <button
                        onClick={() => sortByHandler("Oldest First")}
                        className="sortButton badge p-2 text-bg-light border ms-2"
                      >
                        Oldest First
                      </button>
                    </div>

                    <div className="d-flex align-items-center">
                      <select
                        value={selectedFilter}
                        onChange={statusFilterHandler}
                        className="form-select"
                      >
                        <option value="">Filter</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Complete">Complete</option>
                        <option value="To Do">To Do</option>
                        <option value="Blocked">Blocked</option>
                      </select>
                      <button className="col-md-6 btn btn-primary ms-3 d-flex">
                        <i class="bi bi-plus-lg me-2"></i> <span>New Task</span>
                      </button>
                    </div>
                  </div>
                  <table className="table table-bordered">
                    <thead
                      style={{
                        background: "pink",
                      }}
                    >
                      <tr>
                        <th className="px-4 py-2">TASKS</th>
                        <th className="px-4 py-2">OWNER</th>
                        <th className="px-4 py-2">PRIORITY</th>
                        <th className="px-4 py-2">DUE ON</th>
                        <th className="px-4 py-2" colSpan={2}>
                          STATUS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {status === "loading" ? (
                        <tr>
                          <td colSpan="5" className="text-center py-3">
                            Loading...
                          </td>
                        </tr>
                      ) : error ? (
                        <tr>
                          <td
                            colSpan="5"
                            className="text-center text-danger py-3"
                          >
                            Error in getting data
                          </td>
                        </tr>
                      ) : taskList.length > 0 ? (
                        taskList.map((task, index) => (
                          <tr key={index} className="border-b">
                            <td className="px-4 pt-3 fw-medium">{task.name}</td>
                            <td className="px-4 pt-3 position-relative">
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
                            <td className="px-4 pt-3">
                              <span
                                className={`badge ${getBadgeClass(
                                  task.priority
                                )}`}
                              >
                                {task.priority}
                              </span>
                            </td>
                            <td className="px-4 pt-3">
                              <span className="fw-medium">
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
                              </span>
                            </td>
                            <td className="px-4 pt-3">
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
                          <td colSpan="5" className="text-center py-3">
                            No Task Found
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
