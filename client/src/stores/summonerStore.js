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
      return summoner
    }
  }
}

export default summonerStore
