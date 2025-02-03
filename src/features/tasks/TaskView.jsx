import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "./taskSlice";
import { useSearchParams } from "react-router-dom";

function TaskView() {
  const dispatch = useDispatch();

  const { tasks, status, error } = useSelector((state) => state.tasks);

  const [searchParams, setSearchParams] = useSearchParams(); // URL Params Hook

  const taskStatus = searchParams.get("taskStatus") || "";

  useEffect(() => {
    dispatch(fetchTasks({ taskStatus }));
  }, [taskStatus, dispatch]);

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
    const newProject = {
      name: projectName,
      description: projectDescription,
    };
    console.log("New Project Data:", newProject);
    await dispatch(createNewProject(newProject));
    // reset the form
    setShowForm(false);
    // setProjectDescription("");
    // setProjectName("");
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
          <button className="btn btn-primary">
            <i className="bi bi-plus me-2"></i>New Task
          </button>
        </div>
      </div>
      <div className="row g-4 pt-4">
        {error && <p>Error in fetching tasks</p>}
        {status === "loading" ? (
          <p>Loading...</p>
        ) : tasks.length === 0 ? (
          <p className="fs-5 fw-medium">No Task found</p> // Display this message when there are no tasks
        ) : (
          tasks.map((task) => (
            <div className="col-md-4" key={task._id}>
              <div className="card h-100">
                <div className="card-body">
                  <span className={`badge ${getBadgeClass(task.status)}`}>
                    {task.status}
                  </span>

                  <div>
                    <h5 className="card-text mt-3">{task.name}</h5>
                    <small className="fw-normal">
                      <strong>Due On: </strong>
                      {new Date(
                        new Date(task.createdAt).setDate(
                          new Date(task.createdAt).getDate() +
                            task.timeToComplete
                        )
                      ).toLocaleDateString()}
                    </small>
                  </div>
                  <div className="mt-3">
                    {Array.isArray(task.owners) && task.owners.length > 0 ? (
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
                            {initials}{" "}
                            {task.owners.length === 1 && (
                              <span
                                style={{
                                  position: "absolute",
                                  bottom: "17px",
                                  left: "65px",
                                  fontSize: "17px",
                                  color: "#000",
                                }}
                              >
                                {task.owners[0].name}
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
