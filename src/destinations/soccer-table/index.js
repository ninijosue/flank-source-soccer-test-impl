import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { data } from "../../data";


export const getLeageStats = (teamsData) => {
  const teamWithScores = {};
  for (const team of teamsData) {
    const score = team.score;
    const teams = Object.keys(score);
    const firstTeam = teams[0];
    const secondTeam = teams[1];
    const firstTeamScoreStuatus = giveScoreStatus(firstTeam, secondTeam, score);
    const secondTeamScoreStuatus = giveScoreStatus(secondTeam, firstTeam, score);

    const dataManupilation = (status, currTeam) => {
      if (status) currTeam.playedGame += 1
      switch (status) {
        case "won":
          currTeam.won += 1;
          currTeam.points += 3;
          break;
        case "draw":
          currTeam.points += 1;
          currTeam.draw += 1;
          break
        case "loss":
          currTeam.loss += 1;
        default:
          break;
      }
    }

    if (teamWithScores[firstTeam])
      dataManupilation(firstTeamScoreStuatus, teamWithScores[firstTeam])
    else {
      teamWithScores[firstTeam] = {}
      teamWithScores[firstTeam].name = firstTeam;
      teamWithScores[firstTeam].won = 0;
      teamWithScores[firstTeam].draw = 0;
      teamWithScores[firstTeam].loss = 0;
      teamWithScores[firstTeam].points = 0;
      teamWithScores[firstTeam].playedGame = 0;
      teamWithScores[firstTeam].fixtures = [];
      if (firstTeamScoreStuatus)
        dataManupilation(firstTeamScoreStuatus, teamWithScores[firstTeam]);
    }

    if (teamWithScores[secondTeam])
      dataManupilation(secondTeamScoreStuatus, teamWithScores[secondTeam])
    else {
      teamWithScores[secondTeam] = {};
      teamWithScores[secondTeam].name = secondTeam;
      teamWithScores[secondTeam].won = 0;
      teamWithScores[secondTeam].draw = 0;
      teamWithScores[secondTeam].loss = 0;
      teamWithScores[secondTeam].points = 0;
      teamWithScores[secondTeam].playedGame = 0;
      teamWithScores[secondTeam].fixtures = [];
      if (secondTeamScoreStuatus)
        dataManupilation(secondTeamScoreStuatus, teamWithScores[secondTeam]);
    }

    teamWithScores[firstTeam].fixtures.push(team);
    teamWithScores[secondTeam].fixtures.push(team);
  }
  return Object.values(teamWithScores)
    .sort((a, b) => b.points - a.points);
}

const giveScoreStatus = (team, teamAgainst, score) => {
  let status = null;
  if (score[team]) {
    if (score[team] > score[teamAgainst]) status = "won";
    if (score[team] < score[teamAgainst]) status = "loss";
    if (score[team] === score[teamAgainst]) status = "draw";
  }
  return status;
}

const SoccerTable = () => {
  const [dataTable, setDataTable] = React.useState([]);

  React.useEffect(() => {
    const arrangedData = getLeageStats(data);
    setDataTable(arrangedData);
  }, []);

  return (
    <div className="soccerTableContainer">
      <div className="mainHead">
        <h2 className="headText">soccer table</h2>
      </div>
      <div className="tableContainer">
        <table>
          <TableHead />
          <tbody>
            {dataTable.map((dt, index) =>
              <TableBodyTr key={`row_${index}`}
                position={index + 1} rowData={dt} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};



const TableHead = () => {
  return (
    <thead>
      <tr className="tableHeadRow">
        <th>Position</th>
        <th>Club</th>
        <th>Played</th>
        <th>Won</th>
        <th>Drwan</th>
        <th>Lost</th>
        <th>Points</th>
        <th>Form</th>
      </tr>
    </thead>
  )
}

const TableBodyTr = (props) => {
  const teamData = props.rowData;
  return (

    <tr className="tableBodyRow">
      <td className="positionNumber">{props.position}</td>
      <td>
        <Link className="teamName" to={`/fixture/${teamData.name}`} >{teamData.name}</Link>
      </td>
      <td>{teamData.playedGame}</td>
      <td>{teamData.won}</td>
      <td>{teamData.draw}</td>
      <td>{teamData.loss}</td>
      <td>{teamData.points}</td>
      <td>
        <div className="playedRounds">
          {
            teamData.fixtures.map((fx, fxIndex) => {
              let teamAgainst = "";
              const allTeamNames = Object.keys(fx.score)
              const currTeamNameIndex = allTeamNames.indexOf(teamData.name);
              if (currTeamNameIndex === 0) teamAgainst = allTeamNames[1];
              else teamAgainst = allTeamNames[0];
              const fxStatus = giveScoreStatus(teamData.name, teamAgainst, fx.score)
              if (!fxStatus) return <></>;
              const currClassIdentifier = fxStatus === "loss"
                ? "gameLoss"
                : fxStatus === "draw"
                  ? "gameDrawn"
                  : ""
              return (
                <div key={`fx_${fxIndex}`} className="fixtureLabelRow">
                  <FixtureQualificationLabel fixture={fx} teams={allTeamNames} />
                  <span className={`qualification ${currClassIdentifier}`}>{fxStatus[0]}</span>
                </div>
              )
            })
          }
        </div>
      </td>
    </tr>
  )
}

const FixtureQualificationLabel = (props) => {
  const fixtureInfo = props.fixture;
  const teams = props.teams;
  return (
    <div className="fixtureContentLabel">
      <span className="happenedAt">{new Date(fixtureInfo).toTimeString()}</span>
      <div className="fixtureInfo">
        <span className="teamPrevName">{teams[0]}</span>
        <div className="winings">
          <span>{fixtureInfo.score[teams[0]]}</span>
          <span className="winingsDivider" />
          <span>{fixtureInfo.score[teams[1]]}</span>
        </div>
        <span className="teamPrevName">{teams[1]}</span>
      </div>
      <div className="rectangularIndicator" />
    </div>
  )
}


export default SoccerTable;
