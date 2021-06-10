import React, { useContext, useEffect } from "react";
import { GroupProjectContext } from "./GroupProjectProvider.js";
import { useHistory } from "react-router-dom";
import "./GroupProject.css";

export const GroupProjectList = () => {
  const history = useHistory();
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
        debugger;
        return (
          <section key={groupProject.id} className="registration">
            <div className="registration__game">
              Name of the GroupProject: {groupProject.title}
            </div>
            <div>
              Number of Gradautes Signed Up:
              {groupProject.number_of_graduates_signed_up}
            </div>
            <div>
              Description of the GroupProject:{groupProject.description}
            </div>
            <div>
              Skill Level of JobBoard:
              {groupProject.estimated_time_to_completion}
            </div>
            <div>
              Project Manager: {groupProject.project_manager.user.first_name}
              {groupProject.project_manager.user.last_name}
            </div>
            <div>Group Project GitHub Link: {groupProject.gitHubLink}</div>
            {groupProject.joined ? (
              <button
                className="btn btn-3"
                onClick={() => leaveGroupProject(groupProject.id)}
              >
                Leave
              </button>
            ) : (
              <button
                className="btn btn-2"
                onClick={() => joinGroupProject(groupProject.id)}
              >
                Join
              </button>
            )}
          </section>
        );
      })}
    </article>
  );
};
