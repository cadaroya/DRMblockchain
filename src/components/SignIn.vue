<template>
<v-layout align-center justify-center row fill-height>
    <v-flex xs6>
      <panel title="Product Details" text-align="justify">
        <h3> You only need a browser to view cards and cards details. However, you will need MetaMask to buy, lease and sell cards. MetaMask is a browser ( Chrome and Firefox) plugin that bridge the Ethereum blockchain and is the easiest way to interact with Smart Contract. </h3>
        <br>
        <h3>This plugin provides a wallet where you can send some Ether (Ξ) in order to execute operations. This plugin is your only login access to buy, transfer, and manage Ownerships. </h3>
        <br>
        <h3>The following video gives an introduction and a setup guide for MetaMask : </h3>
        <div class="ui segment basic center aligned">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/6Gf_kRE4MJU?rel=0" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  mounted: function () {
    console.log('I also loaded twice. Sadly')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
