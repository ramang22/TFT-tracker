const _ = require('lodash')
const request = require('request-promise')
const sourceFile = require('../secretkey.js')
const api_key = sourceFile.API_KEY

const getMatch = (data) => {
    return request({
        method: 'GET',
        uri: `https://eun1.api.riotgames.com/lol/match/v4/matches/${data.gameId}`,
        qs: {
            api_key,
        },
        json: true,
    })
}

const wait = (milliseconds) => {
    return new Promise(resolve => {
        _.delay(resolve, milliseconds)
    })
}

const latest100games = (summoner) => {
    return request({
        method: 'GET',
        uri: `https://eun1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summoner.accId}`,
        qs: {
            api_key,
        },
        json: true,
    })
}

module.exports = { getMatch, wait, latest100games }
