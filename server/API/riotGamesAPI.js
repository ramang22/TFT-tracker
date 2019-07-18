const _ = require('lodash')
const sourceFile = require('../utils/secretkey.js')
const api_key = sourceFile.API_KEY
const got = require('got')
const log = require('../utils/logUtils').createLogger()

/**
 *
 * @param url
 * @param array {array}
 */
function parseUrl (url, array) {
    let urls = []
    for (let value of array) {
        urls.push(url + value)
    }
    console.log(urls);
    return urls
}

/**
 *
 * @param urls {array}
 * @return {Promise<*>}
 */
const httpRequest = async function (urls) {
    if (api_key === undefined) {
        log.error('!!!Please Add API KEY to secretkey.js!!!')
    }

    let promises = []
    for (let url of urls) {
        let prom = new Promise((resolve, reject) => {

            log.info(`call on ${url}`)
            try {
                let result = got.get(url, {
                    headers: {
                        'X-Riot-Token': api_key
                    },
                    json: true,
                })
                resolve(result)
            } catch (e) {
                reject(e)
            }
        })
        promises.push(prom)
    }

    let resultTotal = null
    await Promise.all(promises).then((result) => {
        resultTotal = result
        log.info('all CALL OK')

    }).catch((err) => {
        log.error(err.message)
        log.error(err)
        //TODO handle our error like api rate limit
        return err
    })

    if (resultTotal.length === 1) {
        return resultTotal[0].body
    } else {
        let result = []
        for (let item of resultTotal) {
            result.push(item.body)
        }
        return result
    }
}

/**
 *
 * @param gameId {array}
 *
 * @return {Promise<*>}
*/
exports.getMatch = (gameId,server) => {
    let urls = parseUrl('https://'+server+'.api.riotgames.com/lol/match/v4/matches/', gameId)
    return httpRequest(urls)
}

/**
 *
 * @param summonerName {array}
 * @return {Promise<*>}
 */
exports.summoner = (summonerName,server) => {
    let urls = parseUrl('https://'+server+'.api.riotgames.com/lol/summoner/v4/summoners/by-name/', summonerName)
    return httpRequest(urls)
}

/**
 *
 * @param encryptedAccountId {array}
 * @return {Promise<*>}
 */
exports.latest100games = (encryptedAccountId,server) => {
    let urls = parseUrl('https://'+server+'.api.riotgames.com/lol/match/v4/matchlists/by-account/', encryptedAccountId)
    return httpRequest(urls)
}

exports.wait = (milliseconds) => {
    return new Promise(resolve => {
        _.delay(resolve, milliseconds)
    })
}


