async function routes (fastify, options) {


    var api_key = 'RGAPI-5939e5cf-f4d5-4848-bb90-6dd2ca21e1b7';
    var summonerName = 'Ramang';
    // GET /users/:id

    fastify.get('/'+summonerName+'?api_key='+api_key, async (req, res) => {
      var data = await getData()
      var processed = await processData(data)
    });

};

module.exports = routes;
