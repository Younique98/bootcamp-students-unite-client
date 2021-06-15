import React from "react";
import { Route } from "react-router-dom";
import { GroupProjectList } from "./groupprojects/GroupProjectList";
import { GroupProjectDetails } from "./groupprojects/GroupProjectDetails";
import { GroupProjectProvider } from "./groupprojects/GroupProjectProvider";
import { GroupProjectForm } from "./groupprojects/GroupProjectForm";
import { JobBoardProvider } from "./jobBoard/JobBoardProvider";
import { JobBoardList } from "./jobBoard/JobBoardList";
import { ProfileProvider } from "./auth/ProfileProvider";
import { Profile } from "./auth/Profile";
import { JobBoardForm } from "./jobBoard/JobBoardForm";

export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      >
        <GroupProjectProvider>
          <Route exact path="/">
            <GroupProjectList />
          </Route>
          <Route
            exact
            path="/groupprojects/new"
            render={(props) => {
              return <GroupProjectForm {...props} />;
            }}
          />
          <Route
            path="/groupprojects/edit/:groupprojectId(\d+)"
            render={(props) => <GroupProjectForm {...props} />}
          />

          <Route
            path="/groupprojects/:groupprojectId(\d+)"
            render={(props) => {
              return <GroupProjectDetails {...props} />;
            }}
          ></Route>
        </GroupProjectProvider>

        <GroupProjectProvider>
          <JobBoardProvider>
            <Route
              exact
              path="/jobboard"
              render={(props) => {
                return <JobBoardList {...props} />;
              }}
            />
            <Route
              exact
              path="/jobboard/new"
              render={(props) => {
                return <JobBoardForm {...props} />;
              }}
            />
          </JobBoardProvider>
        </GroupProjectProvider>
        <ProfileProvider>
          <Route exact path="/profile">
            <Profile />
          </Route>
        </ProfileProvider>
      </main>
    </>
  );
};
