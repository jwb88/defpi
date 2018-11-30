import Vue          	from 'vue'
import VueRouter    	from 'vue-router'

import App 				from "../App";
import Login    		from '../components/LoginForm'
import Dashboard      	from "../components/Dashboard";
import Settings     	from "../components/Settings";
import AppManager   	from "../components/AppManager";
import AppStore     	from "../components/AppStore";
import PageNotFound     from "../components/404";

import Vuetify      	from 'vuetify'
import 'vuetify/dist/vuetify.min.css'


Vue.use(Vuetify, {
    theme: {
        primary: "#7DB530",
        background: "#CECECE",
    }
});

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        // dynamic segments start with a colon
        { path: '/',             		component: Dashboard 	},
        { path: '/login',             	component: Login 		},
        { path: '/settings/:page',      component: Settings 	},
        { path: '/appmanager',          component: AppManager 	},
        { path: '/appstore',            component: AppStore 	},
		{ path: '*',					component: PageNotFound },
    ]
});


new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
