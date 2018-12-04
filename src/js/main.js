import Vue          		from 'vue';
import VueRouter    		from 'vue-router';

import App 					from "../App";
import Login    			from '../components/LoginForm';
import Dashboard      		from "../components/Dashboard";
import Settings     		from "../components/Settings";
import UserSettings     	from "../components/UserSettings";
import MyDevices     		from "../components/MyDevices";
import ConnectionManager    from "../components/ConnectionManager";
import MyApps     			from "../components/MyApps";
import AppStore     		from "../components/AppStore";
import PageNotFound     	from "../components/404";

import Vuetify      		from 'vuetify';
import 'vuetify/dist/vuetify.min.css';


Vue.use(Vuetify, {
    theme: {
        primary: "#7DB530",
        background: "#CECECE",
    }
});


Vue.use(VueRouter);

const menu = [
	{
		text: "Home",
		icon: "widgets",
		url: "/",
		sub_items: []
	},
	{
		text: "Settings",
		icon: "settings",
		url: "/settings/user_settings",
		sub_items: [
			{
				text: "User Config",
				icon: "account_circle",
				url: "/settings/user_settings",
				sub_items: []
			},
			{
				text: "My Devices",
				icon: "devices",
				url: "/settings/my_devices",
				sub_items: []
			},
			{
				text: "Connection Manager",
				icon: "settings_input_component",
				url: "/settings/connection_manager",
				sub_items: []
			},
			{
				text: "My Apps",
				icon: "settings_applications",
				url: "/settings/my_apps",
				sub_items: []
			},
		]
	},
	{
		text: "App Store",
		icon: "shop",
		url: "/app_store",
		sub_items: []
	},
	{
		text: "Logout",
		icon: "logout",
		url: "/login",
		sub_items: []
	},
];


const router = new VueRouter({
    mode: 'history',
    routes: [
        // dynamic segments start with a colon
		{ path: '*',					component: PageNotFound 	},
		{ path: '/login',             	component: Login,			},

        { path: '/',             		component: Dashboard,		props: { menu }		},
		{ path: '/app_store',            component: AppStore,		props: { menu } 	},

        { path: '/settings',      		component: Settings,		props: { menu }, 	children: [
        	{path:"user_settings", 			component: UserSettings, 		props: {menu}},
        	{path:"my_devices", 			component: MyDevices, 			props: {menu}},
        	{path:"connection_manager", 	component: ConnectionManager, 	props: {menu}},
        	{path:"my_apps", 				component: MyApps, 				props: {menu}},
		]},
    ]
});


new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
