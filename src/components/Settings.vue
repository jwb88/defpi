<template>
	<v-app class="background">
		<v-container fluid>
			<!--Navigation Drawer-->
			<v-navigation-drawer class="primary darken-1 hidden-sm-and-down elevation-5" fixed dark app>
				<v-list class="pa-0">
					<v-list-tile v-for="settings in menu[1].sub_items" :key="settings.url" ripple v-bind="{to: settings.url}" active-class="primary" class="v-list--three-line">
						<v-list-tile-action>
							<v-icon large>{{ settings.icon }}</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title class="title">{{ settings.text }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
			</v-navigation-drawer>

			<!--Settings Header-->
			<v-layout>
				<v-flex xs12>
					<v-container>
						<v-toolbar color="primary" class="v-toolbar--fixed" app height="70px">
							<v-layout class="text-xs-center">
								<v-flex>
									<h1 class="primary title primary--text text--lighten-3 pa-1">My apps</h1>
								</v-flex>
							</v-layout>
						</v-toolbar>
					</v-container>
				</v-flex>
			</v-layout>

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
				menu: this.$MENU
			}
		}
    }
</script>

<style scoped>

</style>
