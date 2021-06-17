import React, { useContext, useEffect } from "react";
import { GroupProjectContext } from "./GroupProjectProvider.js";
import { useHistory } from "react-router-dom";
import "./GroupProject.css";

export const GroupProjectList = () => {
  const history = useHistory();
  const loggedInUser = +localStorage.getItem("id");
  const {
    groupProjects,
    getGroupProjects,
    joinGroupProject,
    leaveGroupProject,
  } = useContext(GroupProjectContext);

  useEffect(() => {
    getGroupProjects();
  }, []);

  return (
    <article className="groupProjects">
      <header className="groupProjects__header">
        <h1>Group Projects</h1>
        <button
          className="btn btn-2 btn-sep icon-create"
          onClick={() => {
            history.push({ pathname: "/groupprojects/new" });
          }}
        >
          Schedule New Group Project
        </button>
      </header>

      {groupProjects.map((groupProject) => {
        let numberofstudents = groupProject.participants?.length;
        return (
          <section key={groupProject.id} className="registration">
            <div className="registration__groupproject">
              Name of the GroupProject: {groupProject.title}
            </div>
            <div>
              Number of Graduates Signed Up:
              {numberofstudents}
            </div>
            <div>
              Description of the GroupProject: {groupProject.description}
            </div>
            <div>
              Estimated time to completion:
              {groupProject.estimated_time_to_completion}
            </div>
            <div>
              Project Manager: {groupProject.project_manager.user.first_name}
              {groupProject.project_manager.user.last_name}
            </div>
            <div>Group Project GitHub Link: {groupProject.gitHubLink}</div>
            <div className="projectButtons">
              {groupProject.participants.includes(loggedInUser) ? (
                <button
                  className="btn btn-3"
                  onClick={() => leaveGroupProject(groupProject.id)}
                >
                  Leave
                </button>
              ) : (
                <button
                  className="btn btn-2"
                  onClick={() => joinGroupProject(parseInt(groupProject.id))}
                >
                  Join
                </button>
              )}
              <button
                className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                  history.push({
                    pathname: `/groupprojects/${groupProject.id}`,
                  });
                }}
              >
                View Group Project
              </button>
            </div>
          </section>
        );
      })}
    </article>
  );
};
