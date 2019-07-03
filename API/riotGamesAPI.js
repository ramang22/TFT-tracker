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

module.exports = { getMatch, wait }
