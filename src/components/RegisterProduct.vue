<template>
<v-layout align-center justify-center row fill-height>
    <v-flex xs6>
      <panel title="Product Details">
        <v-text-field
          label="Product Name"
          v-model="product"
        ></v-text-field>
        <br>
        <v-text-field
          label="Etc. Depending on what you need"
          v-model="etc"
        ></v-text-field>
        <br>
        <div class="danger-alert" v-html="error" />
        <br>
        <v-btn
          dark
          class="cyan"
          @click="Register">
          Register
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
