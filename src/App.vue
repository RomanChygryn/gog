<template>
  <div id="app">
    <Home/>
  </div>
</template>

<script>
import Home from './components/views/Home'

export default {
  name: 'app',
  components: {
    Home
  },
  created() {
    this.$store.dispatch('checkLocalStorage')
  }
}
</script>

<style lang="scss">
  @import "scss/main";
</style>
