const summonerStore = {
  data: {
    summoner: {
    }
  },
  methods: {
    saveSummoner (response) {
      let summoner = {}
      summoner.win = response.data.win
      summoner.lose = response.data.lose
      summoner.winrate = response.data.winrate
      summoner.name = response.data.name
      summoner.tier = response.data.tier.toLowerCase()
      summoner.rank = response.data.rank
      summoner.hotStreak = response.data.hotStreak
      summoner.leaguePoints = response.data.leaguePoints
      summoner.iconId = response.data.iconId

      return summoner
    }
  }
}

export default summonerStore
