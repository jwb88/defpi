<template>
	<v-container>
		<v-layout wrap justify-center>
			<v-flex xs4>
				<v-card height="500px">
					<v-flex v-for="i in connections" :key="i.id" ma-3 pa-2>
						<v-list-tile  wrap ripple v-on:click="checklist(i.id)">
							{{ i.serviceId }}
						</v-list-tile>
					</v-flex>
				</v-card>
			</v-flex>
			<v-divider vertical ma-3></v-divider>
			<v-flex v-for="info in showinfo" wrap xs12 sm6>
				<v-card row wrap xs12 sm6 height="500px">
					<v-flex row wrap ma-3 pa-2>
						<v-card >
							<v-card v-for="text in info" xs12 sm6 wrap row>
								{{ text }}
								<v-switch v-model="switch1"></v-switch>
							</v-card>
						</v-card>
					</v-flex>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>
<script>
	export default {
		name: "ConnectionManager",
		props: ["menu"],
		components: {
		},
		data () {
			return {
				applications: ["applicatie-1", "applicatie-2", "applicatie-3"],
				showinfo: {},
				connections: [
					{
						id: 0,
						serviceId: "Miele wasmachine",
						selected: false,
						notifications: ["Rachio Smart Sprinkler", "Tesla Model S","Tesla Model X"]
					},
					{
						id: 1,
						serviceId: "Samsung koelkast",
						selected: false,
						notifications: ["Miele droger", "Roomba 671"]
					},
					{
						id: 2,
						serviceId: "Google Home",
						selected: false,
						notifications: ["Miele washmachine", "Miele droger Z42","Roomba 671","Rachio Smart Sprinkler"],
					},
				]
			}
		},
		methods: {
			checklist: function(id) {

				this.showinfo = {
					connections: this.connections[id].notifications
				};
			}
		}
	}
</script>

