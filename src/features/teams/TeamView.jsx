import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeams } from "./teamSlice";
import { Link } from "react-router-dom";

function TeamView() {
  const [teamList, setTeamList] = useState([]);
  const dispatch = useDispatch();

  const { teams, status, error } = useSelector((state) => state.teams);

  console.log("teams from TeamView", teams);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  useEffect(() => {
    setTeamList(teams);
  }, [teams]);

  return (
    <div>
      <div className=" align-items-center d-flex justify-content-between">
        <div>
          <span className="fs-2 fw-medium">Teams</span>
        </div>
        <div>
          <button className="btn btn-primary">
            <i className="bi bi-plus me-2"></i>New Team
          </button>
        </div>
      </div>

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
