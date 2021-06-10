import React, { useState } from "react";

export const GroupProjectContext = React.createContext();

export const GroupProjectProvider = (props) => {
  const [groupProjects, setGroupProjects] = useState([]);

  const getGroupProjects = () => {
    return fetch("http://localhost:8000/groupprojects", {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setGroupProjects);
  };

  const leaveGroupProject = (groupProjectId) => {
    return fetch(
      `http://localhost:8000/groupprojects/${groupProjectId}/signup`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("lu_token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then(getGroupProjects);
  };

  const createGroupProject = (groupProject) => {
    debugger;
    return fetch("http://localhost:8000/groupprojects", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(groupProject),
    })
      .then((response) => response.json())
      .then(getGroupProjects);
  };

  const joinGroupProject = (groupProjectId) => {
    return fetch(
      `http://localhost:8000/groupprojects/${groupProjectId}/signup`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("lu_token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then(getGroupProjects);
  };
  const updateGroupProject = (groupProject) => {
    return fetch(`http://localhost:8088/groupprojects/${groupProject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(groupProject),
    }).then(getGroupProjects);
  };

  return (
    <GroupProjectContext.Provider
      value={{
        groupProjects,
        getGroupProjects,
        leaveGroupProject,
        joinGroupProject,
        createGroupProject,
      }}
    >
      {props.children}
    </GroupProjectContext.Provider>
  );
};
