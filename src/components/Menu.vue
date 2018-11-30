<template>
	<v-container>
		<!-- BIG FOOTER THING -->
		<v-footer class="background darken-1 pa-3" height="auto" inset app>
			<v-layout row wrap>
				<v-toolbar-side-icon @click.stop="drawer = !drawer" large class="hidden-md-and-up"
									 app></v-toolbar-side-icon>
				<v-layout class="hidden-sm-and-down">
					<v-layout v-for="item in menu" justify-center>
						<v-btn large v-bind="{to: item.url}" active-class="primary">
							<v-icon medium>{{item.icon}}</v-icon> <!--{{ $route.path }}-->
							{{item.text}}
						</v-btn>
					</v-layout>
				</v-layout>

				<!--<v-flex primary lighten-1 py-3 text-xs-center xs12> &copy;{{ new Date().getFullYear() }} — <strong>dEF-PI</strong> </v-flex>-->
			</v-layout>
		</v-footer>

		<!-- SIDE MENU -->
		<v-navigation-drawer class="hidden-md-and-up" v-model="drawer" temporary app>
			<v-list v-for="item in menu">
				<v-list-group v-if="(item.sub_items.length > 0)">
					<v-list-tile slot="activator" ripple>
						<v-list-tile-action>
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title>{{ item.text }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>

					<v-list-tile v-for="subItem in item.sub_items" ripple v-bind="{to: subItem.url}">
						<v-list-tile-action>
							<v-icon>{{ subItem.icon }}</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title>{{ subItem.text }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list-group>

				<v-list-tile v-else ripple v-bind="{to: item.url}">
					<v-list-tile-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>{{ item.text }}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
	</v-container>
</template>


<script>
	export default {
		data() {
			return {
				bottomNav: null,
				drawer: false,
				menu: [
					{
						text: "Home",
						icon: "widgets",
						url: "/",
						sub_items: []
					},
					{
						text: "Settings",
						icon: "settings",
						url: "/settings/usersettings",
						sub_items: [
							{
								text: "User Config",
								icon: "account_circle",
								url: "/settings/usersettings",
								sub_items: []
							},
							{
								text: "My Devices",
								icon: "devices",
								url: "/settings/mydevices",
								sub_items: []
							},
							{
								text: "Connection Manager",
								icon: "settings_input_component",
								url: "/settings/connectionmanager",
								sub_items: []
							},
							{
								text: "App Config",
								icon: "settings_applications",
								url: "/settings/appsettings",
								sub_items: []
							},
						]
					},
					{
						text: "App Manager",
						icon: "build",
						url: "/appmanager",
						sub_items: []
					},
					{
						text: "App Store",
						icon: "shop",
						url: "/appstore",
						sub_items: []
					},
					{
						text: "Logout",
						icon: "logout",
						url: "/login",
						sub_items: []
					},
				]
			}
		}
	}
</script>


<style scoped>
	.v-icon {
		margin-left: 10px;
		margin-right: 10px;
	}

	.v-btn {
		height: 100%;
		padding: 10px 20px;
		margin-left: 20px;
		margin-right: 20px;
	}
</style>
