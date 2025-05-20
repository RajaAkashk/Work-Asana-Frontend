import React from "react";
import TeamView from "../features/teams/TeamView";
import Sidebar from "../components/Sidebar";

function TeamsPage() {
  return (
    <>
      <main className="w-100 overflow-hidden">
        <div className="row">
          <div className="col-xl-2 col-md-3">
            <Sidebar />
          </div>
          <div className="col-xl-10 col-md-9">
            <div className="container py-4">
              <div>
                <TeamView />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default TeamsPage;
