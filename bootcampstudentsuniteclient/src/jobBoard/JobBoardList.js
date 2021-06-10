import React, { useContext, useEffect } from "react";
import { JobBoardContext } from "./JobBoardProvider.js";
import { useHistory } from "react-router-dom";

export const JobBoardList = (props) => {
  const { games, getJobBoards } = useContext(JobBoardContext);

  const history = useHistory();

  useEffect(() => {
    getJobBoards();
  }, []);

  return (
    <article className="gameHolder">
      <button
        className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          history.push({ pathname: "/games/new" });
        }}
      >
        Register New JobBoard
      </button>
      <article className="games">
        {games.map((game) => {
          return (
            <div className="individualJobBoards">
              <section key={`game--${game.id}`} className="game">
                <div className="game__title">
                  Name of the JobBoard: {game.name}
                </div>
                <div className="game__players">
                  How many players needed? {game.number_of_players}
                </div>
                <div className="game__type">
                  What is the type of game? {game.game_type.type}
                </div>
                <div className="game__skillLevel">
                  What should the skill level be of the players?{" "}
                  {game.skill_level}
                </div>
              </section>
            </div>
          );
        })}
      </article>
      .
    </article>
  );
};
