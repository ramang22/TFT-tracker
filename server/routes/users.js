const _ = require('lodash')
const lolApi = require('../API/riotGamesAPI')

async function routes(fastify) {

    fastify.get('/:summonerName/:server', async (req, res) => {
        console.log(req.params.server);
        const data = await lolApi.summoner([req.params.summonerName], req.params.server)
        const summoner = {
            id: data.id,
            accId: data.accountId,
            name: data.name
        }

        const matchHisotry = await lolApi.latest100games([summoner.accId], req.params.server)
        const onlyADCgames = matchHisotry.matches.filter(el => el.lane === 'BOTTOM')
        const first20games = _.slice(onlyADCgames, 0, 20)
        let matchArray = []
        for (let item of first20games) {
            matchArray.push(item.gameId)
        }
        const matchData = await lolApi.getMatch(matchArray, req.params.server)
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
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "X-Requested-With")
        res.send(returnStat)

    })


}

module.exports = routes
