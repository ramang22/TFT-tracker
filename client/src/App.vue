<template>
  <div id="app">
    <Navigation />

    <FindSummoner />
    <FooterComponent />
  </div>
</template>

<script>
//<img src="./assets/Teamfight_Tactics_Logo.png">
import Navigation from './components/Navigation'
import FindSummoner from './components/FindSummoner'
import FooterComponent from './components/Footer'

export default {
  name: 'app',
  components: {
    Navigation,
    FindSummoner,
    FooterComponent
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
