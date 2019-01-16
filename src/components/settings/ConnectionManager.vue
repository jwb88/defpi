<template>
	<v-container>
		<v-layout class="hidden-md-and-down" wrap justify-center>
			<v-flex xs4>
				<v-card height="500px">
						<v-flex v-for="(i, index) in list" :key="i.id" ma-3 pa-2>
							<v-list-tile :key="i.id" wrap ripple v-on:click="checklist(i)"  v-bind:class="{ primary: (selected === i.id) }">
								{{ i.id }}
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
									<v-switch align-right v-model="switch1"></v-switch>
								</v-card>
							</v-card>
						</v-flex>
					</v-card>
				</v-flex>
			</v-layout>
			<v-layout class="hidden-lg-and-up">
				<v-flex>
						<v-list v-for="(i, index) in list" :key="i.id">
							<v-list-group>
								<v-list-tile slot="activator" v-on:click="checklist(index)">
									<v-list-tile-title>{{ i.id }}</v-list-tile-title>
								</v-list-tile>
								<v-card>
									<v-card v-for="info in showinfo">
										<v-card v-for="text in info">
											{{ text }}
										<v-switch v-model="switch1"></v-switch>
										</v-card>
									</v-card>
								</v-card>
							</v-list-group>
						</v-list>
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
				api_config: {
					port: 			this.$API.PORT.ORCHESTRATOR,
					contentType: 	this.$API.CONTENT_TYPE.JSON,
					method: 		this.$API.METHOD.GET,
				},
				list: [],
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
				],
				selected: null,
			}
		},
		methods: {
			checklist: function(app) {
				this.selected = app.id;
				this.retrieveList();
				/*this.showinfo = {
					connections: [this.list[app.id].endpoint1.interfaceId, this.list[app.id].endpoint2.interfaceId]
				}*/
			},
			retrieveList: function(){
				this.$API.send(this.api_config, "/connection", [], response => {
					console.log(response);
					this.list = response;
				});
			},
		},
		mounted () {
			this.retrieveList();
		}
	}
</script>
