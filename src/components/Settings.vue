<template>
	<v-app class="background">
		<v-container fluid>
			<v-navigation-drawer class="primary hidden-sm-and-down enable-resize-watcher" permanent dark app>
				<v-list>
					<v-list-tile v-for="settings in menu[1].sub_items" ripple v-bind="{to: settings.url}" active-class="primary lighten-1" class="v-list--three-line">
						<v-list-tile-action>
							<v-icon large>{{ settings.icon }}</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title class="title">{{ settings.text }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
			</v-navigation-drawer>
			<v-content app>
				<router-view></router-view>
			</v-content>
		</v-container>

		<Menu :menu="menu"></Menu>
	</v-app>
</template>

<script>
	import Menu from './Menu'

    export default {
		props: ["menu"],
		components: {
			Menu
		},
		data() {
			return {
			}
		}
    }
</script>

<style scoped>

</style>
