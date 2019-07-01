const request = require('request-promise')

async function routes (fastify, options) {

    
    var sourceFile = require('../secretkey.js');
    //you must change sourceFile.key to your api key :) 
    let api_key = sourceFile.key;
    var summonerName = 'Ramang';
    let summoner = new Object();
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
    //store useful data from summoner get
    summoner = {
        id : data.id,
        accId : data.accountId,
        name : data.name
    
    }
    //get 100 games from match history 
    const matchHisotry = await request({
        method: 'GET',
        uri: `https://eun1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summoner.accId}`,
        qs: {
            api_key: api_key,
        },
        json: true,
    })

    //filter games, save only game where player is playing adc
    let onlyADCgames = new Array();
    matchHisotry.matches.forEach(function(element) {
        if (element.lane == "BOTTOM"){
            onlyADCgames.push(element);
        }
        
      });

    
    let win = 0;
    let lose = 0;
    let promises = [];
    onlyADCgames.forEach(function(element){
        promises.push(countWinsInGame(element.gameId,summoner.name));
    });
     
    //res.send(matchHisotry);
    
    });
   

};


module.exports = routes;

let countWinsInGame = function(gameID, summonerName){
    return new Promise(function (resolve, reject){
        const match = await request({
            method: 'GET',
            uri: `https://eun1.api.riotgames.com/lol/match/v4/matches/${gameID}`,
            qs: {
                api_key: api_key,
            },
            json: true,
        })
        resolve(Console.log("ok"));
        reject(Console.log("not ok"));
        // let participantID = 0;
        // match.participantIdentities.forEach(function(player){
        //     if (player.summonerName == summonerName){
        //         participantID = player.participantId;
        //         break;
        //     }
        // });
        // match.participants.forEach(function(participant){
        //     if(participant.participantId == participantID){
        //         if (participant.stats == true) {
        //             win++;
        //         }else {
        //             lose++;
        //         }
        //     }
        // });
    });
    
}