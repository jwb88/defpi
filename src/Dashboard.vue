<template>
  <v-app>
    <v-toolbar color="primary" app height="100px">
      <v-layout v-for="n in 5" justify-center>
        <v-avatar color="primary lighten-2" @click="" size="80px"></v-avatar>
      </v-layout>
    </v-toolbar>

    <v-navigation-drawer v-if="(windowWidth < mobileMaxWidth)" v-model="drawer" enable-resize-watcher app>
      <v-list v-for="item in menu">
        <v-list-group v-if="(item.sub_items.length > 0)">
          <v-list-tile slot="activator" @click="" ripple>
            <v-list-tile-action> <v-icon>{{ item.icon }}</v-icon> </v-list-tile-action>
            <v-list-tile-content> <v-list-tile-title>{{ item.text }}</v-list-tile-title> </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-for="subItem in item.sub_items" @click="" ripple>
            <v-list-tile-action> <v-icon>{{ subItem.icon }}</v-icon> </v-list-tile-action>
            <v-list-tile-content> <v-list-tile-title>{{ subItem.text }}</v-list-tile-title> </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-list-tile v-else @click="" ripple>
          <v-list-tile-action> <v-icon>{{ item.icon }}</v-icon> </v-list-tile-action>
          <v-list-tile-content> <v-list-tile-title>{{ item.text }}</v-list-tile-title> </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid grid-list-md fill-height>
        <v-layout row wrap align-center>
          <v-flex v-for="n in 8" md3>
            <v-card dark width="300px" height="300px" ripple>
              <v-card-title primary class="title" style="background-color: #333;">Widget {{n}}</v-card-title>
              <v-card-text><i>my content :D</i></v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer height="100px" color="primary lighten-1" app inset>
      <v-layout row wrap>
        <v-toolbar-side-icon v-if="(windowWidth < mobileMaxWidth)" @click.stop="drawer = !drawer" large></v-toolbar-side-icon>

        <v-layout v-if="(windowWidth > mobileMaxWidth)">
          <v-layout justify-left>

            <v-avatar color="primary darken-2" @click=""><v-icon color="white" large>widgets</v-icon></v-avatar>
            <v-btn large><v-icon medium>settings</v-icon> Settings</v-btn>
            <v-btn large><v-icon medium>build</v-icon>  App Manager<v-icon>notifications</v-icon>3</v-btn>
            <v-btn large><v-icon medium>shop</v-icon> Appstore</v-btn>
          </v-layout>

          <v-btn large><v-icon large>logout</v-icon> Logout</v-btn>
        </v-layout>

        <!--<v-flex primary lighten-2 py-3 text-xs-center xs12> &copy;{{ new Date().getFullYear() }} — <strong>dEF-PI</strong> </v-flex>-->
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      pageTitle: 'Dashboard',
      drawer: false,
      menu: [
        { icon: "widgets", text: "Home", sub_items: { } },
        { icon: "settings", text: "Settings", sub_items: [
          { icon: "account_circle", text: "User Settings" },
          { icon: "devices", text: "My Devices" },
          { icon: "settings_input_component", text: "Connection Manager" },
          { icon: "settings_applications", text: "App Settings" },
          ] },
        { icon: "build", text: "App Manager", sub_items: { } },
        { icon: "shop", text: "App Store", sub_items: { } },
        { icon: "logout", text: "Logout", sub_items: { } },
      ],
      windowWidth: window.innerWidth,
      mobileMaxWidth: 800,
    }
  },
  watch: {
    windowWidth(newHeight, oldHeight) {
      this.txt = `it changed to ${newHeight} from ${oldHeight}`;
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth;
      });
    })
  },
}
</script>

<style lang="scss">
</style>
