<template>
	<v-container>
		<v-layout class="hidden-md-and-down" wrap justify-center>
			<v-flex xs4>
				<v-card height="500px">
					<v-flex v-for="(i, index) in list" :key="i.id" ma-3 pa-2>
						<v-list-tile :key="i.id" wrap ripple v-on:click="checklist(i,index)"  v-bind:class="{ primary: (selected === i.id) }">
							{{ i.endpoint1.interfaceId }}
						</v-list-tile>
					</v-flex>
				</v-card>
			</v-flex>
			<v-divider vertical ma-3></v-divider>
			<v-flex v-for="info in showinfo" :key="info" wrap xs12 sm6>
				<v-card row wrap xs12 sm6 height="500px">
					<v-flex row wrap ma-3 pa-2>
						<v-card >
							<v-card v-for="text in info" :key="text" xs12 sm6 wrap row>
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
						<v-list-tile slot="activator" v-on:click="checklist(i,index)">
							<v-list-tile-title>{{ i.id }}</v-list-tile-title>
						</v-list-tile>
						<v-card>
							<v-card v-for="info in showinfo" :key="info">
								<v-card v-for="text in info" :key="text">
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
	import { API, Config, PORT, CONTENT_TYPE, METHOD } from "../../js/api.js";

	export default {
		name: "ConnectionManager",
		props: ["menu"],
		components: {
		},
		data () {
			return {
				showinfo: {},
				api_config: new Config(PORT.ORCHESTRATOR, CONTENT_TYPE.JSON, METHOD.GET),
				list: [],
				connections: [],
				selected: null
			}
		},
		methods: {
			checklist: function(app,index) {
				this.selected = app.id;
				this.retrieveList();
				this.showinfo = {
					connections: [this.list[index].endpoint2.interfaceId]
				}
			},
			retrieveList: function(){
				API.send(this.api_config, "/connection", [], response => {
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
