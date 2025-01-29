import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeamById } from "../features/teams/teamSlice";

function TeamDetailsPage() {
  const { teamId } = useParams();
  const dispatch = useDispatch();

  const { teams, loading, error } = useSelector((state) => state.teams);
  console.log("TEams memners:", teams);
  useEffect(() => {
    dispatch(fetchTeamById(teamId));
  }, [dispatch]);

  return (
    <>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <Sidebar />
            </div>
            <div className="col-md-10">
              <div className="container py-4">
                <Link
                  className="text-decoration-none text-primary underline fs-5 fw-medium"
                  to="/team"
                >
                  <i class="bi bi-arrow-left"></i> Back to Teams
                </Link>
                <div>
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p>Error in fetching data.</p>
                  ) : teams ? (
                    <div>
                      {/* <h1>{teams.name}</h1> */}
                      <div
                        className="col-md-3 mt-5 h-100"
                        // style={{ background: "#f7eeff" }}
                      >
                        <div>
                          <h5 className="fs-3 mt-3">{teams.name}</h5>

                          <div className="py-3">
                            <p className="fw-medium fs-5 text-secondary">
                              Members
                            </p>
                            <ul className="list-style-none p-0">
                              {Array.isArray(teams?.members) &&
                                teams.members.map((member, index) => {
                                  const initials = member
                                    .split(" ")
                                    .map((name) => name[0].toUpperCase())
                                    .join("");

                                  return (
                                    <li
                                      key={index}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        marginBottom: "10px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: "40px",
                                          height: "40px",
                                          borderRadius: "50%",
                                          backgroundColor: "#f4c7ab",
                                          color: "#8c6239",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          fontWeight: "bold",
                                          fontSize: "16px",
                                        }}
                                      >
                                        {initials}
                                      </div>
                                      <span className="fs-6 fw-medium">
                                        {member}
                                      </span>
                                    </li>
                                  );
                                })}
                            </ul>
                          </div>
                          <button className="btn btn-primary fs-6 fw-medium">
                            {" "}
                            <i className="bi bi-plus"></i> Member
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="fs-5 fw-medium">Team Not Found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default TeamDetailsPage;
