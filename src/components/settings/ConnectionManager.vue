<template>
	<v-container>
		<v-layout wrap justify-center>
			<v-icon color="blue" large @click="info = !info">help</v-icon>
			<v-alert dismissible :value="info" type="info" outline transition="scale-transition">This is the Connection Manager. Here you can manage every connection for each individual app.
			For example, if you do not wish that a certain app is displayed on the dashboard, you can simply turn the connection between that app and the dashboard off with the appropriate switch.</v-alert>
		</v-layout>
		<v-layout class="hidden-md-and-down row ma-4">
			<v-flex xs6>
				<v-card>
					<v-flex v-for="(app) in list" :key="app.id">
						<v-list-tile wrap ripple v-on:click="selected = app"  v-bind:class="{ primary: (selected === app), 'white--text': (selected === app) }">
							<!--{{ i.endpoint1.interfaceId }}-->
							{{app.name}}
						</v-list-tile>
					</v-flex>
				</v-card>
			</v-flex>
			<v-flex v-if="selected !== null" xs6>
				<v-card class="mb-1 ml-1" v-for="connection in selected.service.interfaces" :key="connection.id" >
					<v-layout class="pr-5">
						<v-flex xs6>
							<v-card-title class="ma-2">{{connection.name}}</v-card-title>
						</v-flex>
						<v-flex xs6>
							<v-switch class="justify-end" v-model="switch1"></v-switch>
						</v-flex>
					</v-layout>
				</v-card>

				<!--<v-card row wrap xs12 sm6 height="500px">-->
					<!--<v-flex row wrap ma-3 pa-2>-->
						<!--<v-card >-->
							<!--<v-card v-for="connection in info" :key="text" xs12 sm6 wrap row>-->
								<!--{{ text }}-->
							<!--</v-card>-->
						<!--</v-card>-->
					<!--</v-flex>-->
				<!--</v-card>-->
			</v-flex>
		</v-layout>


		<!--<v-layout class="hidden-lg-and-up">-->
			<!--<v-flex>-->
				<!--<v-list v-for="(app) in list" :key="app.id">-->
					<!--<v-list-group>-->
						<!--<v-list-tile slot="activator" v-on:click="selected = app">-->
							<!--<v-list-tile-title>{{ app.name }}</v-list-tile-title>-->
						<!--</v-list-tile>-->
						<!--<v-card>-->
							<!--<v-card v-for="connections in selected" :key="connections">-->
								<!--{{connections}}-->
								<!--&lt;!&ndash;<v-card v-for="text in info" :key="text">&ndash;&gt;-->
									<!--&lt;!&ndash;{{ text }}&ndash;&gt;-->
									<!--&lt;!&ndash;<v-switch v-model="switch1"></v-switch>&ndash;&gt;-->
								<!--&lt;!&ndash;</v-card>&ndash;&gt;-->
							<!--</v-card>-->
						<!--</v-card>-->
					<!--</v-list-group>-->
				<!--</v-list>-->
			<!--</v-flex>-->
		<!--</v-layout>-->
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
				// showinfo: {},
				info: false,
				api_config: new Config(PORT.ORCHESTRATOR, CONTENT_TYPE.JSON, METHOD.GET),
				interfaces: [],
				// filteredList: [],
				// connections: [],
				selected: null
			}
		},
		methods: {
			// checklist: function(app,index) {
			// 	this.selected = app.id;
			// 	this.retrieveList();
			// 	this.showinfo = {
			// 		connections: [this.list[index].endpoint2.interfaceId]
			// 	}
			// },
			// filterList: function(){
			// 	this.retrieveList();
			// 	for (let i in this.list) {
			// 		if(this.filteredList.includes(this.list[i])){
			//
			// 		}
			// 		else{
			// 			this.filteredList.connections.push(this.list[i]);
			// 		}
			// 	}
			// },
			// retrieveList: function(){
			// 	API.send(this.api_config, "/connection", [], response => {
			// 		console.log(response);
			// 		this.list = response;
			// 	});
			// },
			getInterfaces: function (services) {
				API.send(this.api_config, "/interface", null, response => {
					response.forEach(function(value) {
						value.sendHash = value.interfaceVersions[0].sendsHash;
						value.receiveHash = value.interfaceVersions[0].receivesHash;
					});

					let send = {};
					let receive = {};
					response.forEach(function(interface1) {
						send[interface1.sendHash] = [];
						receive[interface1.receiveHash] = [];
						response.forEach(function(interface2) {
							if(interface1.sendHash === interface2.receiveHash) {
								send[interface1.sendHash].push(interface2);
							}
							if(interface1.receiveHash === interface2.sendHash) {
								receive[interface1.receiveHash].push(interface2);
							}
						});
					});
					console.log(send);
					console.log(receive);
					this.interfaces = send;
				}, null);
			},
			getServices: function (){
				API.send(this.api_config, "/service", null, response => {
					let services = {};
					response.forEach(function (value) {
						services[value.id] = value;
					}, this);
					this.getInterfaces(services);
				}, null);
			},
			getProcesses: function(services) {
				API.send(this.api_config, "/process", null, response => {
					let processes = [];
					response.forEach(function(value) {
						value["service"] = services[value.serviceId];
						processes.push(value);
					}, this);
					this.getConnections(processes);
				}, null);
			},
			getConnections: function(processes) {
				API.send(this.api_config, "/connection", null, response => {
					console.log(response);
					response.forEach(function(value) {
						// connections[response.endpoint1] = response.endpoint2;
						// value["service"] = services[value.serviceId];
						// processes.push(value);
					}, this);
				}, null);
				this.list = processes;
				this.selected = processes[0];
				console.log(this.list);
			},
		},
		mounted () {
			// this.retrieveList();
			// this.getServices();
			this.getInterfaces();
		}
	}
</script>
