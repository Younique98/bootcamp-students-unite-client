import React, { useState } from "react";

export const ProfileContext = React.createContext();

export const ProfileProvider = (props) => {
  /*
        Must profile a default value for the `events` property
        so that React doesn't throw an error when you try to
        iterate the events array in the view.
    */
  const [profile, setProfile] = useState({ groupProjects: [] });

  const getProfile = () => {
    return fetch("https://bootcamp-students-unite-api.herokuapp.com/profile", {
      headers: {
        Authorization: `Token ${localStorage.getItem("bc_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setProfile);
  };
  const getUserById = (id) => {
    return fetch(
      `https://bootcamp-students-unite-api.herokuapp.com/users/${id}?_expand=location&_expand=customer`
    ).then((res) => res.json());
  };

  return (
    <ProfileContext.Provider value={{ profile, getUserById, getProfile }}>
      {props.children}
    </ProfileContext.Provider>
  );
};
