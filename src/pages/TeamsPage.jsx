import React from "react";
import TeamView from "../features/teams/TeamView";
import Sidebar from "../components/Sidebar";

function TeamsPage() {
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
                <div>TeamsPage</div>
                <div>
                  <TeamView />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default TeamsPage;
