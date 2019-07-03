const request = require('request-promise')
const _ = require('lodash')
const sourceFile = require('../secretkey.js')
const { getMatch, wait } = require('../API/riotGamesAPI')

async function routes (fastify) {

    //you must change sourceFile.key to your api key :)
    const api_key = sourceFile.API_KEY
    // GET /users/:summonerName

    fastify.get('/:summonerName', async (req, res) => {
        const data = await request({
            method: 'GET',
            uri: `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.summonerName}`,
            qs: {
                api_key,
            },
            json: true,
        })
    //store useful data from summoner get
    const summoner = {
        id: data.id,
        accId: data.accountId,
        name: data.name

    }
    //get 100 games from match history
    const matchHisotry = await request({
        method: 'GET',
        uri: `https://eun1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summoner.accId}`,
        qs: {
            api_key,
        },
        json: true,
    })

    const onlyADCgames = matchHisotry.matches.filter(el => el.lane === 'BOTTOM')
    const first20games = _.slice(onlyADCgames, 0, 20)

    const promises = first20games.map(async (game, i) => {
        await wait(50 * i)
        return getMatch(game)
    })

    const arrayOfResponses = await Promise.all(promises)
    let participantID = 0
    let wins = 0
    let loses = 0

    arrayOfResponses.forEach((match) => {
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
        winrate: (100/(wins+loses))*wins,
        name: summoner.name

    }
    res.send(returnStat)

    })


}


module.exports = routes
