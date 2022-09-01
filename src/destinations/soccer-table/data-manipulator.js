export const getLeageStats = (teamsData) => {
  const teamWithScores = {};
  for (const team of teamsData) {
    const score = team.score;
    const teams = Object.keys(score);
    const firstTeam = teams[0];
    const secondTeam = teams[1];
    const firstTeamScoreStuatus = giveScoreStatus(firstTeam, secondTeam, score);
    const secondTeamScoreStuatus = giveScoreStatus(secondTeam, firstTeam, score);

    // team data calculation
    const dataManupilation = (status, currTeam) => {
      const currentTeamIndex = teams.indexOf(currTeam.name);
      const indexOfAgainstTeam = currentTeamIndex === 0 ? 1 : 0;
      if (status) currTeam.playedGame += 1;
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
      currTeam.goalsDifference += (score[teams[currentTeamIndex]] - score[teams[indexOfAgainstTeam]] )
    }

    if (teamWithScores[firstTeam])
      dataManupilation(firstTeamScoreStuatus, teamWithScores[firstTeam])
    else {
      // first team data initialization
      teamWithScores[firstTeam] = {}
      teamWithScores[firstTeam].name = firstTeam;
      teamWithScores[firstTeam].won = 0;
      teamWithScores[firstTeam].draw = 0;
      teamWithScores[firstTeam].loss = 0;
      teamWithScores[firstTeam].points = 0;
      teamWithScores[firstTeam].goalsDifference = 0;
      teamWithScores[firstTeam].playedGame = 0;
      teamWithScores[firstTeam].fixtures = [];
      if (firstTeamScoreStuatus)
        dataManupilation(firstTeamScoreStuatus, teamWithScores[firstTeam]);
    }

    if (teamWithScores[secondTeam])
      dataManupilation(secondTeamScoreStuatus, teamWithScores[secondTeam])
    else {
      // second team data initialization
      teamWithScores[secondTeam] = {};
      teamWithScores[secondTeam].name = secondTeam;
      teamWithScores[secondTeam].won = 0;
      teamWithScores[secondTeam].draw = 0;
      teamWithScores[secondTeam].loss = 0;
      teamWithScores[secondTeam].points = 0;
      teamWithScores[secondTeam].goalsDifference = 0;
      teamWithScores[secondTeam].playedGame = 0;
      teamWithScores[secondTeam].fixtures = [];
      if (secondTeamScoreStuatus)
        dataManupilation(secondTeamScoreStuatus, teamWithScores[secondTeam]);
    }

    teamWithScores[firstTeam].fixtures.push(team);
    teamWithScores[secondTeam].fixtures.push(team);
  }
  const response =  Object.values(teamWithScores)
    .sort((a, b) => b.points - a.points);
    return response;
}


export const giveScoreStatus = (team, teamAgainst, score) => {
  let status = null;
  if (score[team]) {
    if (score[team] > score[teamAgainst]) status = "won";
    if (score[team] < score[teamAgainst]) status = "loss";
    if (score[team] === score[teamAgainst]) status = "draw";
  }
  return status;
}
