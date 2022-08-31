import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { data } from "../../data";
import {getLeageStats,giveScoreStatus } from "./data-manipulator";



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

    <tr key={`table_row_${props.position}`} className="tableBodyRow">
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
