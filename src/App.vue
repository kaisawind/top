<template>
  <div id="app">
    <div class="container">
      <Top />
      <Header />
      <Main />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Top from './components/Top.vue'
import Main from './components/Main.vue'

export default {
  name: 'App',
  components: {
    Header,
    Top,
    Main
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
}
</style>
