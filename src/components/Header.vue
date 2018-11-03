<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>
              <span>Menu</span>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <template v-for="(item, index) in items">
          <v-list-tile :to="item.href" :key="index">
            <v-list-tile-action>
              <v-icon light v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="cyan">
      <v-icon v-if=(this.$store.state.userLoggedIn) @click.stop="drawer = !drawer">menu</v-icon>
      <v-toolbar-title>DRM Blockchain</v-toolbar-title>
      <v-spacer> </v-spacer>
      <v-toolbar-items>
        <v-btn v-if=(!this.$store.state.userLoggedIn) to="/signIn" flat dark> Sign In? </v-btn>
        <v-btn flat dark> About </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-fade-transition mode="out-in">
      </v-fade-transition>
    </v-content>
    <v-footer class="cyan" dark app>
      <span>Footer</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  data () {
    return {
      drawer: false,
      items: [{
        href: 'products',
        router: true,
        title: 'Product Store',
        icon: 'home'
      }, {
        href: 'licenses',
        router: true,
        title: 'Manage Licenses',
        icon: 'extension'
      }, {
        href: 'account',
        router: true,
        title: 'Account',
        icon: 'domain'
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
