import React, { useState } from "react";

export const JobBoardContext = React.createContext();

export const JobBoardProvider = (props) => {
  const [jobBoards, setJobBoards] = useState([]);
  const [jobBoardTypes, setTypes] = useState([]);

  const getJobBoards = () => {
    return fetch("https://bootcamp-students-unite-api.herokuapp.com/jobboard", {
      headers: {
        Authorization: `Token ${localStorage.getItem("bc_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setJobBoards);
  };

  const createJobBoard = (jobBoard) => {
    return fetch("https://bootcamp-students-unite-api.herokuapp.com/jobboard", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("bc_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobBoard),
    })
      .then((response) => response.json())
      .then(getJobBoards);
  };

  const updateJobBoard = (jobboard) => {
    return fetch(
      `https://bootcamp-students-unite-api.herokuapp.com/jobboard/${jobboard.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Token ${localStorage.getItem("bc_token")}`,
        },
      }
    )
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
