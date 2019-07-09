<template>
  <div id="app">
    <Navigation />
    <img src="./assets/Teamfight_Tactics_Logo.png">
    <FindSummoner />
    <FooterComponent />
  </div>
</template>

<script>

import Navigation from './components/Navigation'
import FindSummoner from './components/FindSummoner'
import FooterComponent from './components/Footer'
import summonerDetail from './components/summonerDetail'

export default {
  name: 'app',
  components: {
    Navigation,
    FindSummoner,
    FooterComponent,
    summonerDetail
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
