const _ = require('lodash')
const lolApi = require('../API/riotGamesAPI')

async function getLatest20adcGames (summonerName,server) {
    const data = await lolApi.summoner([summonerName], server)
        const summoner = {
            id: data.id,
            accId: data.accountId,
            name: data.name
        }

        const matchHisotry = await lolApi.latest100games([summoner.accId], server)
        const onlyADCgames = matchHisotry.matches.filter(el => el.lane === 'BOTTOM')
        const first20games = _.slice(onlyADCgames, 0, 20)
        let matchArray = []
        for (let item of first20games) {
            matchArray.push(item.gameId)
        }
        const matchData = await lolApi.getMatch(matchArray, server)
        let participantID = 0
        let wins = 0
        let loses = 0
        matchData.forEach((match) => {
            match.participantIdentities.forEach((player) => {
                if (player.player.summonerName === summoner.name) {
                    participantID = player.participantId
                }
            })
            match.participants.forEach((player) => {
                if (player.participantId === participantID) {
                    player.stats.win === true ? wins++ : loses++
                }
            })
        })
        let returnStat = {
            win: wins,
            lose: loses,
            winrate: (100 / (wins + loses)) * wins,
            name: summoner.name

        }
        return returnStat
}

async function getTfTData (summonerName,server) {
    const data = await lolApi.summoner([summonerName], server)
    const summoner = {
        id: data.id,
        accId: data.accountId,
        name: data.name,
        icon: data.profileIconId
    }    
    const allLeagues = await lolApi.getAllLeagueEntries([summoner.id],server)
    const tftLeague = allLeagues.filter(league => league.queueType === "RANKED_TFT")
    let returnStat = {
        tier : tftLeague[0].tier,
        rank : tftLeague[0].rank,
        win: tftLeague[0].wins,
        lose: tftLeague[0].losses,
        winrate: (100 / (tftLeague[0].wins + tftLeague[0].losses)) * tftLeague[0].wins,
        hotStreak : tftLeague[0].hotStreak,
        name: tftLeague[0].summonerName,
        leaguePoints: tftLeague[0].leaguePoints,
        iconId: summoner.icon
    }
    return returnStat;

}

module.exports.getTfTData = getTfTData;