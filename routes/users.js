const _ = require('lodash');
const lolApi = require('../API/riotGamesAPI');

async function routes(fastify) {

    // GET /users/:summonerName

    fastify.get('/:summonerName', async (req, res) => {
        const data = await lolApi.summoner([req.params.summonerName]);

        //store useful data from summoner get

        const summoner = {
            id: data.id,
            accId: data.accountId,
            name: data.name

        };
        // res.send(summoner)
        //get 100 games from match history
        const matchHisotry = await lolApi.latest100games([summoner.accId]);


        const onlyADCgames = matchHisotry.matches.filter(el => el.lane === 'BOTTOM');
        const first20games = _.slice(onlyADCgames, 0, 20);


        // mozno vies toto nejak lepsie zapisat
        let matchArray = [];
        for (let item of first20games) {
            matchArray.push(item.gameId)
        }
        ///////////////////////////////////////

        const matchData = await lolApi.getMatch(matchArray);
        // res.send(matchData);

        let participantID = 0;
        let wins = 0;
        let loses = 0;

        matchData.forEach((match) => {
            match.participantIdentities.forEach((player) => {
                if (player.player.summonerName === summoner.name) {
                    participantID = player.participantId
                }
            });
            match.participants.forEach((player) => {
                if (player.participantId === participantID) {
                    player.stats.win === true ? wins++ : loses++
                }
            })
        });
        let returnStat = {
            win: wins,
            lose: loses,
            winrate: (100 / (wins + loses)) * wins,
            name: summoner.name

        };
        res.send(returnStat)

    })


}


module.exports = routes;
