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
          </v-flex>
        </v-layout>
      </v-container>
    </v-item-group>
    <v-btn color="info" to="/registerProduct">Register Product</v-btn>
  </div>
</template>

<script>

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
    },
    async buyProduct (productId) {
      console.log('I am here!')
      console.log('Product ID: ' + productId)
      var result = await this.$store.state.contractInstance().methods.purchaseLicense(productId, 1, 1, '0x0A333624d64537C2fFd2bd4d1550328B066D9622').send({from: this.$store.state.web3.coinbase})
      console.log(result)
    }
  },
  mounted () {
    var thisComponent = this
    console.log(thisComponent)
    setTimeout(async function () {
      thisComponent.productLength = await thisComponent.$store.state.contractInstance().methods.getTotalProductCount().call()
      var i = 1
      for (i = 1; i <= thisComponent.productLength; i++) {
        var result = await thisComponent.$store.state.contractInstance().methods.products(i).call()
        console.log(result)
        thisComponent.products.push(result)
        console.log(thisComponent.products[0].description)
      }
    }, 1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
