import React, { useContext, useState, useEffect } from "react";
import { JobBoardContext } from "./JobBoardProvider.js";
import { useHistory } from "react-router-dom";

export const JobBoardForm = (props) => {
  const history = useHistory();
  const { createJobBoard, updateJobBoard, getJobBoards, groupProjects } =
    useContext(JobBoardContext);

  const [groupProjectState, setJobBoard] = useState({});
  /*
    Since the input fields are bound to the values of
    the properties of this state variable, you need to
    provide some default values.
    */
  const [currentJobBoard, setCurrentJobBoard] = useState({
    title: "",
    numberOfGraduatesSignedUp: "",
    description: "",
    estimatedTimeToCompletion: "",
    gitHubLink: "",
    project_manager: localStorage.getItem("lu_token"),
  });
  console.log(props);
  const editMode = props.match.params.hasOwnProperty("groupProjectId");

  const getJobBoardInEditMode = () => {
    if (editMode) {
      const groupProjectId = parseInt(props.match.params.groupProjectId);
      const selectedJobBoard =
        groupProjects.find((e) => e.id === groupProjectId) || {};
      setJobBoard(selectedJobBoard);
    }
  };
  /*
        Get groupProject types on initialization so that the <select>
        element presents groupProject type choices to the user.
    */
  useEffect(() => {
    getJobBoards();
    getJobBoards();
  }, []);

  useEffect(() => {
    getJobBoardInEditMode();
  }, [groupProjects]);
  /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [groupProject.target.title]
    */
  const changeJobBoardTitle = (groupProject) => {
    const newJobBoardState = { ...currentJobBoard };
    newJobBoardState.title = groupProject.target.value;
    setCurrentJobBoard(newJobBoardState);
  };
  const changeNumberOfSignUps = (groupProject) => {
    const newJobBoardState = { ...currentJobBoard };
    newJobBoardState.numberOfGraduatesSignedUp = groupProject.target.value;
    setCurrentJobBoard(newJobBoardState);
  };

  const changeJobBoardTimeToCompleteState = (groupProject) => {
    const newJobBoardState = { ...currentJobBoard };
    newJobBoardState.estimatedTimeToCompletion = groupProject.target.value;
    setCurrentJobBoard(newJobBoardState);
  };

  const changeJobBoardDescriptionState = (groupProject) => {
    const newJobBoardState = { ...currentJobBoard };
    newJobBoardState.description = groupProject.target.value;
    setCurrentJobBoard(newJobBoardState);
  };

  const changeJobBoardGitHubLinkState = (groupProject) => {
    const newJobBoardState = { ...currentJobBoard };
    newJobBoardState.gitHubLink = groupProject.target.value;
    setCurrentJobBoard(newJobBoardState);
  };

  const constructUpdateJobBoard = () => {
    const groupProjectId = parseInt(currentJobBoard.groupProjectId);

    if (groupProjectId === 0) {
      window.alert("Please select an groupProject");
    } else {
      if (editMode) {
        // PUT
        updateJobBoard({
          id: groupProjectState.id,
          title: groupProjectState.title,
          numberOfGraduatesSignedUp:
            groupProjectState.numberOfGraduatesSignedUp,
          date: groupProjectState.date,
          description: groupProjectState.description,
          estimatedTimeToCompletion:
            groupProjectState.estimatedTimeToCompletion,
          project_manager: localStorage.getItem("lu_token"),
        }).then(() => props.history.push("/groupprojects"));
      }
    }
  };

  /* REFACTOR CHALLENGE END */

  return (
    <form className="groupProjectForm">
      <h2 className="groupProjectForm__title">Register a new group project</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Group Project Title: </label>
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
          <label htmlFor="numberOfGraduatesSignedUp">
            Number of Graduates Signed Up:{" "}
          </label>
          <input
            type="numberOfGraduatesSignedUp"
            title="numberOfGraduatesSignedUp"
            required
            autoFocus
            className="form-control"
            value={currentJobBoard.numberOfGraduatesSignedUp}
            onChange={changeNumberOfSignUps}
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
          <label htmlFor="gitHubLink">
            {" "}
            What is the GitHub Link for this project?{" "}
          </label>
          <input
            type="text"
            title="gitHubLink"
            required
            autoFocus
            className="form-control"
            value={currentJobBoard.gitHubLink}
            onChange={changeJobBoardGitHubLinkState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="estimatedTimeToCompletion">
            How long will this project take?{" "}
          </label>
          <input
            type="text"
            title="estimatedTimeToCompletion"
            required
            autoFocus
            className="form-control"
            value={currentJobBoard.estimatedTimeToCompletion}
            onChange={changeJobBoardTimeToCompleteState}
          />
        </div>
      </fieldset>

      {/* You create the rest of the input fields for each groupProject property */}

      <button
        type="submit"
        onClick={(evt) => {
          // Group Project form from being submitted
          evt.preventDefault();
          const groupProject = {
            title: currentJobBoard.title,
            numberOfGraduatesSignedUp:
              currentJobBoard.numberOfGraduatesSignedUp,
            date: currentJobBoard.date,
            description: currentJobBoard.description,
            estimatedTimeToCompletion: parseInt(
              currentJobBoard.estimatedTimeToCompletion
            ),
            project_manager: localStorage.getItem("lu_token"),
          };
          // Send POST request to your API
          createJobBoard(groupProject).then(() =>
            history.push("/groupProjects")
          );
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
