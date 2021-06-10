import React, { useContext, useState, useEffect } from "react";
import { JobBoardContext } from "./JobBoardProvider.js";
import { useHistory } from "react-router-dom";

export const JobBoardForm = (props) => {
  const history = useHistory();
  const { createJobBoard, updateJobBoard, getJobBoards, jobBoards } =
    useContext(JobBoardContext);

  const [jobBoardState, setJobBoard] = useState({});
  /*
    Since the input fields are bound to the values of
    the properties of this state variable, you need to
    provide some default values.
    */
  const [currentJobBoard, setCurrentJobBoard] = useState({
    title: "",
    description: "",
    jobLink: "",
    poster: localStorage.getItem("lu_token"),
  });
  const editMode = props.match.params.hasOwnProperty("jobBoardId");

  const getJobBoardInEditMode = () => {
    if (editMode) {
      const jobBoardId = parseInt(props.match.params.jobBoardId);
      const selectedJobBoard = jobBoards.find((e) => e.id === jobBoardId) || {};
      setJobBoard(selectedJobBoard);
    }
  };
  /*
        Get jobBoard types on initialization so that the <select>
        element presents jobBoard type choices to the user.
    */
  useEffect(() => {
    getJobBoards();
  }, []);

  useEffect(() => {
    getJobBoardInEditMode();
  }, []);
  /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [jobBoard.target.title]
    */
  const changeJobBoardTitle = (jobBoard) => {
    const newJobBoardState = { ...currentJobBoard };
    newJobBoardState.title = jobBoard.target.value;
    setCurrentJobBoard(newJobBoardState);
  };

  const changeJobBoardDescriptionState = (jobBoard) => {
    const newJobBoardState = { ...currentJobBoard };
    newJobBoardState.description = jobBoard.target.value;
    setCurrentJobBoard(newJobBoardState);
  };

  const changeJobBoardJobLinkState = (jobBoard) => {
    const newJobBoardState = { ...currentJobBoard };
    newJobBoardState.jobLink = jobBoard.target.value;
    setCurrentJobBoard(newJobBoardState);
  };

  const constructUpdateJobBoard = () => {
    const jobBoardId = parseInt(currentJobBoard.jobBoardId);

    if (jobBoardId === 0) {
      window.alert("Please select an jobBoard");
    } else {
      if (editMode) {
        // PUT
        updateJobBoard({
          id: jobBoardState.id,
          title: jobBoardState.title,
          description: jobBoardState.description,
          jobLink: jobBoardState.jobLink,
          poster: localStorage.getItem("lu_token"),
        }).then(() => props.history.push("/jobboard"));
      }
    }
  };

  /* REFACTOR CHALLENGE END */

  return (
    <form className="jobBoardForm">
      <h2 className="jobBoardForm__title">Register a new group project</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Job Title: </label>
          <input
            type="title"
            title="title"
            required
            autoFocus
            className="form-control"
            value={currentJobBoard.title}
            onChange={changeJobBoardTitle}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            title="description"
            required
            autoFocus
            className="form-control"
            value={currentJobBoard.description}
            onChange={changeJobBoardDescriptionState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="jobLink"> What is the Job Link for this Job? </label>
          <input
            type="text"
            title="jobLink"
            required
            autoFocus
            className="form-control"
            value={currentJobBoard.jobLink}
            onChange={changeJobBoardJobLinkState}
          />
        </div>
      </fieldset>

      {/* You create the rest of the input fields for each jobBoard property */}

      <button
        type="submit"
        onClick={(evt) => {
          // Group Project form from being submitted
          evt.preventDefault();
          const jobBoard = {
            title: currentJobBoard.title,
            description: currentJobBoard.description,
            project_manager: localStorage.getItem("lu_token"),
            jobLink: currentJobBoard.jobLink,
            poster: localStorage.getItem("lu_token"),
          };
          // Send POST request to your API
          createJobBoard(jobBoard).then(() => history.push("/jobboard"));
        }}
        className="btn btn-primary"
      >
        Create Project
      </button>

      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();
          constructUpdateJobBoard();
        }}
        className="btn btn-primary"
      >
        {editMode ? "Save Updates" : "Edit JobBoard"}
      </button>
    </form>
  );
};
