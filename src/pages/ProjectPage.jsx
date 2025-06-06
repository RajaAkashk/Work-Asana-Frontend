import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { fetchTasks, createNewTask } from "../features/tasks/taskSlice";
import { fetchTeams } from "../features/teams/teamSlice";
import { fetchProjects } from "../features/projects/projectSlice";
import { fetchUser } from "../features/users/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Select from "react-select";
import "../style/style.css";

function ProjectPage() {
  const [taskName, setTaskName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [ownerNames, setOwnerNames] = useState([]);
  const [ownersId, setOwnersId] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);
  const { users } = useSelector((state) => state.users);
  const { projects } = useSelector((state) => state.projects);
  const { teams } = useSelector((state) => state.teams);

  const [searchParams, setSearchParams] = useSearchParams(); // URL Params Hook

  const taskStatus = searchParams.get("taskStatus") || "";
  const prioritySort = searchParams.get("prioritySort") || "";
  const dateSort = searchParams.get("dateSort") || "";

  useEffect(() => {
    dispatch(fetchTasks({ taskStatus, prioritySort, dateSort }));
    dispatch(fetchTeams());
    dispatch(fetchProjects());
    dispatch(fetchUser());
  }, [taskStatus, prioritySort, dateSort, dispatch]);

  // for multiple select
  const handleMultiSelectChange = (selectedOwner) => {
    setOwnerNames(selectedOwner);
    setOwnersId(selectedOwner.map((data) => data.value));
    // console.log("selectedOwner", selectedOwner);
    // console.log(
    //   "setOwnersId",
    //   selectedOwner.map((data) => data.value)
    // );
  };
  const userOptions = users.map((user) => ({
    value: user._id,
    label: user.name,
  }));
  // console.log("userOptions", userOptions);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    // console.log("Create project button clicked!");
    const newTask = {
      name: taskName,
      project: projectName,
      team: teamName,
      tags: ["task"],
      owners: ownersId,
      timeToComplete: estimatedTime,
      status: "To Do",
      priority: "Low",
    };
    // console.log("New task Data:", newTask);
    // console.log("Owners before sending:", newTask.owners);
    // console.log("Is owners an array?", Array.isArray(newTask.owners));

    await dispatch(createNewTask(newTask));
    // reset the form
    setEstimatedTime("");
    setTeamName("");
    setTaskName("");
    setOwnerNames([]);
    setProjectName("");
    setShowForm(false);
    // setTag([]);
    // setDueDate("");
  };

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
      <main className="w-100 overflow-hidden">
        {/* <div className="container-fluid"> */}
        <div className="row">
          <div className="col-xl-2 col-md-3">
            <Sidebar />
          </div>
          <div className="col-xl-10 col-md-9">
            <div className="container py-4">
              {/* <h2>ProjectPage</h2> */}

              <div className="p-4">
                <div className="mb-5 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                  {/* Left: Sort Buttons */}
                  <div className="d-flex flex-wrap align-items-center gap-2">
                    <span className="fw-medium me-2">Sort By:</span>
                    <button
                      onClick={() => updateFilter("prioritySort", "Low-High")}
                      className={`sortButton badge p-2 text-bg-light border ${
                        prioritySort === "Low-High" ? "active" : ""
                      }`}
                    >
                      Priority Low-High
                    </button>
                    <button
                      onClick={() => updateFilter("prioritySort", "High-Low")}
                      className={`sortButton badge p-2 text-bg-light border ${
                        prioritySort === "High-Low" ? "active" : ""
                      }`}
                    >
                      Priority High-Low
                    </button>
                    <button
                      onClick={() => updateFilter("dateSort", "Newest-Oldest")}
                      className={`sortButton badge p-2 text-bg-light border ${
                        dateSort === "Newest-Oldest" ? "active" : ""
                      }`}
                    >
                      Newest First
                    </button>
                    <button
                      onClick={() => updateFilter("dateSort", "Oldest-Newest")}
                      className={`sortButton badge p-2 text-bg-light border ${
                        dateSort === "Oldest-Newest" ? "active" : ""
                      }`}
                    >
                      Oldest First
                    </button>
                  </div>

                  {/* Right: Filter Dropdown + New Task Button */}
                  <div className="d-flex flex-wrap align-items-center gap-2 ms-md-auto">
                    <select
                      value={taskStatus}
                      onChange={(e) =>
                        updateFilter("taskStatus", e.target.value)
                      }
                      className="form-select w-auto"
                    >
                      <option value="">Filter</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="To Do">To Do</option>
                      <option value="Blocked">Blocked</option>
                    </select>
                    <button
                      onClick={() => setShowForm(true)}
                      className="btn btn-primary d-flex align-items-center"
                    >
                      <i className="bi bi-plus-lg me-2"></i>
                      <span>New Task</span>
                    </button>
                  </div>
                </div>

                {showForm && (
                  <div className="overlay">
                    <div className="form-container">
                      <h3>Create New Task</h3>

                      <form onSubmit={handleCreateTask}>
                        <div className="my-3">
                          <div className="mb-3">
                            <label className="form-label fw-medium">
                              Select Project
                            </label>
                            <select
                              className="form-select"
                              onChange={(e) => setProjectName(e.target.value)}
                            >
                              <option value="">select</option>
                              {projects.length === 0
                                ? "Loading..."
                                : projects.map((project) => (
                                    <option
                                      key={project._id}
                                      value={project._id}
                                    >
                                      {project.name}
                                    </option>
                                  ))}
                            </select>
                          </div>
                          <div className="row flex-wrap">
                            <div className="mb-3 col-md-6">
                              <label className="form-label fw-medium">
                                Select Owner
                              </label>

                              <Select
                                isMulti
                                value={ownerNames}
                                onChange={handleMultiSelectChange}
                                options={userOptions}
                                // onMenuOpen={() => console.log("Menu Opened")}
                              />
                            </div>
                            <div className="mb-3 col-md-6">
                              <label className="form-label fw-medium">
                                Task Name
                              </label>
                              <input
                                type="text"
                                className="form-control mb-2"
                                // value={taskName}
                                onChange={(e) => setTaskName(e.target.value)} // Bind to the new member input
                                placeholder="Enter Task Name"
                              />
                            </div>
                            <div className="mb-3 col-md-6">
                              <label className="form-label fw-medium">
                                Select Team
                              </label>
                              <select
                                className="form-select"
                                onChange={(e) => setTeamName(e.target.value)}
                              >
                                <option value="">select</option>
                                {teams.length === 0
                                  ? "Loading..."
                                  : teams.map((team) => (
                                      <option key={team._id} value={team._id}>
                                        {team.name}
                                      </option>
                                    ))}
                              </select>
                            </div>
                            {/* <div className="mb-3 col-md-6">
                    <label className="form-label fw-medium">Select Tags</label>
                    <select
                      className="form-select"
                      multiple
                      onChange={(e) =>
                        setTag(
                          [...e.target.value].map((option) => option.value)
                        )
                      }
                    >
                      <option>Select</option>
                      {tags.length === 0
                        ? "Loading..."
                        : tags.map((tag) => (
                            <option key={tag._id} value={tag.name}>
                              {tag.name}
                            </option>
                          ))}
                    </select>
                  </div> */}

                            <div className="col-md-6">
                              <label className="form-label fw-medium">
                                Estimated Time
                              </label>
                              <input
                                type="text"
                                className="form-control mb-2"
                                value={estimatedTime}
                                onChange={(e) =>
                                  setEstimatedTime(Number(e.target.value))
                                }
                                placeholder="Enter Time in Days"
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="btn  fw-medium  w-100 mb-2"
                          style={{
                            background: "rgba(137, 19, 251, 0.07)",
                            color: "#6818F1",
                          }}
                        >
                          Create Task
                        </button>

                        <button
                          className="btn text-secondary bg-secondary-subtle fw-medium w-100 mb-2"
                          type="button"
                          onClick={() => {
                            setShowForm(false);
                            setOwnerNames([]);
                            setOwnersId([]);
                            setEstimatedTime("");
                            setDueDate("");
                            setTeamName("");
                            setTaskName("");
                            setTag("");
                            setProjectName("");
                          }}
                        >
                          Cancel
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* Task List */}
                <div className="table-responsive">
                  <table className="table table-bordered overflow-x-scroll">
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
                              <Link to={`/edit/task/${task._id}`}>
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
        {/* </div> */}
      </main>
    </>
  );
}

export default ProjectPage;
