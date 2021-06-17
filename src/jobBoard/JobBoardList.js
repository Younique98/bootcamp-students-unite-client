import React, { useContext, useEffect } from "react";
import { JobBoardContext } from "./JobBoardProvider.js";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export const JobBoardList = (props) => {
  const { jobBoards, getJobBoards } = useContext(JobBoardContext);

  const history = useHistory();

  useEffect(() => {
    getJobBoards();
  }, []);

  return (
    <article className="jobboards">
      <header className="jobBoards__header">
        <button
          className="btn btn-2 btn-sep icon-create"
          onClick={() => {
            history.push({ pathname: "/jobboard/new" });
          }}
        >
          Register New JobBoard
        </button>
      </header>
      {jobBoards.map((jobboard) => {
        return (
          <section key={jobboard.id} className="jobboard">
            <div className="jobboard__title">Job Title: {jobboard.title}</div>
            <div className="jobboard__description">
              Job Description: {jobboard.description}
            </div>
            <div className="jobboard__jobLink">
              Job Link:
              <a href={jobboard.job_link}> Apply</a>
            </div>
          </section>
        );
      })}
      .
    </article>
  );
};
