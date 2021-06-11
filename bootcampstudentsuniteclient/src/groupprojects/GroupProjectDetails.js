import React, { useContext, useEffect, useState } from "react";
import { GroupProjectContext } from "./GroupProjectProvider";
import "./GroupProject.css";

export const GroupProjectDetails = (props) => {
  const {
    DeleteGroupProject,
    getGroupProjectById,
    getGroupProjectCategories,
    getGroupProjects,
  } = useContext(GroupProjectContext);

  const [groupProject, setGroupProject] = useState({});

  useEffect(() => {
    const groupProjectId = parseInt(props.match.params.groupprojectId);
    getGroupProjectById(groupProjectId).then(setGroupProject);
  }, []);

  useEffect(() => {
    getGroupProjects();
  }, []);
  return (
    <section className="groupProjectDetail">
      <h1 className="groupProjectName">{groupProject.title}</h1>
      <div className="bodyOfGroupProjectDetails">
        <div className="groupProjectDetail__description">
          Description: {groupProject.description}
        </div>
        <div className="groupProjectDetail__timeToCompletion">
          Estimated Time To Play: {groupProject.estimated_time_to_completion}
        </div>
        <div className="groupProjectDetail__numberOfGraduatesSignedUp">
          Number Of GraduatesSignedUp:{" "}
          {groupProject.number_of_graduates_signed_up}
        </div>

        <button
          onClick={() =>
            DeleteGroupProject(groupProject.id).then(() =>
              props.history.push("/")
            )
          }
        >
          Delete Group Project
        </button>

        <button
          onClick={() => {
            props.history.push(`/groupprojects/edit/${groupProject.id}`);
          }}
        >
          Edit
        </button>
      </div>
    </section>
  );
};
