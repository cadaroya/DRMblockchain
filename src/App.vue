<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">
    <page-header />
    <router-view></router-view>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'
export default {
  name: 'app',
  components: {
    PageHeader
  },
  mounted () {
    console.log('registerWeb3 Action dispatched from app.vue!!')
    this.$store.dispatch('registerWeb3')
    console.log('dispatching getContractInstance')
    this.$store.dispatch('getContractInstance')
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
