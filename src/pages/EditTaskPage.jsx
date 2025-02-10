import Sidebar from "../components/Sidebar";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskById } from "../features/tasks/taskSlice";

const EditTaskPage = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  console.log("taskId", taskId);

  const [message, setMessage] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [project, setProject] = useState("");
  const [team, setTeam] = useState("");
  const [owners, setOwners] = useState([]);
  const [tags, setTags] = useState([]);
  const [timeToComplete, setTimeToComplete] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  // Fetch task details and populate form
  useEffect(() => {
    if (tasks && Object.keys(tasks).length > 0) {
      setTaskName(tasks.name || "");
      setProject(tasks.project?.name || "");
      setTeam(tasks.team?.name || "");
      setOwners(tasks.owners?.map((data) => data.name) || []);
      setTags(tasks.tags || []);
      setTimeToComplete(tasks.timeToComplete || "");
      setStatus(tasks.status || "To Do");
      setPriority(tasks.priority || "Low");
    }
  }, [tasks]);

  useEffect(() => {
    if (taskId) {
      dispatch(fetchTaskById(taskId));
    }
  }, [dispatch, taskId]);

  const handleUpdateTask = (e) => {
    e.preventDefault();
    dispatch(
      updateTask({
        taskId,
        updatedTask: {
          name: taskName,
          project,
          team,
          owners,
          tags,
          timeToComplete,
          status,
          priority,
        },
      })
    );
    setMessage(true);
    setTimeout(() => setMessage(false), 1000);
  };

  return (
    <main>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10 px-4">
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
                <p className="text-danger">Error fetching task details.</p>
              ) : tasks && Object.keys(tasks).length > 0 ? (
                <form
                  className="my-4 p-4 primaryBgColor rounded shadow-sm"
                  onSubmit={handleUpdateTask}
                >
                  {/* Task Name */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="taskName">
                      Task Name:
                    </label>
                    <input
                      id="taskName"
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                      className="form-control"
                    />
                  </div>

                  {/* Project */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="project">
                      Project:
                    </label>
                    <input
                      id="project"
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                      className="form-control"
                    />
                  </div>

                  {/* Team */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="team">
                      Team:
                    </label>
                    <input
                      id="team"
                      value={team}
                      onChange={(e) => setTeam(e.target.value)}
                      className="form-control"
                    />
                  </div>

                  {/* Owners */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="owners">
                      Owners:
                    </label>
                    <input
                      id="owners"
                      value={owners.join(", ")}
                      onChange={(e) => setOwners(e.target.value.split(", "))}
                      className="form-control"
                    />
                  </div>

                  {/* Tags */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="tags">
                      Tags:
                    </label>
                    <input
                      id="tags"
                      value={tags.join(", ")}
                      onChange={(e) => setTags(e.target.value.split(", "))}
                      className="form-control"
                    />
                  </div>

                  {/* Time to Complete */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="timeToComplete">
                      Time to Complete (Days):
                    </label>
                    <input
                      type="number"
                      id="timeToComplete"
                      value={timeToComplete}
                      onChange={(e) => setTimeToComplete(e.target.value)}
                      className="form-control"
                    />
                  </div>

                  {/* Status */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="status">
                      Status:
                    </label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="form-control"
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Blocked">Blocked</option>
                    </select>
                  </div>

                  {/* Priority */}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="priority">
                      Priority:
                    </label>
                    <select
                      id="priority"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="form-control"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-outline-primary">
                    Update Task
                  </button>

                  {/* Success Message */}
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
                <p className="fs-5 fw-medium">Task Not Found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditTaskPage;
