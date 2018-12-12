import Vue          		from 'vue';
import VueRouter    		from 'vue-router';
import API					from './api'

import App 					from "../App";
import Login    			from '../components/LoginForm';
import Dashboard      		from "../components/Dashboard";
import Settings     		from "../components/Settings";
import UserSettings     	from "../components/settings/UserSettings";
import MyDevices     		from "../components/settings/MyDevices";
import ConnectionManager    from "../components/settings/ConnectionManager";
import MyApps     			from "../components/settings/MyApps";
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
		url: "/settings",
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
		url: "/appstore",
		sub_items: buildSubItems(getAppstoreCategories()),
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
		{ path: '*',						component: PageNotFound 	},
		{ path: '/login',             		component: Login,			},

        { path: '/',             			component: Dashboard,		props: { menu, API }		},
		{ path: '/fullscreen_widget/:id',   component: Dashboard,		props: { menu }		},
		{ path: '/appstore',   				component: AppStore,		props: { menu }		},
		{ path: '/appstore/category/:cat', 	component: AppStore,		props: { menu } 	},
		{ path: '/appstore/app/:id',       	component: AppStore,		props: { menu } 	},

        { path: '/settings',		redirect: '/settings/user_settings',      		component: Settings,		props: { menu }, 	children: [
        	{path:"user_settings", 			component: UserSettings, 		props: { menu }		},
        	{path:"my_devices", 			component: MyDevices, 			props: { menu }		},
        	{path:"connection_manager", 	component: ConnectionManager, 	props: { menu }		},
        	{path:"my_apps", 				component: MyApps, 				props: { menu }		},
		]},
    ]
});

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');

function getAppstoreCategories() {
	return ['All', 'Category_One', 'Category_Two', 'Category_Three', 'Category_Four'];
}

function buildSubItems(subList) {
	let subItems = [];
	// Make sure we only create the list if there's actually any subItems
	if( subList.length < 1 )
		return subItems;

	subList.forEach(function (value, key) {
		let subItem = [];
		// Add all necessary data
		subItem.text = value;
		subItem.icon = '';
		subItem.url = '/appstore/category/' + value;
		subItem.sub_items = [];

		// Add item to list
		subItems.push(subItem)
	});

	// Return our created subItem list
	return subItems;
}
