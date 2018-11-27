import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import Dashboard from './Dashboard.vue'


Vue.use(Vuetify, {
  theme: {
    primary: "#3eca33",
    secondary: "#333",
    accent: "#333"
  }
});


new Vue({
  el: '#dashboard',
  render: h => h(Dashboard)
});
