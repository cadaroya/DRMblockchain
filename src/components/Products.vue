<template>
  <div>
    <v-item-group>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex v-for="n in this.products" :key="n.id" xs12 md4>
            <v-item>
              <v-card
                slot-scope="{ active, toggle }"
                :color="active ? 'primary' : ''"
                class="d-flex align-center"
                dark
                height="200"
                @click.native="toggle"
              > 
              <div class="text-xs-center">
                 <span class="display-1" text-align="left"> {{n.name}} </span>  <br>
                 <span class="display-6"> Description: {{n.description}} </span><br><br><br>
                 <span class="display-6"> {{n.price}} ETH, {{n.available}} Copies </span>
                  
                  

              </div>
                <v-scroll-y-transition>
                  <div
                    v-if="active"
                    class="display-3 text-xs-center"
                  >
                    ID: {{ n.id}}
                  </div>
                </v-scroll-y-transition>
              </v-card>
            </v-item>
          <v-btn color="success" @click="buyProduct(n.id)">Buy</v-btn>
          <v-btn color="success" @click="verifyLicenseOwnership(n.id)">Verify</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-item-group>
    <v-btn color="info" to="/registerProduct">Register Product</v-btn>
  </div>
</template>

<script>
import Web3 from 'web3'
export default {
  data () {
    return {
      id: null,
      price: null,
      name: null,
      description: null,
      contract: null,
      productLength: null,
      products: [],
      chosen: null
      // available: null,
      // initialSupply: null,
      // interval: null,
      // renewable: null
    }
  },
  methods: {
    async buyProduct (productId) {
      console.log('I am here!')
      console.log('Product ID: ' + productId)
      let web3 = new Web3(window.web3.currentProvider)
      // purchaseLicense(uint256 _productId, uint256 _attributes, uint256 _noOfCycles, address _affiliate, bytes32 _licenseHash, bytes _userSign)
      // License Hash & Client Digisig
      var licenseHash = web3.utils.sha3(this.products[productId].id + this.products[productId].description)
      console.log(this.products[productId].description)
      var userSign = await web3.eth.sign(licenseHash, this.$store.state.web3.coinbase)
      console.log('Signature: ' + userSign)
      var result = await this.$store.state.contractInstance().methods.purchaseLicense(this.products[productId].id, 1, 1, '0x0A333624d64537C2fFd2bd4d1550328B066D9622', licenseHash, userSign).send({from: this.$store.state.web3.coinbase})
      console.log(result)
    }/*,
    async verifyLicenseOwnership (productId) {
      console.log('I am here!')
      console.log('Product ID: ' + productId)
      var result = this.$store.state.contractInstance().methods.verifyLicenseOwnership(this.$store.state.web3.coinbase, productId).send({from: this.$store.state.web3.coinbase})
      console.log(result)
    } */
  },
  mounted () {
    var thisComponent = this
    console.log(thisComponent)
    setTimeout(async function () {
      thisComponent.productLength = await thisComponent.$store.state.contractInstance().methods.getTotalProductCount().call()
      var i = 1
      for (i = 0; i <= thisComponent.productLength; i++) {
        var result = await thisComponent.$store.state.contractInstance().methods.products(i).call()
        console.log(result)
        thisComponent.products.push(result)
        console.log(thisComponent.products[i].description)
      }
    }, 1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
