import { fetchTeams } from "./teamSlice";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";

function TeamView() {
  const dispatch = useDispatch();

  const { teams, status, error } = useSelector((state) => state);

  console.log("teams", teams);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  return (
    <div>
      TeamView
      <p>teams</p>
    </div>
  );
}

export default TeamView;
