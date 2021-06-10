import React, { useState } from "react";

export const JobBoardContext = React.createContext();

export const JobBoardProvider = (props) => {
  const [games, setJobBoards] = useState([]);
  const [gameTypes, setTypes] = useState([]);

  const getJobBoards = () => {
    return fetch("http://localhost:8000/games", {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setJobBoards);
  };

  const createJobBoard = (game) => {
    return fetch("http://localhost:8000/games", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
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
        games,
        getJobBoards,
        createJobBoard,
        updateJobBoard,
        gameTypes,
      }}
    >
      {props.children}
    </JobBoardContext.Provider>
  );
};
