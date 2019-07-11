<template>
  <div id="app">

    <Navigation />
    <router-view></router-view>
    <FooterComponent />

  </div>
</template>

<script>

import Navigation from './components/Navigation'
import FooterComponent from './components/Footer'

export default {
  name: 'app',
  components: {
    Navigation,
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
