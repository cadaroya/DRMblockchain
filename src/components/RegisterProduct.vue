<template>
<v-layout align-center justify-center row fill-height>
    <v-flex xs6>
        <v-text-field label="ID No." v-model="id"></v-text-field>
        <br>
        <v-text-field label="Price" v-model="price"></v-text-field>
        <br>
        <v-text-field label="Product Name" v-model="name"></v-text-field>
        <br>
        <v-text-field label="Etc. Depending on what you need" v-model="description"></v-text-field>
        <br>
        
        <br>
        <v-btn
          dark
          class="cyan"
          @click="register">
          Register
        </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  data () {
    return {
      id: null,
      price: null,
      name: null,
      description: null
      // available: null,
      // initialSupply: null,
      // interval: null,
      // renewable: null
    }
  },
  methods: {
    register () {
      console.log('You have clicked the register product button!')
      this.$store.state.contractInstance().methods.registerProduct(this.id, this.price, '100', '100', '10000', this.name, this.description, '1').send({
        from: this.$store.state.web3.coinbase}, (error, result) => {
        if (!error) {
          console.log(result)
        } else {
          console.log(error)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
