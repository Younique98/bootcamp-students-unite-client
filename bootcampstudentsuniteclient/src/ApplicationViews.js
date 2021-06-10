import React from "react";
import { Route } from "react-router-dom";
import { GroupProjectList } from "./groupprojects/GroupProjectList";
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
        </GroupProjectProvider>

        <GroupProjectProvider>
          <JobBoardProvider>
            <Route exact path="/jobboard">
              <JobBoardList />
            </Route>
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
