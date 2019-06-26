const request = require('request-promise')

async function routes (fastify, options) {

    
    var sourceFile = require('../secretkey.js');
    //you must change sourceFile.key to your api key :) 
    let api_key = sourceFile.key;
    var summonerName = 'Ramang';
    // GET /users/:summonerName

    fastify.get('/:summonerName', async (req, res) => {
        const data = await request({
            method: 'GET',
            uri: `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.summonerName}`,
            qs: {
                api_key: api_key,
            },
            json: true,
        })
    res.send(data);
    });

};


module.exports = routes;
