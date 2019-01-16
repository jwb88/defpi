import Vue          		from 'vue';
import VueRouter    		from 'vue-router';
import VueResource 			from 'vue-resource';
import API					from '../js/api.js';

import App 					from "../App";
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
        background: "#bdbdbd",
    }
});
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.prototype.$API = new API();

Vue.prototype.$MENU = [
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
				text: "My Apps",
				icon: "settings_applications",
				url: "/settings/my_apps",
				sub_items: []
			},
			{
				text: "Connection Manager",
				icon: "settings_input_component",
				url: "/settings/connection_manager",
				sub_items: []
			},
			{
				text: "My Devices",
				icon: "devices",
				url: "/settings/my_devices",
				sub_items: []
			},
			{
				text: "User Config",
				icon: "account_circle",
				url: "/settings/user_settings",
				sub_items: []
			}
		]
	},
	{
		text: "App Store",
		icon: "shop",
		url: "/appstore",
		sub_items: buildSubItems(getAppstoreCategories()),
	},
];


const router = new VueRouter({
    mode: 'hash',
    routes: [
        // dynamic segments start with a colon
		{ path: '*',						component: PageNotFound 	},

		{ path: '/',             			component: Dashboard,		},
        { path: '/dashboard/',             	component: Dashboard,		},
		{ path: '/fullscreen_widget/:id',   component: Dashboard,		},
		{ path: '/appstore',   				component: AppStore,		},
		{ path: '/appstore/category/:cat', 	component: AppStore, 		},
		{ path: '/appstore/app/:id',       	component: AppStore,		},

        { path: '/settings',		redirect: '/settings/my_apps',	component: Settings,
			children: [
				{path:"my_apps", 				component: MyApps				},
				{path:"connection_manager", 	component: ConnectionManager	},
				{path:"my_devices", 			component: MyDevices			},
				{path:"user_settings", 			component: UserSettings 		},
			]
		},
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
