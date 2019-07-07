const _ = require('lodash');
const request = require('request-promise');
const sourceFile = require('../utils/secretkey.js');
const api_key = sourceFile.API_KEY;
const log = require('../utils/logUtils').createLogger();

exports.getMatch = (gameId) => {
    log.debug(`call on match/v4/matches/${gameId}`);
    return httpRequest(`https://eun1.api.riotgames.com/lol/match/v4/matches/${gameId}`, 'GET');
};
exports.summoner =  (summonerName) => {
    log.debug(`call on summoner/v4/summoners/by-name/${summonerName}`);
    return httpRequest(`https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, 'GET')
};

exports.wait = (milliseconds) => {
    return new Promise(resolve => {
        _.delay(resolve, milliseconds)
    })
};

exports.latest100games = (encryptedAccountId) => {
    log.debug(`call on /match/v4/matchlists/by-account/${encryptedAccountId}`);
    return httpRequest(`https://eun1.api.riotgames.com/lol/match/v4/matchlists/by-account/${encryptedAccountId}`,'GET')
};

async function httpRequest(url, protocol) {
    if (api_key === undefined) {
        log.error('!!!Please Add API KEY to secretkey.js!!!')
    }
    try {
        const result = await request({
            method: protocol,
            uri: url,
            qs: {
                api_key,
            },
            resolveWithFullResponse: true,
            json: true,
        });
        //log.debug("answer: ");
        //log.debug(result);
        return Promise.resolve(result.body);
    } catch (err) {
        //log.error("answer: ");
        //log.error(err);
        return Promise.reject(err)
    }
}

