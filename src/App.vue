<template>
  <div id="app">
     <MoviesPage msg="Rank of Popular movies and the details"/>
  </div>
</template>

<script>
import MoviesPage from './components/MoviesPage.vue'

export default {
  name: 'app',
  components: {
    MoviesPage
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
