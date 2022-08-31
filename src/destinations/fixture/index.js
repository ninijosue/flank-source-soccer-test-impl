import React from "react";
import { Link, useParams } from "react-router-dom";
import "./style.css";
import { data } from "../../data";
import * as fnsDate from 'date-fns'
import {getTeamFixtures} from "./data-manupulation";

const TeamFixture = (props) => {
  const { team } = useParams();
  const [fixtures, setFixtures] = React.useState([]);

  React.useEffect(() => {
    const res = getTeamFixtures(team, data);
    setFixtures(res);
  }, []);

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
      {
        fixtures.map((fx, mainFxIndex) => {
          return (
            <div key={`main_Fx_${mainFxIndex}`} className="fixtureRowContainer">
              <h2 className="fixtureTitle">{(new Date(fx.date)).toDateString()}</h2>
              {
                fx.fixture.map((subFx, i) => {
                  const teamNames = Object.keys(subFx.score);
                  const firstTeamScore = subFx.score[teamNames[0]];
                  const secondTeamScore = subFx.score[teamNames[1]];
                  if (firstTeamScore)
                    return (
                      <div key={`subFx_${i}`} className="fixtureDetails">
                        <h3>{teamNames[0]}</h3>
                        <div className="winings">
                          <span>{firstTeamScore}</span>
                          <span className="winingsDivider" />
                          <span>{secondTeamScore}</span>
                        </div>
                        <h3>{teamNames[1]}</h3>
                      </div>
                    )
                  else return (
                    <div key={`sub_non_Fx_${i}`} className="fixtureDetails">
                      <h3>{teamNames[0]}</h3>
                      <div className="winingsWaitting">
                        <span>{fnsDate.getHours(new Date(fx.date))} : {fnsDate.getMinutes(new Date(fx.date))}</span>
                      </div>
                      <h3>{teamNames[1]}</h3>
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  );
};

export default TeamFixture;
