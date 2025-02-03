import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects, createNewProject } from "./projectSlice";
import { useSearchParams } from "react-router-dom";

const ProjectView = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();
  const { projects, status, error } = useSelector((state) => state.projects);
  const [searchParams, setSearchParams] = useSearchParams();
  const projectStatus = searchParams.get("projectStatus") || "";

  useEffect(() => {
    dispatch(fetchProjects({ projectStatus }));
    console.log("Project Data:", projects);
  }, [dispatch, projectStatus]);

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
  };

  const statusFilterHandler = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("projectStatus", value);
    } else {
      newParams.delete("projectStatus");
    }
    setSearchParams(newParams);
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
          <span className="fs-2 fw-medium">Projects</span>
          <select
            value={projectStatus}
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
            <i className="bi bi-plus me-2"></i>New Project
          </button>
        </div>
      </div>

      {showForm && (
        <div className="overlay">
          <div className="form-container">
            <h3>Create New Project</h3>

            <form onSubmit={handleCreateProject}>
              <div className="my-3">
                <div>
                  <label className="form-label fw-medium">Name</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)} 
                    placeholder="Enter Project Name"
                  />
                </div>
                <div>
                  <label className="form-label fw-medium">Description</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)} 
                    placeholder="Enter Project Description"
                  />
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
                Create Project
              </button>

              <button
                className="btn text-secondary bg-secondary-subtle fw-medium w-100 mb-2"
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setProjectDescription("");
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
        {status === "loading" ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error in fetching projects</p>
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <div className="col-md-4" key={project._id}>
              <div className="card h-100">
                <div className="card-body">
                  <span className={`badge ${getBadgeClass(project.status)}`}>
                    {project.status}
                  </span>
                  <h5 className="card-title mt-3">{project.name}</h5>
                  <p className="card-text">{project.description}</p>
                  <small className="card-text">
                    {" "}
                    <strong>Created At: </strong>
                    {project.createdAt
                      ? new Date(project.createdAt).toLocaleDateString()
                      : "N/A"}
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="fs-5 fw-medium">No Project Found</p>
        )}
      </div>
    </div>
  );
};

export default ProjectView;
