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
						<v-list-tile wrap ripple @click="checklist(i)">
							{{ i.serviceId }}
						</v-list-tile>
						</v-flex>
					</v-card>
				</v-flex>
				<v-divider vertical ma-3></v-divider>
				<v-flex wrap xs12 sm6>
					<v-card row wrap xs12 sm6 height="500px">
							<v-flex row wrap v-for="i in connections" :key="i.id" ma-3 pa-2>
								<v-card>
									<v-card xs12 sm6 wrap row>
										Test
										{{ connections[0].selected }}
										{{ i.notifications }}
										<v-switch v-model="switch1"></v-switch>
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
						serviceId: "Miele wasmachine",
						selected: false,
						notifications: ["Er is een update beschikbaar.", "Dit is een update"]
					},
					{
						id: 1,
						serviceId: "Smart Energy",
						selected: false,
						notifications: ["Er is een update .", "Dit is een "]
					},
					{
						id: 2,
						serviceId: "Vue Power",
						selected: false,
						notifications: ["Er is een .", "Dit is ate"],
					},
				]
			}
	},
		methods: {
			checklist: function(i) {

			}
		}
		}
</script>

