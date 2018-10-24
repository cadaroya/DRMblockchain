<template>
  <div class="dashboard">
    <products/>
    <!--
    <v-layout>
      <v-flex>
        <div class="white elevation-2">
          <v-toolbar flat dense class="cyan" dark>
            <v-toolbar-title> DRM Blockchain </v-toolbar-title>
          </v-toolbar>
        </div>
      </v-flex>
    </v-layout>
    <h1>{{ msg }}</h1>
     <div v-if="userExists">
      Welcome {{ pseudo }}. Destroy your account by clicking <a href="#" @click="destroyAccount">here</a>.
    </div>
    <div v-else>Sign up <router-link to="/signup">here</router-link>.</div>-->
  </div>
</template>

<script>
import Products from './Products'

export default {
  name: 'dashboard',
  components: {
    Products
  },
  data () {
    return {
      msg: 'Welcome to your truffle-vue dApp'
    }
  },
  computed: {
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  display: block;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
