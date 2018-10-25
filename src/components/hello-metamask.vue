<template>
  <v-container grid-list-xl>
    <v-layout v-bind="binding">
      <v-flex>
        <v-card dark color="primary">
          <v-card-text>Metamask: {{ web3.isInjected }}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex>
        <v-card dark color="secondary">
          <v-card-text>Network: {{ web3.networkId }}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex>
        <v-card dark color="accent">
          <v-card-text>Account: {{ web3.coinbase }}</v-card-text>
        </v-card>
      </v-flex>
      <v-flex>
        <v-card dark color="accent">
          <v-card-text>Balance: {{ web3.balance }}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'hello-metamask',
  computed: {
    web3 () {
      return this.$store.state.web3
    }
  }
}
</script>

<style scoped></style>