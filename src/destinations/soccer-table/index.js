import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const SoccerTable = () => {
  return (
    <div className="soccerTableContainer">
      <div className="mainHead">
        <h2 className="headText">soccer table</h2>
      </div>
      <div className="tableContainer">
        <table>
          <TableHead />
          <TableBody />
        </table>
      </div>
    </div>
  );
};

export default SoccerTable;


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

const TableBody = () => {
  return (
    <tbody>
      <tr className="tableBodyRow">
        <td className="positionNumber">1</td>
        <td>
          <Link className="teamName" to="/home" >Arsenal</Link>
        </td>
        <td>4</td>
        <td>4</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>
          <div className="playedRounds">
            <div className="fixtureLabelRow">
              <FixtureQualificationLabel />
              <span className="qualification">w</span>
            </div>
            <div className="fixtureLabelRow">
              <FixtureQualificationLabel />
              <span className="qualification">w</span>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  )
}

const FixtureQualificationLabel = () => {
  return (
    <div className="fixtureContentLabel">
      <span className="happenedAt">sunday 20 august 2020</span>
      <div className="fixtureInfo">
        <span className="teamPrevName">ARS</span>
        <div className="winings">
          <span>1</span>
          <span className="winingsDivider" />
          <span>2</span>
        </div>
        <span className="teamPrevName">LIV</span>
      </div>
      <div className="rectangularIndicator" />
    </div>
  )
}


