import Sidebar from "../components/Sidebar";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskById, updateTask } from "../features/tasks/taskSlice";
import { fetchTeams } from "../features/teams/teamSlice";
import { fetchProjects } from "../features/projects/projectSlice";
import { fetchUser } from "../features/users/userSlice";
import Select from "react-select";
import { isNumber } from "chart.js/helpers";

const EditTaskPage = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();

  const { tasks, loading, error } = useSelector((state) => state.tasks);
  // console.log("tasks EditTaskPage ", tasks);

  const {
    users,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.users);
  // console.log("users from edit task", users);


  const ownerOptions = users.map((user) => ({
    value: user._id,
    label: user.name,
  }));

  const {
    teams,
    loading: teamLoading,
    error: teamError,
  } = useSelector((state) => state.teams);
  // console.log("task Edit page teams:-", teams);

  const teamOptions = teams.map((teamOption) => ({
    value: teamOption._id,
    label: teamOption.name,
  }));

  const {
    projects,
    loading: projectLoading,
    error: projectError,
  } = useSelector((state) => state.projects);

  const projectOptions = projects.map((projectOption) => ({
    value: projectOption._id,
    label: projectOption.name,
  }));

  // console.log("taskId", taskId);

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
      setProject({
        value: tasks.project?._id || "",
        label: tasks.project?.name || "",
      });
      setTeam(
        {
          value: tasks.team?._id || "",
          label: tasks.team?.name || "",
        } || {}
      );
      setOwners(
        tasks.owners?.map((owner) => ({
          value: owner._id,
          label: owner.name,
        })) || []
      );
      setTags(tasks.tags || []);
      setTimeToComplete(tasks.timeToComplete || "");
      setStatus(tasks.status || "To Do");
      setPriority(tasks.priority || "Low");
    }
  }, [tasks]);
  // console.log("defaultOwners:- ", owners);

  useEffect(() => {
    if (taskId) {
      dispatch(fetchTaskById(taskId));
      dispatch(fetchUser());
      dispatch(fetchTeams());
      dispatch(fetchProjects());
    }
  }, [dispatch, taskId]);

  const handleUpdateTask = (e) => {
    e.preventDefault();
    // console.log("Updating Task with:", {
    //   taskId,
    //   updatedTask: {
    //     name: taskName,
    //     project: project.value,
    //     team: team.value,
    //     owners: owners.map((owner) => owner.value),
    //     tags,
    //     timeToComplete,
    //     status,
    //     priority,
    //   },
    // });
    dispatch(
      updateTask({
        taskId,
        updatedTask: {
          name: taskName,
          project: project.value,
          team: team.value,
          owners: owners.map((owner) => owner.value),
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
    <main className="w-100 overflow-hidden">
      <div className="row">
        <div className="col-xl-2 col-md-3">
          <Sidebar />
        </div>
        <div className="col-xl-10 col-md-9 pe-md-5 ps-md-4 px-4 ps-xl-4 pb-3">
          <div className="container mt-4 mb-5">
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

                  <Select
                    id="project"
                    value={project || ""}
                    options={projectOptions || []}
                    onChange={(selected) => setProject(selected)}
                    // onMenuOpen={() => console.log("Menu Opened")}
                  />
                </div>

                {/* Team */}
                <div className="mb-3">
                  <label className="form-label" htmlFor="team">
                    Team:
                  </label>

                  <Select
                    id="team"
                    value={team || ""}
                    options={teamOptions || []}
                    onChange={(selected) => setTeam(selected)}
                    // onMenuOpen={() => console.log("Menu Opened")}
                  />
                </div>

                {/**************************** Owners ****************************/}
                <div className="mb-3" style={{ zIndex: 1000 }}>
                  <label className="form-label" htmlFor="owners">
                    Owners:
                  </label>

                  <Select
                    isMulti
                    id="owners"
                    value={owners || []}
                    options={ownerOptions || []}
                    onChange={(selected) => setOwners(selected)}
                    // onMenuOpen={() => console.log("Menu Opened")}
                  />
                </div>

                {/* Tags */}
                <div className="mb-3">
                  <label className="form-label" htmlFor="tags">
                    Tags (Add tags separated by commas):
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
                    className="form-select"
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
                    className="form-select"
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
    </main>
  );
};

export default EditTaskPage;
