import React, { useState } from "react";

export const JobBoardContext = React.createContext();

export const JobBoardProvider = (props) => {
  const [jobBoards, setJobBoards] = useState([]);
  const [jobBoardTypes, setTypes] = useState([]);

  const getJobBoards = () => {
    return fetch("http://localhost:8000/jobboard", {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setJobBoards);
  };

  const createJobBoard = (jobBoard) => {
    debugger;
    return fetch("http://localhost:8000/jobboard", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobBoard),
    })
      .then((response) => response.json())
      .then(getJobBoards);
  };

  const updateJobBoard = (jobboard) => {
    return fetch(`http://localhost:8000/jobboard/${jobboard.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then((response) => response.json())
      .then(getJobBoards);
  };
  return (
    <JobBoardContext.Provider
      value={{
        jobBoards,
        getJobBoards,
        createJobBoard,
        updateJobBoard,
        jobBoardTypes,
      }}
    >
      {props.children}
    </JobBoardContext.Provider>
  );
};
