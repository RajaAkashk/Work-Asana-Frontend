import React from "react";
import Sidebar from "../components/Sidebar";

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
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ReportPage;
