import React from "react";
import Sidebar from "../components/Sidebar";
import CompletedTasksChart from "../components/CompletedTasksChart";
import PendingTasksChart from "../components/PendingTasksChart";
import TeamTasksPieChart from "../components/TeamTasksPieChart";

function ReportPage() {
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
                <h2 className="mb-5 primaryColor">Report Page</h2>
                <div className="row flex-wrap justify-content-between">
                  <div className="col-md-6">
                    <div className="text-center">
                      <h4>Total Work Completed Last Week</h4>
                      <CompletedTasksChart />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="text-center">
                      <h4>Pending Work Across Projects</h4>
                      <PendingTasksChart />
                    </div>
                  </div>

                  <div className="row justify-content-center my-5">
                    <div className="col-md-4">
                      <div className="text-center">
                        <h4>Tasks Closed by Each Team</h4>
                        <TeamTasksPieChart />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ReportPage;
