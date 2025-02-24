import React from "react";
import Sidebar from "../components/Sidebar";
import CompletedTasksChart from "./CompletedTasksChart";
import PendingTasksChart from "./PendingTasksChart";

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
                <h1 className="mb-4">Report Page</h1>
                <div className="row">
                  <div className="col-md-6">
                    <div className="px-4">
                      <h4>Total Work Completed Last Week</h4>
                      <CompletedTasksChart />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="px-4">
                      <h4>Tasks Closed by Each Team</h4>
                      <CompletedTasksChart /> 
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="px-4">
                      <h4>Pending Work Across Projects</h4>
                      <PendingTasksChart />
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
