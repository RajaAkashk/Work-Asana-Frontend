import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, createNewTask } from "./taskSlice";
import { fetchProjects } from "../projects/projectSlice";
import { fetchTeams } from "../teams/teamSlice";
import { useSearchParams } from "react-router-dom";
import { fetchTags } from "../tags/tagSlice";
import { fetchUser } from "../users/userSlice";
import Select from "react-select";

function TaskView() {
  const [taskName, setTaskName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [ownerNames, setOwnerNames] = useState([]);
  const [ownersId, setOwnersId] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [showForm, setShowForm] = useState(false);
  // const [dueDate, setDueDate] = useState("");
  // const [tag, setTags] = useState([]);

  const dispatch = useDispatch();

  const { tasks, status, error } = useSelector((state) => state.tasks);

  console.log("Tasks ", tasks);

  const { users } = useSelector((state) => state.users);
  const { projects } = useSelector((state) => state.projects);
  const { teams } = useSelector((state) => state.teams);

  const [searchParams, setSearchParams] = useSearchParams(); // URL Params Hook

  const taskStatus = searchParams.get("taskStatus") || "";

  useEffect(() => {
    dispatch(fetchTasks({ taskStatus }));
    dispatch(fetchTeams());
    dispatch(fetchUser());
  }, [taskStatus, dispatch]);

  // console.log("fetch Tags from task view: ", tags);
  console.log("fetch User from task view: ", users);

  const statusFilterHandler = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("taskStatus", value);
    } else {
      newParams.delete("taskStatus");
    }
    setSearchParams(newParams);
  };

  // for multiple select
  const handleMultiSelectChange = (selectedOwner) => {
    setOwnerNames(selectedOwner);
    setOwnersId(selectedOwner.map((data) => data.value));
    console.log("selectedOwner", selectedOwner);
    console.log(
      "setOwnersId",
      selectedOwner.map((data) => data.value)
    );
  };
  const userOptions = users.map((user) => ({
    value: user._id,
    label: user.name,
  }));
  console.log("userOptions", userOptions);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    console.log("Create project button clicked!");
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
    console.log("New task Data:", newTask);
    console.log("Owners before sending:", newTask.owners);
    console.log("Is owners an array?", Array.isArray(newTask.owners));

    await dispatch(createNewTask(newTask));
    // reset the form
    setEstimatedTime("");
    setTeamName("");
    setTaskName("");
    setOwnerNames([]);
    setOwnerId([]);
    setProjectName("");
    setShowForm(false);
    // setTag([]);
    // setDueDate("");
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
            <option value="Completed">Completed</option>
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

            <form onSubmit={handleCreateTask}>
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

                    <Select
                      isMulti
                      key={ownerNames.length}
                      value={ownerNames}
                      onChange={handleMultiSelectChange}
                      options={userOptions}
                      onMenuOpen={() => console.log("Menu Opened")}
                    />
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

      <div className="row g-4 pt-4">
        {error ? (
          <p>Error in fetching tasks</p>
        ) : status === "loading" ? (
          <p>Loading...</p>
        ) : tasks.length === 0 ? (
          <p className="fs-5 fw-medium">There are no Tasks</p>
        ) : (
          Array.isArray(tasks) &&
          tasks?.map((task) => (
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
                        const initials =
                          typeof member.name === "string"
                            ? member.name
                                .split(" ")
                                .map((name) => name[0].toUpperCase())
                                .join("")
                            : "";

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
