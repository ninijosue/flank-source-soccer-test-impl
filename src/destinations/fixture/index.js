import React from "react";
import { Link, useParams } from "react-router-dom";
import "./style.css";

const TeamFixture = (props) => {
  const {team} = useParams();
  return (
    <div className="fixtureContainer">
      <div className="mainHead">
        <div>
          <h1 className="headText">{team}'s Fixture</h1>
          <div className="fixtureNavigation">
            <Link to="/">Soccer table</Link>
            <span>Soccer table</span>
          </div>
        </div>
      </div>
      <div className="fixtureRowContainer">
        <h2 className="fixtureTitle">Tuesday 30 August 2022</h2>
        <div className="fixtureDetails">
          <h3>crystal palace</h3>
          <div className="winings">
            <span>1</span>
            <span className="winingsDivider" />
            <span>2</span>
          </div>
          <h3>Chelsea</h3>
        </div>
        <div className="fixtureDetails">
          <h3>crystal palace</h3>
          <div className="winingsWaitting">
           <span>12 : 20</span>
          </div>
          <h3>Chelsea</h3>
        </div>
      </div>
    </div>
  );
};

export default TeamFixture;
