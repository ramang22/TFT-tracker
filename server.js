//imports
const fastify = require('fastify')();

//routers
//fastify.register(require('./routes/users'), { prefix: '/users' });
fastify.register(require('./routes/users'), { prefix: 'https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name' });
//fastify.register(require('./routes/users'), { prefix: '/lol/summoner/v4/summoners/by-name' });


//listener
fastify.listen(3000, function (err, address) {
    if (err) {
        console.log(err);
        process.exit(1);
    } else {
        console.log('Server is up and running on port 3000...');
    }
});
