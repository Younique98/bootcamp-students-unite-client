import React, { useEffect, useContext } from "react";
import { ProfileContext } from "./ProfileProvider.js";
import { useHistory } from "react-router-dom";
import "./Profile.css";

export const Profile = () => {
  const { profile, getProfile } = useContext(ProfileContext);
  const loggedInUser = +localStorage.getItem("id");
  const history = useHistory();
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
          <h2 className="profileprojects">Your Projects</h2>
        </header>
        <div className="registrations">
          {profile.group_projects?.map((project) => {
            console.log(profile);
            return (
              <div key={project.id} className="registration">
                <div className="registration__project">
                  Title: {project.title}
                  <div>Description: {project.description}</div>
                  <a href="{project.github_link}">GitHub Link</a>
                </div>
                <button
                  className="btn btn-2 btn-sep icon-create"
                  onClick={() => {
                    history.push(`/groupprojects/${project.id}`);
                  }}
                >
                  Go to Project
                </button>
              </div>
            );
          })}
        </div>
        <div className="projectsmanaging">
          <h2 className="profileprojects"> Projects You Manage</h2>
          {profile.group_project?.map((project) => {
            if (project.project_manager === loggedInUser) {
              return (
                <div key={project.id} className="registration">
                  <div className="registration__project">
                    Title: {project.title}
                    <div>Description: {project.description}</div>
                    <a href="{project.github_link}">GitHub Link</a>
                  </div>
                  <button
                    className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                      history.push(`/groupprojects/${project.id}`);
                    }}
                  >
                    Go to Project
                  </button>
                </div>
              );
            }
          })}
        </div>
      </section>
    </article>
  );
};
