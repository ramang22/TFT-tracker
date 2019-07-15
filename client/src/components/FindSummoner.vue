<template>
  <div>
    <div v-if="searchPressed === true">
      <div class="flex-container">
        <div style="flex-grow: 2" class="info">
          <h3>Summoner : {{summoner.name}}</h3>
          <CircleGraph color="orange" v-bind:winrate="summoner.winrate" size="150" />
          <h3>Wins : {{summoner.win}}</h3>
          <h3>Loses : {{summoner.lose}}</h3>
        </div>
        <div style="flex-grow: 8" class="stats">
          <h3>Player Stats</h3>
          <table>
            <tr>
              <th>TOP 1</th>
              <th>TOP 3</th>
              <th>LOSE</th>
            </tr>
            <tr>
              <td>
                <CircleGraph color="orange" winrate="20" size="80" />
              </td>
              <td>
                <CircleGraph color="red" winrate="40" size="80" />
              </td>
              <td>
                <CircleGraph color="red" winrate="60" size="80" />
              </td>
            </tr>
          </table>
          <h2>Match history</h2>
        </div>
      </div>
    </div>

    <div v-else>
      <img class="logo" src="../assets/tftlogo.jpeg" />
      <div>
        <input v-model="inputSummoner" v-on:keyup.13="findSummoner(inputSummoner)" />
        <button v-on:click="findSummoner(inputSummoner)">Find Summoner</button>
      </div>
    </div>
  </div>
</template>

<script>
import summonerStore from "../stores/summonerStore";
import CircleGraph from "../components/CircleGraph";
import axios from "axios";
import VueCircle from "vue2-circle-progress";
export default {
  data() {
    return {
      searchPressed: false,
      summoner: {},
      fill: { gradient: ["yellow", "red", "orange"] }
    };
  },
  components: {
    VueCircle,
    CircleGraph
  },

  methods: {
    async findSummoner(name) {
      const response = await axios.get("http://localhost:3000/users/" + name);
      this.summoner = summonerStore.methods.saveSummoner(response);
      this.searchPressed = true;
    },
    progress(event, progress, stepValue) {
      console.log(stepValue);
    },
    progress_end(event) {
      console.log("Circle progress end");
    }
  }
};
</script>
<style scoped>
.logo {
  height: 200px;
  width: auto;
}
.flex-container {
  display: flex;
  align-items: stretch;
}
table {
  width: 100%;
}
</style>

