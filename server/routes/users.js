const _ = require('lodash')
const lolApi = require('../API/riotGamesAPI')
const handler = require('../Handlers/summonerHanlder')

async function routes(fastify) {

    fastify.get('/:summonerName/:server', async (req, res) => {
        let summonerName = req.params.summonerName
        let server = req.params.server
        let returnStat = await handler.getTfTData(summonerName,server)
        
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "X-Requested-With")
        res.send(returnStat)

    })


}

module.exports = routes
