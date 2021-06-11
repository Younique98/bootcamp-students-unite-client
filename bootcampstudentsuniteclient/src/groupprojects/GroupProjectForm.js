import React, { useContext, useState, useEffect } from "react";
import { GroupProjectContext } from "./GroupProjectProvider.js";
import { useHistory } from "react-router-dom";

export const GroupProjectForm = (props) => {
  const history = useHistory();
  const {
    createGroupProject,
    joinGroupProject,
    leaveGroupProject,
    updateGroupProject,
    getGroupProjects,
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
    numberOfGraduatesSignedUp: "",
    description: "",
    estimatedTimeToCompletion: "",
    gitHubLink: "",
    project_manager: localStorage.getItem("lu_token"),
  });

  const editMode = props.match.params.hasOwnProperty("groupprojectId");

  const getGroupProjectInEditMode = () => {
    if (editMode) {
      const groupProjectId = parseInt(props.match.params.groupProjectId);
      const selectedGroupProject =
        groupProjects.find((e) => e.id === groupProjectId) || {};
      setGroupProject(selectedGroupProject);
    }
  };
  /*
        Get groupProject types on initialization so that the <select>
        element presents groupProject type choices to the user.
    */
  useEffect(() => {
    getGroupProjects();
  }, []);

  useEffect(() => {
    getGroupProjectInEditMode();
  }, [groupProjects]);
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
    const groupProjectId = parseInt(groupProjectState.id);

    if (groupProjectId === 0) {
      window.alert("Please select an group project");
    } else {
      if (editMode) {
        // PUT
        updateGroupProject({
          id: groupProjectState.id,
          title: groupProjectState.title,
          numberOfGraduatesSignedUp:
            groupProjectState.numberOfGraduatesSignedUp,
          date: groupProjectState.date,
          description: groupProjectState.description,
          gitHubLink: groupProjectState.gitHubLink,
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
      <h2 className="groupProjectForm__title">
        {editMode ? "Update Project" : "Create New Group Project"}
      </h2>
      <fieldset>
        {console.log(props.match.params)}
        {console.log(editMode)}
        <div className="form-group">
          <label htmlFor="title">Group Project Title: </label>
          <input
            type="title"
            name="title"
            placeholder="title"
            defaultValue={groupProjectState.title}
            required
            autoFocus
            className="form-control"
            value={currentGroupProject.title}
            onChange={changeGroupProjectTitle}
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
            name="numberOfGraduatesSignedUp"
            placeholder="Number of Graduates Signed Up"
            defaultValue={groupProjectState.numberOfGraduatesSignedUp}
            required
            autoFocus
            className="form-control"
            value={currentGroupProject.numberOfGraduatesSignedUp}
            onChange={changeNumberOfSignUps}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            name="description"
            placeholder="description"
            defaultValue={groupProjectState.description}
            required
            autoFocus
            className="form-control"
            value={currentGroupProject.description}
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
            defaultValue={groupProjectState.gitHubLink}
            required
            autoFocus
            className="form-control"
            value={currentGroupProject.gitHubLink}
            onChange={changeGroupProjectGitHubLinkState}
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
            name="estimatedTimeToCompletion"
            placeholder="Estimated Time to Completion"
            defaultValue={groupProjectState.estimatedTimeToCompletion}
            required
            autoFocus
            className="form-control"
            value={currentGroupProject.estimatedTimeToCompletion}
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
              project_manager: localStorage.getItem("lu_token"),
            };
            // Send POST request to your API
            createGroupProject(groupProject).then(() =>
              history.push("/groupprojects")
            );
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
