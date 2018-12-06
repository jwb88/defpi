<template>
	<v-app class="background">
		<v-toolbar height="100px" class="v-toolbar--fixed primary" app>
			<v-text-field class="fill-height align-end" placeholder="Search.."></v-text-field>
		</v-toolbar>

		<v-content>
			<v-container v-if="$route.params.id == null" grid-list-xs fluid>
				<v-layout row wrap>
					<v-flex v-for="widget in widgets" :key="widget.id" xs12 sm6 md4 lg4>
						<v-layout align-center justify-center>
							<v-card class="elevation-4 ma-4" style="min-width: 300px;">
								<v-card-title class="primary darken-1 title primary--text text--lighten-1 pa-1" color="primary"><v-icon color="primary lighten-1" large>battery_charging_full</v-icon>{{widget.title}}</v-card-title>
								<v-card-text class="subheading" style="width:300px; height: 170px;">{{widget.doc}}</v-card-text>
							</v-card>
						</v-layout>
					</v-flex>
				</v-layout>
			</v-container>
		</v-content>

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
				widgets: [
					{
						id:	0,
						title: "Battery",
						doc: "Install this beautiful battery app!"
					},
					{
						id:	1,
						title: "Battery",
						doc: "Install this beautiful battery app!"
					},
					{
						id:	2,
						title: "Battery",
						doc: "Install this beautiful battery app!"
					},
					{
						id:	3,
						title: "Battery",
						doc: "Install this beautiful battery app!"
					},
					{
						id:	4,
						title: "Battery",
						doc: "Install this beautiful battery app!"
					},
					{
						id:	5,
						title: "Battery",
						doc: "Install this beautiful battery app!"
					},
					{
						id:	6,
						title: "Battery",
						doc: "Install this beautiful battery app!"
					},
					{
						id:	7,
						title: "Battery",
						doc: "Install this beautiful battery app!"
					},
					{
						id:	8,
						title: "Battery",
						doc: "Install this beautiful battery app!"
					},
					{
						id:	9,
						title: "Battery",
						doc: "Install this beautiful battery app!"
					},
					{
						id:	10,
						title: "Battery",
						doc: "Install this beautiful battery app!"
					},
					{
						id:	11,
						title: "Battery",
						doc: "Install this beautiful battery app!"
					},
				]
			}
		}
    }
</script>

<style scoped>

</style>
