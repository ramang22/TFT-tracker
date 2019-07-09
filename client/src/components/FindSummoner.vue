<template>
<div>
  <div v-if="searchPressed === true">
        <h3>Summoner : {{summoner.name}}</h3>
        <h3>Win rate : {{summoner.winrate}}%</h3>
        <h3>Wins : {{summoner.win}}</h3>
        <h3>Loses : {{summoner.lose}}</h3>
  </div>
  <div v-else>
    <input v-model="inputSummoner" v-on:keyup.13="findSummoner(inputSummoner)"/>
    <button v-on:click=findSummoner(inputSummoner)>Find Summoner</button>
  </div>
</div>


</template>

<script>
import summonerStore from "../stores/summonerStore"

import axios from 'axios'
export default {
 data() {
   return {
     searchPressed: false,
     summoner : summonerStore.data.summoner
   };
 },
 methods: {
    async findSummoner(name) {
      console.log(name)
    await axios.get('http://localhost:3000/users/'+name)
      .then(function (response) {
        console.log(response)
        summonerStore.data.summoner.win = response.data.win
        summonerStore.data.summoner.lose = response.data.lose
        summonerStore.data.summoner.winrate = response.data.winrate
        summonerStore.data.summoner.name = response.data.name


      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {

      });
    this.summoner = summonerStore.data.summoner

    this.searchPressed = true

    }
  }
}
</script>

<style scoped>

</style>

