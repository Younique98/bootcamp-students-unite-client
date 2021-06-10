import React, { useContext, useState, useEffect } from "react";
import { JobBoardContext } from "./JobBoardProvider.js";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import "./JobBoard.css";

export const JobBoardForm = () => {
  const history = useHistory();
  const { createJobBoard, getJobBoardTypes, gameTypes } =
    useContext(JobBoardContext);

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [currentJobBoard, setCurrentJobBoard] = useState({
    name: "",
    maker: localStorage.getItem("lu_token"),
    numberOfPlayers: 0,
    skillLevel: 1,
    gameTypeId: 0,
  });

  /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
  useEffect(() => {
    getJobBoardTypes();
  }, []);

  /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
  const changeJobBoardTitleState = (event) => {
    const newJobBoardState = { ...currentJobBoard };
    newJobBoardState.name = event.target.value;
    setCurrentJobBoard(newJobBoardState);
  };

  const changeJobBoardMakerState = (event) => {
    const newJobBoardState = { ...currentJobBoard };
    newJobBoardState.maker = event.target.value;
    setCurrentJobBoard(newJobBoardState);
  };

  const changeJobBoardPlayersState = (event) => {
    const newJobBoardState = { ...currentJobBoard };
    newJobBoardState.numberOfPlayers = event.target.value;
    setCurrentJobBoard(newJobBoardState);
  };

  const changeJobBoardSkillLevelState = (event) => {
    const newJobBoardState = { ...currentJobBoard };
    newJobBoardState.skillLevel = event.value;
    setCurrentJobBoard(newJobBoardState);
  };

  const changeJobBoardTypeState = (event) => {
    const newJobBoardState = { ...currentJobBoard };
    newJobBoardState.gameTypeId = event.target.value;
    setCurrentJobBoard(newJobBoardState);
  };

  const options = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
  ];
  /* REFACTOR CHALLENGE END */

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New JobBoard</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Title: </label>
          <input
            type="text"
            name="name"
            required
            autoFocus
            className="form-control"
            value={currentJobBoard.name}
            onChange={changeJobBoardTitleState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="numberOfPlayers">How many Players? </label>
          <input
            type="text"
            name="numberOfPlayers"
            required
            autoFocus
            className="form-control"
            value={currentJobBoard.numberOfPlayers}
            onChange={changeJobBoardPlayersState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="skillLevel">What is the skill Level? </label>
          <Select
            options={options}
            name="skillLevel"
            required
            autoFocus
            className="form-control"
            value={currentJobBoard.skillLevel}
            onChange={changeJobBoardSkillLevelState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="gameTypeId">What is the game type? </label>
          <select
            name="gameTypeId"
            className="form-control"
            value={currentJobBoard.gameTypeId}
            onChange={changeJobBoardTypeState}
          >
            <option value="0">Select a JobBoard Type</option>
            {gameTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.type}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      {/* You create the rest of the input fields for each game property */}

      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();

          const game = {
            maker: localStorage.getItem("lu_token"),
            name: currentJobBoard.name,
            numberOfPlayers: parseInt(currentJobBoard.numberOfPlayers),
            skillLevel: parseInt(currentJobBoard.skillLevel),
            gameTypeId: parseInt(currentJobBoard.gameTypeId),
          };
          // Send POST request to your API
          createJobBoard(game).then(() => history.push("/"));
        }}
        className="btn btn-primary"
      >
        Create
      </button>
    </form>
  );
};
