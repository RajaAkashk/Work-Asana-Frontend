import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTeamById,
  addNewTeamMember,
  updateTeam,
} from "../features/teams/teamSlice";

function EditTeamPage() {
  const [newMember, setNewMember] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState(false);

  // Added states for team name, description, and members
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [editedMembers, setEditedMembers] = useState([]);

  const { teamId } = useParams();
  const dispatch = useDispatch();
  const { teams, loading, error } = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(fetchTeamById(teamId));
  }, [dispatch, teamId]);

  useEffect(() => {
    if (teams) {
      setTeamName(teams.name);
      setTeamDescription(teams.description);
      setEditedMembers(teams.members || []); // Initialize with team members if available
    }
  }, [teams]);

  const handleAddMember = (e) => {
    e.preventDefault();
    dispatch(addNewTeamMember({ teamId, newTeamMember: newMember }));
    setShowForm(false);
    setNewMember("");
  };

  const handleMemberChange = (index, newValue) => {
    const updatedMembers = [...editedMembers];
    updatedMembers[index] = newValue;
    setEditedMembers(updatedMembers);
  };

  const handleUpdateTeam = (e) => {
    e.preventDefault();
    const filteredMembers = editedMembers.filter(
      (member) => member.trim() !== ""
    );
    dispatch(
      updateTeam({
        teamId,
        updatedTeam: {
          name: teamName,
          description: teamDescription,
          members: filteredMembers,
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
          <div className="container py-4">
            <Link
              className="primaryColor text-decoration-none underline fs-5 fw-medium"
              to="/setting"
            >
              <i className="bi bi-arrow-left"></i> Back to Setting
            </Link>

            {showForm && (
              <div className="overlay">
                <div className="form-container">
                  <h3>Add a New Member</h3>
                  <form onSubmit={handleAddMember}>
                    <div className="my-3">
                      <label className="form-label fw-medium">
                        Members Name
                      </label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        value={newMember}
                        onChange={(e) => setNewMember(e.target.value)}
                        placeholder="Member Name"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn fw-medium w-100 mb-2"
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
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : error ? (
                <p>Error in fetching data.</p>
              ) : teams ? (
                <form
                  className="mt-4 primaryBgColor rounded shadow-sm px-4 py-3"
                  onSubmit={handleUpdateTeam}
                >
                  <div className="mb-3">
                    <label className="form-label" htmlFor="teamName">
                      Team Name:
                    </label>
                    <input
                      id="teamName"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)} // Bind to the team name input
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="description">
                      Description:
                    </label>
                    <textarea
                      id="description"
                      value={teamDescription}
                      onChange={(e) => setTeamDescription(e.target.value)} // Bind to the description input
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Team Members:</label>
                    <div>
                      {editedMembers.map((member, index) => (
                        <input
                          key={index}
                          value={member}
                          onChange={(e) =>
                            handleMemberChange(index, e.target.value)
                          } // Allow member editing
                          className="form-control mb-2"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <button
                      type="submit"
                      className="btn btn-outline-primary fs-6 fw-medium"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary fs-6 fw-medium"
                      onClick={() => setShowForm(true)}
                    >
                      <i className="bi bi-plus"></i> Add Member
                    </button>
                  </div>
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
                <p className="fs-5 fw-medium">Team Not Found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EditTeamPage;
