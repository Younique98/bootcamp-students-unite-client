import React, { useContext, useState, useEffect } from "react";
import { GroupProjectContext } from "./GroupProjectProvider.js";
import { useHistory } from "react-router-dom";

export const GroupProjectForm = (props) => {
  // utilize history
  const history = useHistory();
  const {
    createGroupProject,
    updateGroupProject,
    getGroupProjectById,
    groupProjects,
  } = useContext(GroupProjectContext);

  const [groupProjectState, setGroupProject] = useState({});
  /*
    Since the input fields are bound to the values of
    the properties of this state variable, you need to
    provide some default values.
    */
  const [currentGroupProject, setCurrentGroupProject] = useState({
    title: "",
    numberOfGraduatesSignedUp: 1,
    description: "",
    estimatedTimeToCompletion: "",
    gitHubLink: "",
    project_manager: localStorage.getItem("bc_token"),
  });

  const editMode = props.match.params.hasOwnProperty("groupprojectId");

  const getGroupProjectInEditMode = () => {
    if (editMode) {
      const groupProjectId = parseInt(props.match.params.groupprojectId);
      const selectedGroupProject =
        groupProjects.find((project) => project.id === groupProjectId) || {};
      setGroupProject(selectedGroupProject);
      setCurrentGroupProject(selectedGroupProject);
    }
  };

  /*
        Get groupProject types on initialization so that the <select>
        element presents groupProject type choices to the user.
    */
  useEffect(() => {
    if (editMode) {
      const projectId = parseInt(props.match.params.groupprojectId);
      getGroupProjectById(projectId).then((res) => setCurrentGroupProject(res));
      getGroupProjectInEditMode();
    }
  }, []);

  /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [groupProject.target.title]
    */
  const changeGroupProjectTitle = (event) => {
    const newGroupProjectState = { ...currentGroupProject };
    newGroupProjectState.title = event.target.value;

    setCurrentGroupProject(newGroupProjectState);
  };
  const changeNumberOfSignUps = (event) => {
    const newGroupProjectState = { ...currentGroupProject };
    newGroupProjectState.numberOfGraduatesSignedUp = event.target.value;
    setCurrentGroupProject(newGroupProjectState);
  };

  const changeGroupProjectTimeToCompleteState = (event) => {
    const newGroupProjectState = { ...currentGroupProject };
    newGroupProjectState.estimatedTimeToCompletion = event.target.value;
    setCurrentGroupProject(newGroupProjectState);
  };

  const changeGroupProjectDescriptionState = (event) => {
    const newGroupProjectState = { ...currentGroupProject };
    newGroupProjectState.description = event.target.value;
    setCurrentGroupProject(newGroupProjectState);
  };

  const changeGroupProjectGitHubLinkState = (event) => {
    const newGroupProjectState = { ...currentGroupProject };
    newGroupProjectState.gitHubLink = event.target.value;
    setCurrentGroupProject(newGroupProjectState);
  };

  const constructUpdateGroupProject = () => {
    const groupProjectId = parseInt(currentGroupProject.id);

    // const number_of_graduates_signed_up = currentGroupProject.participants;
    // let countofstudents = number_of_graduates_signed_up.length;
    // console.log(countofstudents);

    if (groupProjectId === 0) {
      window.alert("Please select an group project");
    } else {
      if (editMode) {
        // PUT
        updateGroupProject({
          id: currentGroupProject.id,
          title: currentGroupProject.title,
          numberOfGraduatesSignedUp: currentGroupProject.participants?.length,
          date: currentGroupProject.date,
          description: currentGroupProject.description,
          gitHubLink: currentGroupProject.github_link,
          estimatedTimeToCompletion:
            currentGroupProject.estimated_time_to_completion,
          project_manager: localStorage.getItem("bc_token"),
        }).then(() => props.history.push("/"));
      }
    }
  };

  /* REFACTOR CHALLENGE END */

  return (
    <form className="groupProjectForm">
      <h2 className="groupProjectForm__title">
        {editMode ? "Update Project" : "Create New Group Project"}
      </h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Group Project Title: </label>
          <input
            type="title"
            name="title"
            placeholder="title"
            defaultValue={currentGroupProject.title}
            required
            autoFocus
            className="form-control"
            onChange={changeGroupProjectTitle}
          />
        </div>
      </fieldset>
      {/* <fieldset>
        <div className="form-group">
          <label htmlFor="numberOfGraduatesSignedUp">
            Number of Graduates Signed Up:{" "}
          </label>
          <input
            type="numberOfGraduatesSignedUp"
            name="numberOfGraduatesSignedUp"
            placeholder="Number of Graduates Signed Up"
            required
            autoFocus
            className="form-control"
            defaultValue={currentGroupProject.number_of_graduates_signedUp}
            onChange={changeNumberOfSignUps}
          />
        </div>
      </fieldset> */}

      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            name="description"
            placeholder="description"
            defaultValue={currentGroupProject.description}
            required
            autoFocus
            className="form-control"
            onChange={changeGroupProjectDescriptionState}
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
            name="gitHubLink"
            placeholder="GitHub Link"
            defaultValue={currentGroupProject.github_link}
            required
            autoFocus
            className="form-control"
            onChange={changeGroupProjectGitHubLinkState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="estimatedTimeToCompletion">
            How many weeks will this project take?{" "}
          </label>
          <input
            type="text"
            name="estimatedTimeToCompletion"
            placeholder="Estimated Time to Completion"
            defaultValue={currentGroupProject.estimated_time_to_completion}
            required
            autoFocus
            className="form-control"
            onChange={changeGroupProjectTimeToCompleteState}
          />
        </div>
      </fieldset>

      {/* You create the rest of the input fields for each groupProject property */}
      {!editMode ? (
        <button
          type="submit"
          onClick={(evt) => {
            // Group Project form from being submitted
            evt.preventDefault();
            const groupProject = {
              title: currentGroupProject.title,
              numberOfGraduatesSignedUp: parseInt(
                currentGroupProject.numberOfGraduatesSignedUp
              ),
              description: currentGroupProject.description,
              estimatedTimeToCompletion: parseInt(
                currentGroupProject.estimatedTimeToCompletion
              ),
              gitHubLink: currentGroupProject.gitHubLink,
              project_manager: localStorage.getItem("bc_token"),
            };
            // Send POST request to your API
            createGroupProject(groupProject).then(() => history.push("/"));
          }}
          className="btn btn-primary"
        >
          Create Project
        </button>
      ) : (
        <button
          type="submit"
          onClick={(evt) => {
            evt.preventDefault();
            constructUpdateGroupProject();
          }}
          className="btn btn-primary"
        >
          Save Updates
        </button>
      )}
    </form>
  );
};
