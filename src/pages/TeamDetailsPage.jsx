import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeamById, addNewTeamMember } from "../features/teams/teamSlice";

function TeamDetailsPage() {
  const [newMember, setNewMember] = useState(""); // Temporary state for a new member
  const [showForm, setShowForm] = useState(false);

  const { teamId } = useParams();
  const dispatch = useDispatch();

  const { teams, loading, error } = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(fetchTeamById(teamId));
  }, [dispatch]);

  const handleAddMember = (e) => {
    e.preventDefault();
    dispatch(
      addNewTeamMember({
        teamId: teamId,
        newTeamMember: newMember,
      })
    );
    // reset the form
    setShowForm(false);
    setNewMember("");
  };

  return (
    <>
      <main className="w-100 overflow-hidden">
        <div className="row">
          <div className="col-xl-2 col-md-3">
            <Sidebar />
          </div>
          <div className="col-xl-10 col-md-9">
            <div className="container py-4">
              <Link
                className="text-decoration-none text-primary underline fs-5 fw-medium"
                to="/team"
              >
                <i class="bi bi-arrow-left"></i> Back to Teams
              </Link>

              {showForm && (
                <div className="overlay">
                  <div className="form-container">
                    <h3>Add a New Member</h3>

                    <form onSubmit={handleAddMember}>
                      <div className="my-3">
                        <div>
                          <label className="form-label fw-medium">
                            Members Name
                          </label>
                          <input
                            type="text"
                            className="form-control mb-2"
                            value={newMember}
                            onChange={(e) => setNewMember(e.target.value)} // Bind to the new member input
                            placeholder="Member Name"
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
                        Add Member
                      </button>

                      <button
                        className="btn text-secondary bg-secondary-subtle fw-medium w-100 mb-2"
                        type="button"
                        onClick={() => {
                          setShowForm(false);
                          setNewMember("");
                        }}
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              )}

              <div>
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>Error in fetching data.</p>
                ) : teams ? (
                  <div>
                    <div
                      className="col-xl-3 col-md-6 mt-5 h-100"
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
                        <button
                          onClick={() => setShowForm(true)}
                          className="btn btn-primary fs-6 fw-medium"
                        >
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
      </main>
    </>
  );
}

export default TeamDetailsPage;
