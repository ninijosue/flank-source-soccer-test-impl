import React from "react";
import { Link, useParams } from "react-router-dom";
import "./style.css";
import { data } from "../../data";

const getTeamFixture = (teamName, setFixtures) => {
  const TeamFixtures = {};

  for (const fixture of data) {
    const teams = Object.keys(fixture.score);
    if (teams.includes(teamName)) {
      if (TeamFixtures[fixture.date])
        TeamFixtures[fixture.date].fixture.push(fixture);
      else TeamFixtures[fixture.date] = {
        fixture: [fixture],
        date: fixture.date
      }
    }
  }
  setFixtures(Object.values(TeamFixtures)
    .sort((a, b) => b.date.localeCompare(a.date)));
}

const TeamFixture = (props) => {
  const { team } = useParams();
  const [fixtures, setFixtures] = React.useState([])
  React.useEffect(() => getTeamFixture(team, setFixtures), []);

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
              <h2 className="fixtureTitle">{new Date(fx.date).toLocaleString()}</h2>
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
                        <span>12 : 20</span>
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
