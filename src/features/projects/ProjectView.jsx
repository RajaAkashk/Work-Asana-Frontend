import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "./projectSlice";

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, status, error } = useSelector((state) => state.projects);
//   console.log("projetcs", projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const getBadgeClass = (status) => {
    switch (status) {
      case "To Do":
        return "text-bg-secondary"; // Gray
      case "In Progress":
        return "text-bg-primary"; // Blue
      case "Completed":
        return "text-bg-success"; // Green
      case "Blocked":
        return "text-bg-danger"; // Red
      default:
        return "text-bg-secondary"; // Default to Gray
    }
  };

  return (
    <div>
      <div className=" align-items-center d-flex justify-content-between">
        <div>
          <span className="fs-2 fw-medium">Projects</span>
          <select className="ms-3 rounded bg-body-tertiary p-1">
            <option value="">Filter</option>
            <option value="">In Progress</option>
            <option value="">Complete</option>
            <option value="">To-do</option>
            <option value="">Blocked</option>
          </select>
        </div>
        <div>
          <button className="btn btn-primary">
            <i className="bi bi-plus me-2"></i>New Project
          </button>
        </div>
      </div>
      <div className="row g-4 pt-4">
        {status === "loading" && <p>Loading...</p>}
        {status === "error" && <p>Error in fetching projects</p>}
        {projects.map((project) => (
          <div className="col-md-4" key={project._id}>
            <div className="card h-100">
              <div className="card-body">
                <span class={`badge ${getBadgeClass(project.status)}`}>
                  {project.status}
                </span>
                <h5 className="card-title mt-3">{project.name}</h5>
                <p className="card-text">{project.description}</p>
                <small className="card-text"> <strong>Created At: </strong>
                {new Date(project.createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
