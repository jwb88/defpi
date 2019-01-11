<template>
	<v-app class="background">
		<v-container fluid>
			<!--Settings Header-->
			<v-toolbar color="primary" class="v-toolbar--fixed" height="70px" app>
				<v-layout class="text-xs-center">
					<v-flex>
						<h1 class="primary title primary--text text--lighten-3 pa-1">{{ header_titles[$route.path] }}</h1>
					</v-flex>
				</v-layout>
			</v-toolbar>

			<!--Navigation Drawer-->
			<v-navigation-drawer class="hidden-sm-and-down elevation-5 v-navigation-drawer--fixed" style="z-index: 0;" dark app>
				<v-list class="pa-0">
					<v-list-tile style="height: 70px"></v-list-tile>
					<v-list-tile v-for="settings in menu[1].sub_items" :key="settings.url" ripple v-bind="{to: settings.url}" active-class="grey darken-4" class="v-list--three-line">
						<v-list-tile-action>
							<v-icon large>{{ settings.icon }}</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title class="title">{{ settings.text }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
			</v-navigation-drawer>

			<!--Settings Content-->
			<v-content app>
				<router-view></router-view>
			</v-content>
		</v-container>

		<!--Main Navigation Menu-->
		<Menu></Menu>
	</v-app>
</template>

<script>
	import Menu from './Menu'

    export default {
		components: {
			Menu
		},
		data() {
			return {
				menu: this.$MENU,
				header_titles: {
					"/settings/user_settings": 		"User Config",
					"/settings/my_devices": 		"My Devices",
					"/settings/connection_manager": "Connection Manager",
					"/settings/my_apps": 			"My Apps",
				}
			}
		}
    }
</script>

<style scoped>

</style>
