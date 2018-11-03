<template>
  <div>
    <v-item-group>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex
            v-for="(n, index) in this.licenses"
            :key="index"
            xs12
            md4
          >
            <v-item>
              <v-card
                slot-scope="{ active, toggle }"
                :color="active ? 'primary' : ''"
                class="d-flex align-center"
                dark
                height="200"
                @click.native="toggle"
              > <div>
                 {{n.name}}
                </div>
                <v-scroll-y-transition>
                  <div
                    v-if="active"
                    class="display-3 text-xs-center"
                  >
                    Active
                  </div>
                </v-scroll-y-transition>
              </v-card>
            </v-item>
          <v-btn color="info">View</v-btn>
          <v-btn color="success">Transfer</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-item-group>
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
      licenseLength: null,
      licenses: [],
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
      var result = await thisComponent.$store.state.contractInstance().methods.viewOwnerLicenses(thisComponent.$store.state.web3.coinbase).call()
      thisComponent.licenseLength = result.length
      console.log('LICENSES HERE!')
      for (var i = 0; i < thisComponent.licenseLength; i++) {
        var licenseData = await thisComponent.$store.state.contractInstance().methods.licenses(i).call()
        thisComponent.licenses.push(licenseData)
      }
      console.log(thisComponent.licenses)
    }, 1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
