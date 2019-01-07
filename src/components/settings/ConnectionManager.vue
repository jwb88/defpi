<template>
	<v-app class="background">
		<v-container>
			<v-toolbar color="primary" app height="70px">
					<v-layout class="text-xs-center">
						<v-flex>
							<h1 class="primary--text text--lighten-1 pa-1">Connection Manager</h1>
						</v-flex>
					</v-layout>
				</v-toolbar>
			<v-layout wrap justify-center>
				<v-flex xs4>
					<v-card height="500px">
						<v-flex v-for="i in connections" ma-3 pa-2>
						<v-list-tile wrap ripple @click="i.selected = true">
							{{ i.serviceId }}
						</v-list-tile>
						</v-flex>
					</v-card>
				</v-flex>
				<v-divider vertical></v-divider>
				<v-flex xs12 sm6>
					<v-card row wrap xs12 sm6 height="500px">
							<v-flex v-for="i in connections" ma-3 pa-2>
								<v-card>
									<v-card v-if= "i.selected = true">
											Test
										{{ connections[0].selected }}
										{{ i.notifications }}
									</v-card>
								</v-card>
							</v-flex>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</v-app>
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
				connections: [
					{
						id: 0,
						serviceId: "Miele wasmachine P039",
						icon_url: "http://www.bruggink-bv.nl/wp-content/uploads/2015/09/miele-logo-1.png",
						locations: "Cloud",
						ip_address: "192.168.1.15",
						notifications: ["Er is een update beschikbaar.", "Dit is een update"],
						selected: false
					},
					{
						id: 1,
						serviceId: "Smart Energy",
						icon_url: "https://www.davehewer.com/wp-content/uploads/2018/02/greenleaf-logo-branding03.png",
						locations: "Raspberry Pi - 1",
						ip_address: "192.168.1.16",
						notifications: ["Er is een update .", "Dit is een "],
						selected: false
					},
					{
						id: 2,
						serviceId: "Vue Power",
						icon_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Vue.js_Logo.svg/400px-Vue.js_Logo.svg.png",
						locations: "Cloud",
						ip_address: "192.168.1.17",
						notifications: ["Er is een .", "Dit is ate"],
						selected: false
					},
				]
			}
	},
		methods: {
			checklist: function() {
				;
			}
		}
		}
</script>

