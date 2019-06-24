const request = require('request-promise')

async function routes (fastify, options) {


    var api_key = 'RGAPI-5939e5cf-f4d5-4848-bb90-6dd2ca21e1b7';
    var summonerName = 'Ramang';
    // GET /users/:id

    fastify.get('/:summonerName', async (req, res) => {
        const data = await request({
            method: 'GET',
            uri: `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.summonerName}`,
            qs: {
                api_key: 'RGAPI-5939e5cf-f4d5-4848-bb90-6dd2ca21e1b7'
            },
            json: true,
        })
     // var processed = await processData(data)
    res.send(data);
    });

};


module.exports = routes;
