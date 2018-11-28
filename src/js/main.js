import Vue          from 'vue'
import Vuetify      from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueRouter    from 'vue-router'

import Dashboard    from '../components/Dashboard'
import Widgets      from "../components/Widgets";
import Settings     from "../components/Settings";
import AppManager   from "../components/AppManager";
import AppStore     from "../components/AppStore";


Vue.use(Vuetify, {
    theme: {
        primary: "#7DB530",
        secondary: "#333",
        accent: "#333",
        background: "#CECECE",
    }
});

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        // dynamic segments start with a colon
        { path: '/widgets',             component: Widgets },
        { path: '/settings/:page',      component: Settings },
        { path: '/appmanager',          component: AppManager },
        { path: '/appstore',            component: AppStore },
    ]
});


new Vue({
    router,
    render: (h) => h(Dashboard),
}).$mount('#dashboard');