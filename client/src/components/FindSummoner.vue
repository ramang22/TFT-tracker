<template>
  <div>
    <div v-if="searchPressed === true">
      <div class="flex-container" id="playerNavBar">
        <div>
          <table>
            <tr>
              <td>
                <img class="profilepic" src="../assets/profilepic.png" />
              </td>
              <td>
                <h3>{{summoner.name}}</h3>
                <button>Live Game</button>
              </td>
            </tr>
          </table>
        </div>
        <div></div>
      </div>
      <div class="flex-container">
        <div style="flex-grow: 2" class="info">
          <CircleGraph color="orange" v-bind:winrate="summoner.winrate" size="150" msg="Winrate" />
          <h3>Rank : Master</h3>
          <h3>Wins : {{summoner.win}}</h3>
          <h3>Loses : {{summoner.lose}}</h3>
          <div>
            <table>
             <tr>
               <th colspan="2" >Best Compositions</th>
             </tr>
             <tr>
               <td>Assasins </td>
               <td>70%win</td>
             </tr>
             <tr>
               <td>Kappas </td>
               <td>30%win</td>
             </tr>
            </table>
          </div>
        </div>
        
          
      
        <div style="flex-grow: 8" class="stats">
          <h3>Player Stats</h3>
          <table>
            <tr>
              <th>TOP 1</th>
              <th>TOP 4</th>
              <th>AVG. RANK</th>
            </tr>
            <tr>
              <td>
                <CircleGraph color="orange" winrate="20" size="80" />
              </td>
              <td>
                <CircleGraph color="red" winrate="40" size="80" />
              </td>
              <td>
                <h2>2</h2>
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
        <select>
          <option value="eune">EUNE</option>
          <option value="euw">EUW</option>
          <option value="na">NA</option>
          <option value="kr">KR</option>
        </select>
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
.profilepic {
  height: 80px;
  width: auto;
}
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
h3 {
  margin : 3%;
}
#playerNavBar {
  background-color: gray;
  margin-bottom: 3%;
}
</style>


