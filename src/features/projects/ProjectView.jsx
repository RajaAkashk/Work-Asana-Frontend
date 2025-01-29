import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "./projectSlice";

const ProjectView = () => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [projectList, setProjectList] = useState([]);

  const dispatch = useDispatch();
  const { projects, status, error } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
    setProjectList(projects);
  }, [dispatch]);

  useEffect(() => {
    if (selectedFilter) {
      const filterProjects = projects.filter(
        (project) => project.status === selectedFilter
      );
      setProjectList(filterProjects);
    } else {
      setProjectList(projects);
    }
  }, [selectedFilter, projects]);

  const statusFilterHandler = (event) => {
    event.preventDefault();
    const { value } = event.target;
    console.log("setSelectedFilter", value);
    setSelectedFilter(value);
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
            value={selectedFilter}
            onChange={statusFilterHandler}
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
          <button className="btn btn-primary">
            <i className="bi bi-plus me-2"></i>New Project
          </button>
        </div>
      </div>
      <div className="row g-4 pt-4">
        {status === "loading" ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error in fetching projects</p>
        ) : projectList.length > 0 ? (
          projectList.map((project) => (
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
                    {new Date(project.createdAt).toLocaleDateString()}
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
