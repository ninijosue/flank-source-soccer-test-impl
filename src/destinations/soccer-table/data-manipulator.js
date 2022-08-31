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


export const giveScoreStatus = (team, teamAgainst, score) => {
    let status = null;
    if (score[team]) {
      if (score[team] > score[teamAgainst]) status = "won";
      if (score[team] < score[teamAgainst]) status = "loss";
      if (score[team] === score[teamAgainst]) status = "draw";
    }
    return status;
  }
  