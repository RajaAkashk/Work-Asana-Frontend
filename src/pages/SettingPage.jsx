import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  fetchProjects,
  deleteProject,
} from "../features/projects/projectSlice";
import { fetchTeams, deleteTeam } from "../features/teams/teamSlice";
import { fetchTasks, deleteTask } from "../features/tasks/taskSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SettingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Extracting teams and projects from Redux store
  const {
    teams,
    status: teamStatus,
    error: teamError,
  } = useSelector((state) => state.teams);
  const {
    projects,
    status: projectStatus,
    error: projectError,
  } = useSelector((state) => state.projects);
  const {
    tasks,
    status: taskStatus,
    error: taskError,
  } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(
      fetchTasks({
        taskStatus: "",
        prioritySort: "",
        dateSort: "",
      })
    );
    // console.log("dispatch(fetchTasks()) :-", tasks);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTeams());
    // console.log("dispatch(fetchTeams()) :-", teams);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProjects());
    // console.log("dispatch(fetchProjects()) :-", projects);
  }, [dispatch]);

  const deleteTaskHandler = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const deleteProjectHandler = (projectId) => {
    // console.log("projectId:", projectId);
    dispatch(deleteProject(projectId));
  };
  const deleteTeamHandler = (teamId) => {
    // console.log("teamId:", teamId);
    dispatch(deleteTeam(teamId));
  };

  const handleLogOut = () => {
    localStorage.removeItem("Login token");
    navigate("/");
  };
  return (
    <main className="w-100 overflow-hidden">
      {/* <div className="container-fluid"> */}
      <div className="row">
        <div className="col-xl-2 col-md-3">
          <Sidebar />
        </div>
        <div className="col-xl-10 col-md-9">
          <div className="container py-4">
            {/* Teams Section */}
            <div className="d-flex justify-content-between mb-5">
              <h2 className="primaryColor">Settings</h2>

              <button
                // className="fw-medium fs-5 border border-1 btn primaryBgColor"
                className="btn btn-primary fw-medium"
                onClick={handleLogOut}
              >
                {/* <i class="fs-5 bi bi-person-circle mx-2"></i> */}
                Sign Out
              </button>
            </div>
            <div>
              <h3>Teams</h3>
              <div>
                {teamStatus === "loading" ? (
                  <p>Loading Teams...</p>
                ) : teamError ? (
                  <p>Error occurred while fetching teams data</p>
                ) : teams?.length === 0 ? (
                  <p>There are no teams</p>
                ) : (
                  <div className="row d-flex flex-wrap">
                    {Array.isArray(teams) &&
                      teams?.map((team) => (
                        <div
                          key={team._id}
                          className="col-12 col-md-6 col-xl-3"
                        >
                          <div className="mt-2 p-3 rounded border d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center">
                            <span className="fw-medium fs-5 mb-2 mb-sm-0">
                              {team.name}
                            </span>
                            <div className="d-flex gap-2">
                              <Link
                                to={`/edit/team/${team._id}`}
                                className="btn editAndDeleteBtn"
                              >
                                <i className="bi bi-pencil-square"></i>
                              </Link>
                              <button
                                onClick={() => deleteTeamHandler(team._id)}
                                className="btn editAndDeleteBtn"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {/* Projects Section */}
            <div className="mt-5">
              <h3>Projects</h3>
              <div>
                {projectStatus === "loading" ? (
                  <p>Loading Projects...</p>
                ) : projectError ? (
                  <p>Error occurred while fetching projects data</p>
                ) : projects?.length === 0 ? (
                  <p>There are no projects.</p>
                ) : (
                  <div className="row d-flex flex-wrap">
                    {projects.length > 0 &&
                      projects?.map((project) => (
                        <div
                          key={project._id}
                          className="col-12 col-md-6 col-xl-3"
                        >
                          <div className="mt-2 p-3 rounded border d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center">
                            <span className="fw-medium fs-5 mb-2 mb-sm-0">
                              {project.name}
                            </span>
                            <div className="d-flex gap-2">
                              <Link
                                to={`/edit/project/${project._id}`}
                                className="btn editAndDeleteBtn"
                              >
                                <i className="bi bi-pencil-square"></i>
                              </Link>
                              <button
                                onClick={() =>
                                  deleteProjectHandler(project._id)
                                }
                                className="btn editAndDeleteBtn"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tasks Section */}
            <div className="mt-5">
              <h3>Tasks</h3>
              <div>
                {taskStatus === "loading" ? (
                  <p>Loading Tasks...</p>
                ) : taskError ? (
                  <p>Error occurred while fetching tasks data</p>
                ) : tasks?.length === 0 ? (
                  <p>There are no tasks</p>
                ) : (
                  <div className="row d-flex flex-wrap">
                    {Array.isArray(tasks) &&
                      tasks?.map((task) => (
                        <div
                          key={task._id}
                          className="col-12 col-md-6 col-xl-3"
                        >
                          <div className="mt-2 p-3 rounded border d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center">
                            <span className="fw-medium fs-5 mb-2 mb-sm-0">
                              {task.name}
                            </span>
                            <span className="d-flex justify-content-sm-end">
                              <Link
                                to={`/edit/task/${task._id}`}
                                className="btn me-2 editAndDeleteBtn"
                              >
                                <i className="bi bi-pencil-square"></i>
                              </Link>
                              <button
                                className="btn editAndDeleteBtn"
                                onClick={() => deleteTaskHandler(task._id)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </main>
  );
}

export default SettingPage;
