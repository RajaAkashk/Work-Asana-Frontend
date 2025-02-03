import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeams, addNewTeam } from "./teamSlice";
import { Link } from "react-router-dom";

function TeamView() {
  const [alert, setAlert] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([]); // Members as an array
  const [newMember, setNewMember] = useState(""); // Temporary state for a new member
  const [showForm, setShowForm] = useState(false); 

  const dispatch = useDispatch();

  const { teams, status, error } = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  // Handle adding new member
  const handleAddMember = () => {
    if (newMember && !members.includes(newMember)) {
      setMembers((prev) => [...prev, newMember]); 
      setNewMember(""); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTeam = {
      name: teamName,
      members: members,
    };

    // Dispatch the addNewTeam thunk action
    dispatch(addNewTeam(newTeam));

    // Reset the form and close it
    setTeamName("");
    setMembers([]);
    setShowForm(false); // Close the form after submission
  };

  return (
    <div>
      <div className=" align-items-center d-flex justify-content-between">
        <div>
          <span className="fs-2 fw-medium">Teams</span>
        </div>
        <div>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            <i className="bi bi-plus me-2"></i>New Team
          </button>
        </div>
      </div>

      {/* Overlay with blurred background */}
      {showForm && (
        <div className="overlay">
          <div className="form-container">
            <h3>Create a New Team</h3>
            {alert && (
              <div class="alert alert-success" role="alert">
                Adding New Team !
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="teamName" className="form-label">
                  Team Name:
                </label>
                <input
                  type="text"
                  id="teamName"
                  className="form-control"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Members:</label>
                <div>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={newMember}
                    onChange={(e) => setNewMember(e.target.value)} // Bind to the new member input
                    placeholder="Add a member"
                  />

                  {members.length > 0 && (
                    <ul className="list-group mb-4">
                      {members.map((member, index) => (
                        <li className="list-group-item" key={index}>
                          {member}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <button
                type="button"
                className="btn  fw-medium  w-100 mb-2"
                onClick={handleAddMember}
                style={{
                  background: "rgba(137, 19, 251, 0.07)",
                  color: "#6818F1",
                }}
              >
                Add Member
              </button>
              <button
                type="submit"
                className="btn text-primary bg-primary-subtle fw-medium w-100 mb-2"
                onClick={() => setAlert(true)}
              >
                Create Team
              </button>
              <button
                className="btn text-secondary bg-secondary-subtle fw-medium w-100 mb-2"
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setMembers([]);
                  setTeamName("");
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {status === "loading" ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error in fetching data.</p>
      ) : Array.isArray(teams) && teams.length > 0 ? (
        <div className="row flex-wrap">
          {teams.map((team) => (
            <div className="col-md-4 mt-3" key={team?._id}>
              <div className="card h-100" style={{ background: "#f7eeff" }}>
                <Link
                  to={`/team/${team?._id}`}
                  className="text-decoration-none text-reset"
                >
                  <div className="card-body">
                    <h5 className="card-title fs-3 mt-3">{team?.name}</h5>

                    <div>
                      {team?.members?.map((member) => {
                        const initials = member
                          ?.split(" ")
                          .map((name) => name[0]?.toUpperCase())
                          .join("");
                        return (
                          <div
                            key={member}
                            className="profile-pic"
                            style={{
                              display: "inline-block",
                              width: "40px",
                              height: "40px",
                              border: "1px solid #f7eeff",
                              borderRadius: "50%",
                              backgroundColor: "#9556ce",
                              color: "white",
                              textAlign: "center",
                              lineHeight: "40px",
                              marginRight: "-8px",
                              fontWeight: "bold",
                            }}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-custom-class="custom-tooltip"
                            data-bs-title="This top tooltip is themed via CSS variables."
                          >
                            {initials}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No teams available.</p>
      )}
    </div>
  );
}

export default TeamView;
