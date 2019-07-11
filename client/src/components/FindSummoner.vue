<template>
  <div>
    <img class=logo src="../assets/tftlogo.jpeg">
    <div v-if="searchPressed === true">
      <h3>Summoner : {{summoner.name}}</h3>
      <h3>Win rate : {{summoner.winrate}}%</h3>
      <h3>Wins : {{summoner.win}}</h3>
      <h3>Loses : {{summoner.lose}}</h3>
    </div>
    <div v-else>
      <input v-model="inputSummoner" v-on:keyup.13="findSummoner(inputSummoner)" />
      <button v-on:click="findSummoner(inputSummoner)">Find Summoner</button>
    </div>
  </div>
</template>

<script>
import summonerStore from '../stores/summonerStore'
import axios from "axios"
export default {
  data() {
    return {
      searchPressed: false,
      summoner: {}
    };
  },
  methods: {
    async findSummoner(name) {
      const response = await axios.get("http://localhost:3000/users/" + name);
      this.summoner = summonerStore.methods.saveSummoner(response);
      this.searchPressed = true;
    }
  }
};
</script>
<style scoped>
.logo{
  height: 400px;
  width: auto;
}
</style>

