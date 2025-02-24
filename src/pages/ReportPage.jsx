import React from "react";
import Sidebar from "../components/Sidebar";
import CompletedTasksChart from "./CompletedTasksChart";
// import { fetchTasks } from "../features/tasks/taskSlice";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";

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
                <div>ReportPage</div>
                <CompletedTasksChart />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ReportPage;
