import React from "react";
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
        <td>1</td>
        <td>Arsenal</td>
        <td>4</td>
        <td>4</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>
          <div className="playedRounds">
            <span>w</span>
            <span>w</span>
            <span>w</span>
          </div>
        </td>
      </tr>
    </tbody>
  )
}


