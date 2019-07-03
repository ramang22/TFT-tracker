const request = require('request-promise')
const _ = require('lodash')
const sourceFile = require('../secretkey.js')
const { getMatch, wait } = require('../API/riotGamesAPI')

const routes = (fastify) => {

    //you must change sourceFile.key to your api key :)
    const api_key = sourceFile.API_KEY

    let summoner = {}
    // GET /users/:summonerName

    fastify.get('/:summonerName', async (req, res) => {
        const data = await request({
            method: 'GET',
            uri: `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.summonerName}`,
            qs: {
                api_key,
            },
            json: true,
        })
    //store useful data from summoner get
    summoner = {
        id: data.id,
        accId: data.accountId,
        name: data.name

    }
    //get 100 games from match history
    const matchHisotry = await request({
        method: 'GET',
        uri: `https://eun1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summoner.accId}`,
        qs: {
            api_key,
        },
        json: true,
    })

    //filter games, save only game where player is playing adc
    // let onlyADCgames = [];
    // matchHisotry.matches.forEach(function(element) {
    //     if (element.lane == "BOTTOM"){
    //         onlyADCgames.push(element);
    //     }

    //   });

    const onlyADCgames = matchHisotry.matches.filter(el => el.lane === 'BOTTOM')


    let win = 0
    let lose = 0


    // var throttled = _.throttle(getMatch, 1000);

    const promises = onlyADCgames.map(async (game, i) => {
        await wait(100 * i)
        return getMatch(game)
    })

    const arrayOfResponses = await Promise.all(promises)
    // for(var i in arrayOfResponses){
    //     let participantID = 0;
    //     arrayOfResponses[i].participantIdentities.forEach(function(player){
    //         if (player.player.summonerName === summonerName){
    //             participantID = player.participantId;

    //         }

    //     });

    //     arrayOfResponses[i].participants.forEach(function(player){
    //         if (player.participantId === participantID){
    //                 player.stats.win === true ? win++ : lose++;
    //         }
    //     });
    // }
    //console.log(win + " " + lose);
   // res.send(arrayOfResponses)

    })


}


module.exports = routes
