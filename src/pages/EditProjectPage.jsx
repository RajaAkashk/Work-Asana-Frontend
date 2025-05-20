import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjectById,
  updateProject,
} from "../features/projects/projectSlice";

const EditProjectPage = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const { projects, loading, error } = useSelector((state) => state.projects);

  const [message, setMessage] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("");

  useEffect(() => {
    if (projects && Object.keys(projects).length > 0) {
      setProjectName(projects.name || "");
      setProjectDescription(projects.description || "");
      setProjectStatus(projects.status || "Not Started");
      console.log(
        "State updated:",
        projects.name,
        projects.description,
        projects.status
      );
    }
  }, [projects]);

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectById(projectId));
    }
  }, [dispatch, projectId]);

  const handleUpdateProject = (e) => {
    e.preventDefault();
    dispatch(
      updateProject({
        projectId,
        updatedProject: {
          name: projectName,
          description: projectDescription,
          status: projectStatus,
        },
      })
    );
    setMessage(true);
    setTimeout(() => {
      setMessage(false);
    }, 1000);
  };

  return (
    <main className="w-100 overflow-hidden">
      <div className="row">
        <div className="col-xl-2 col-md-3">
          <Sidebar />
        </div>
        <div className="col-xl-10 col-md-9 pe-md-5 ps-md-4 px-4 ps-xl-4 pb-3">
          <div className="container mt-4">
            <Link
              className="primaryColor text-decoration-none underline fs-5 fw-medium"
              to="/setting"
            >
              <i className="bi bi-arrow-left"></i> Back to Setting
            </Link>
            {loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : error ? (
              <p className="text-danger">Error fetching projects details.</p>
            ) : projects && Object.keys(projects).length > 0 ? ( // Ensure projects is not an empty object
              <form
                className="mt-4 p-4 primaryBgColor rounded shadow-sm"
                onSubmit={handleUpdateProject}
              >
                <div className="mb-3">
                  <label className="form-label" htmlFor="projectName">
                    Project Name:
                  </label>
                  <input
                    id="projectName"
                    value={projectName || ""}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="projectDescription">
                    Description:
                  </label>
                  <textarea
                    id="projectDescription"
                    value={projectDescription || ""}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="projectStatus">
                    Status:
                  </label>
                  <select
                    id="projectStatus"
                    value={projectStatus || "Not Started"}
                    onChange={(e) => setProjectStatus(e.target.value)}
                    className="form-control"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-outline-primary">
                  Update Project
                </button>
                {message && (
                  <div
                    className="mt-4 alert alert-light text-center"
                    role="alert"
                  >
                    <p className="m-0 p-0 fw-medium">Updated successfully</p>
                  </div>
                )}
              </form>
            ) : (
              <p className="fs-5 fw-medium">Project Not Found</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditProjectPage;
