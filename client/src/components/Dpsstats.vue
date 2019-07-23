<template>
  <div>
    <img class=logo src="../assets/tftlogo.jpeg">
    <h2>DPS STATS</h2>
      <vue-circle
        :progress="87"
        :size="150"
        :reverse="false"
        line-cap="round"
        :fill="fill"
        empty-fill="rgba(0, 0, 0, .1)"
        :animation-start-value="0.0"
        :start-angle="0"
        insert-mode="append"
        :thickness="5"
        :show-percent="true"
        @vue-circle-progress="progress"
        @vue-circle-end="progress_end">
         <p>Winrate</p>
         
      </vue-circle>
  </div>
</template>

<script>
import summonerStore from '../stores/summonerStore'
import axios from "axios"
 import VueCircle from 'vue2-circle-progress'
  export default {
    components: {
      VueCircle
    },
    data(){
      return{
       // fill : { gradient: ["red", "green", "blue"] },
       fill : { gradient:["yellow"] },
      
      }
    },
    methods:{
      progress(event,progress,stepValue){
        console.log(stepValue);
      },
      progress_end(event){
        console.log("Circle progress end");
      }
    }
  }
</script>
<style scoped>
.logo{
  height: 400px;
  width: auto;
}
</style>

