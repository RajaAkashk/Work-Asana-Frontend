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

function SettingPage() {
  const dispatch = useDispatch();

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
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTeams());
    console.log("dispatch(fetchTeams()) :-", teams);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProjects());
    console.log("dispatch(fetchProjects()) :-", projects);
  }, [dispatch]);

  const deleteTaskHandler = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const deleteProjectHandler = (projectId) => {
    console.log("projectId:", projectId);
    dispatch(deleteProject(projectId));
  };
  const deleteTeamHandler = (teamId) => {
    console.log("teamId:", teamId);
    dispatch(deleteTeam(teamId));
  };

  return (
    <main>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <div className="container py-4">
              {/* Teams Section */}
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
                      {teams?.map((team) => (
                        <div key={team._id} className="col-md-3">
                          <div className="mt-2 p-2 rounded border d-flex justify-content-between">
                            <span className="col-md-7 fw-medium fs-5">
                              {team.name}
                            </span>
                            <span className="col-md-5">
                              <Link
                                to={{
                                  pathname: `/edit/team/${team._id}`,
                                }}
                                className="btn me-2 editAndDeleteBtn"
                              >
                                <i class="bi bi-pencil-square"></i>
                              </Link>
                              <button
                                onClick={() => deleteTeamHandler(team._id)}
                                className="btn editAndDeleteBtn"
                              >
                                <i class="bi bi-trash"></i>
                              </button>
                            </span>
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
                          <div key={project._id} className="col-md-3">
                            <div className="mt-2 p-2 rounded border d-flex justify-content-between">
                              <span className="col-md-7 fw-medium fs-5">
                                {project.name}
                              </span>
                              <span className="col-md-5">
                                <Link
                                  to={{
                                    pathname: `/edit/project/${project._id}`,
                                  }}
                                  className="btn me-2 editAndDeleteBtn"
                                >
                                  <i class="bi bi-pencil-square"></i>
                                </Link>
                                <button
                                  onClick={() =>
                                    deleteProjectHandler(project._id)
                                  }
                                  className="btn editAndDeleteBtn"
                                >
                                  <i class="bi bi-trash"></i>
                                </button>
                              </span>
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
                      {tasks?.map((task) => (
                        <div key={task._id} className="col-md-3">
                          <div className="mt-2 p-2 rounded border d-flex justify-content-between">
                            <span className="col-md-7 fw-medium fs-5">
                              {task.name}
                            </span>
                            <span className="col-md-5">
                              <Link
                                to={`/edit/task/${task.Id}`}
                                className="btn me-2 editAndDeleteBtn"
                              >
                                <i class="bi bi-pencil-square"></i>
                              </Link>
                              <button
                                className="btn editAndDeleteBtn"
                                onClick={() => deleteTaskHandler(task._id)}
                              >
                                <i class="bi bi-trash"></i>
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
      </div>
    </main>
  );
}

export default SettingPage;
