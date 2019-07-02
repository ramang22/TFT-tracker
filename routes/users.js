const request = require('request-promise')
var _ = require('lodash');

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
    let onlyADCgames = [];
    matchHisotry.matches.forEach(function(element) {
        if (element.lane == "BOTTOM"){
            onlyADCgames.push(element);
        }
        
      });

    
    let win = 0;
    let lose = 0;
    let idkev = [2200049983,2199420776,2199393490, 2192825527,2192799195,] 
    const promises = idkev.map((data) => {
        
       return request({
                        method: 'GET',
                        uri: `https://eun1.api.riotgames.com/lol/match/v4/matches/${data}`,
                        qs: {
                            api_key: api_key,
                        },
                        json: true,
                        timeout : 10000,
                        
                    })
                 
      })  
      
    const arrayOfResponses = await Promise.all(promises)
    for(var i in arrayOfResponses){
        let participantID = 0;
        arrayOfResponses[i].participantIdentities.forEach(function(player){
            if (player.player.summonerName === summonerName){
                participantID = player.participantId;
                
            }
           
        });
       
        arrayOfResponses[i].participants.forEach(function(player){
            console.log(player.participantId)
            if (player.participantId === participantID){
                    player.stats.win === true ? win++ : lose++;
            }
        });
    }
    console.log(win + " " + lose);
    res.send(arrayOfResponses[0]);
    
    });
   

};


module.exports = routes;
