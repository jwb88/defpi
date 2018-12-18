<template>
	<v-app class="background">
		<v-container fluid>
			<v-navigation-drawer class="primary darken-1 hidden-sm-and-down" fixed dark app>
				<v-list>
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
			<v-content app>
				<router-view></router-view>
			</v-content>
		</v-container>

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
