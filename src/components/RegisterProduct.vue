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
import Web3 from 'web3'

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
    async register () {
      console.log('You have clicked the register product button!')
      let web3 = new Web3(window.web3.currentProvider)
      // (uint256 _id, uint256 _price, uint256 _available, uint256 _initialSupply, uint256 _interval, string _name, string _description, bool _renewable, bytes32 _productHash, bytes _vendorSign)
      var productHash = web3.utils.sha3(this.id + this.price + this.name + this.description)
      console.log(productHash)
      console.log(web3.eth.coinbase)
      console.log(this.$store.state.web3.coinbase)
      var userSign = await web3.eth.sign(productHash, this.$store.state.web3.coinbase)
      console.log('<><><')
      console.log(userSign)
      console.log(',.,')
      this.$store.state.contractInstance().methods.registerProduct(this.id, this.price, '100', '100', '10000', this.name, this.description, '1', productHash, userSign).send({
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
