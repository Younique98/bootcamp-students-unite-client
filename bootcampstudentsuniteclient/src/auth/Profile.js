import React, { useEffect, useContext } from "react";
import { ProfileContext } from "./ProfileProvider.js";
import "./Profile.css";

export const Profile = () => {
  const { profile, getProfile } = useContext(ProfileContext);

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <article className="profile">
      <header>
        <h1 className="profileTitle">Profile</h1>
      </header>
      <section className="profile__info">
        <header className="profile__header">
          <h2>Your Dashboard</h2>
        </header>
        <h2 className="profile__name">
          Welcome:{" "}
          {profile.bootcamp_graduate &&
            profile.bootcamp_graduate.user.first_name}{" "}
          {profile.bootcamp_graduate &&
            profile.bootcamp_graduate.user.last_name}
        </h2>
        <div className="profile__username">
          Username:{" "}
          {profile.bootcamp_graduate && profile.bootcamp_graduate.user.username}
        </div>
        <div className="profile__bio">
          About you:{" "}
          {profile.bootcamp_graduate && profile.bootcamp_graduate.bio}
        </div>
      </section>
      <section className="profile__registrations">
        <header className="registrations__header">
          <h3>Your Projects</h3>
        </header>
        <div className="registrations">
          {profile.group_projects.map((project) => {
            return (
              <div key={project.id} className="registration">
                <div className="registration__project">{project.title}</div>
                <div>{project.description}</div>
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
};
