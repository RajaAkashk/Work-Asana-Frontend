import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, createNewTask } from "./taskSlice";
import { fetchProjects } from "../projects/projectSlice";
import { fetchTeams } from "../teams/teamSlice";
import { useSearchParams } from "react-router-dom";
import { fetchTags } from "../tags/tagSlice";
import { fetchUser } from "../users/userSlice";

function TaskView() {
  const [taskName, setTaskName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  // const [tag, setTags] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();

  const { tasks, status, error } = useSelector((state) => state.tasks);
  console.log("Tasks ", tasks);
  // const { tags } = useSelector((state) => state.tags);
  const { users } = useSelector((state) => state.users);
  const { projects } = useSelector((state) => state.projects);
  const { teams } = useSelector((state) => state.teams);

  // console.log("Teams from Task View", teams);
  // console.log("projects from Task View", projects);

  const [searchParams, setSearchParams] = useSearchParams(); // URL Params Hook

  const taskStatus = searchParams.get("taskStatus") || "";

  useEffect(() => {
    dispatch(fetchTasks({ taskStatus }));
    dispatch(fetchTeams());
    // dispatch(fetchTags());
    dispatch(fetchUser());
    dispatch(
      fetchTasks({
        taskStatus: "",
        prioritySort: "",
        dateSort: "",
      })
    );
  }, [taskStatus, dispatch]);

  // console.log("fetch Tags from task view: ", tags);
  // console.log("fetch User from task view: ", users);

  const statusFilterHandler = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("taskStatus", value);
    } else {
      newParams.delete("taskStatus");
    }
    setSearchParams(newParams);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    console.log("Create project button clicked!");
    const newTask = {
      name: taskName,
      project: projectName,
      team: teamName,
      tags: ["development"],
      owners: [ownerName],
      timeToComplete: estimatedTime,
      status: "To Do",
      priority: "Low",
    };
    console.log("New task Data:", newTask);
    console.log("Owners before sending:", newTask.owners);
    console.log("Is owners an array?", Array.isArray(newTask.owners));
    console.log("Is owners[0] an array?", Array.isArray(newTask.owners[0]));

    await dispatch(createNewTask(newTask));
    // reset the form
    setShowForm(false);
    setEstimatedTime("");
    setDueDate("");
    setTeamName("");
    setTaskName("");
    setOwnerName("");
    // setTag([]);
    setProjectName("");
  };

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
    <div>
      <div className=" align-items-center d-flex justify-content-between">
        <div>
          <span className="fs-2 fw-medium">Tasks</span>
          <select
            value={taskStatus}
            onChange={(e) => statusFilterHandler(e.target.value)}
            className="ms-3 rounded bg-body-tertiary p-1"
          >
            <option value="">Filter</option>
            <option value="In Progress">In Progress</option>
            <option value="Complete">Complete</option>
            <option value="To Do">To Do</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
        <div>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            <i className="bi bi-plus me-2"></i>New Task
          </button>
        </div>
      </div>

      {showForm && (
        <div className="overlay">
          <div className="form-container">
            <h3>Create New Task</h3>

            <form onSubmit={handleCreateProject}>
              <div className="my-3">
                <div className="mb-3">
                  <label className="form-label fw-medium">Select Project</label>
                  <select
                    className="form-select"
                    onChange={(e) => setProjectName(e.target.value)}
                  >
                    <option value="">select</option>
                    {projects.length === 0
                      ? "Loading..."
                      : projects.map((project) => (
                          <option key={project._id} value={project._id}>
                            {project.name}
                          </option>
                        ))}
                  </select>
                </div>
                <div className="row flex-wrap">
                  <div className="mb-3 col-md-6">
                    <label className="form-label fw-medium">Select Owner</label>
                    <select
                      className="form-select"
                      onChange={(e) => setOwnerName(e.target.value)}
                    >
                      <option value="">select</option>
                      {users.length === 0
                        ? "Loading..."
                        : users.map((user) => (
                            <option key={user._id} value={user._id}>
                              {user.name}
                            </option>
                          ))}
                    </select>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label fw-medium">Task Name</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      // value={taskName}
                      onChange={(e) => setTaskName(e.target.value)} // Bind to the new member input
                      placeholder="Enter Task Name"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label fw-medium">Select Team</label>
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

                  {/* <div className="col-md-6">
                    <label className="form-label fw-medium">
                      Select Due Date
                    </label>
                    <input
                      type="date"
                      className="form-control mb-2"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      placeholder="Select Date"
                    />
                  </div> */}
                  <div className="col-md-6">
                    <label className="form-label fw-medium">
                      Estimated Time
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={estimatedTime}
                      onChange={(e) => setEstimatedTime(Number(e.target.value))}
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
                  setEstimatedTime("");
                  setDueDate("");
                  setTeamName("");
                  setTaskName("");
                  setOwnerName("");
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

      <div className="row g-4 pt-4">
        {error && <p>Error in fetching tasks</p>}
        {status === "loading" ? (
          <p>Loading...</p>
        ) : tasks.length === 0 ? (
          <p className="fs-5 fw-medium">There are no Tasks</p> // Display this message when there are no tasks
        ) : (
          tasks.map((task) => (
            <div className="col-md-4" key={task?._id}>
              <div className="card h-100">
                <div className="card-body">
                  <span
                    className={`badge ${getBadgeClass(
                      task?.status || "To Do"
                    )}`}
                  >
                    {task?.status || "To Do"}
                  </span>
                  <div>
                    <h5 className="card-text mt-3">{task?.name}</h5>
                    <small className="fw-normal">
                      <strong>Due On: </strong>
                      {new Date(
                        new Date(task?.createdAt).setDate(
                          new Date(task?.createdAt).getDate() +
                            task?.timeToComplete
                        )
                      ).toLocaleDateString()}
                    </small>
                  </div>
                  <div className="mt-3">
                    {Array.isArray(task?.owners) && task?.owners.length > 0 ? (
                      task?.owners.map((member) => {
                        // Ensure `member.name` is a string before calling `.split()`
                        const initials =
                          typeof member.name === "string"
                            ? member.name
                                .split(" ")
                                .map((name) => name[0].toUpperCase())
                                .join("")
                            : ""; // Default to an empty string if `member.name` isn't valid

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
                              backgroundColor: "#9556ce",
                              color: "white",
                              textAlign: "center",
                              lineHeight: "40px",
                              marginRight: "-8px",
                              fontWeight: "bold",
                            }}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-custom-class="custom-tooltip"
                            data-bs-title="This top tooltip is themed via CSS variables."
                          >
                            {initials}
                            {task?.owners.length === 1 && (
                              <span
                                style={{
                                  position: "absolute",
                                  bottom: "17px",
                                  left: "65px",
                                  fontSize: "17px",
                                  color: "#000",
                                }}
                              >
                                {task?.owners[0].name}
                              </span>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <p>No owners found</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TaskView;
