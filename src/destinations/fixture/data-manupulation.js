export const getTeamFixtures = (teamName, data) => {
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
    return Object.values(TeamFixtures)
      .sort((a, b) => b.date.localeCompare(a.date));
  }