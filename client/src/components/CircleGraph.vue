<template>
  <div>
    <vue-circle
      :progress="winrate"
      :size="size"
      :reverse="false"
      line-cap="round"
      :fill="fill"
      empty-fill="rgba(0, 0, 0, .1)"
      :animation-start-value="0.0"
      :start-angle="0"
      insert-mode="append"
      :thickness="5"
      :show-percent="true"
    >
      <div v-if="this.msg != null ">
        <p>{{msg}}</p>
      </div>
    </vue-circle>
  </div>
</template>

<script>
import summonerStore from "../stores/summonerStore";
import axios from "axios";
import VueCircle from "vue2-circle-progress";
export default {
  //https://dev-notes.eu/2018/05/passing-data-between-vue-components/
  props: {
    winrate: String,
    color: String,
    msg: String,
    size: String
  },
  components: {
    VueCircle
  },
  data() {
    return {
      fill: { gradient: [this.color] }
    };
  },
  methods: {
  }
};
</script>
<style scoped>
</style>

