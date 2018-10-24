<template>
  <div>
    <v-item-group>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex
            v-for="n in 6"
            :key="n"
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
              >
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
