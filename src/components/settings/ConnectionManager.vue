<template>
	<v-container>
		<!--Desktop Display-->
		<v-layout wrap justify-center>
			<v-icon color="blue" large @click="info = !info">help</v-icon>
			<v-alert class="white" dismissible :value="info" type="info" outline transition="scale-transition">This is the Connection Manager. Here you can manage every connection for each individual app.
			For example, if you do not wish that a certain app is displayed on the dashboard, you can simply turn the connection between that app and the dashboard off with the appropriate switch.</v-alert>
		</v-layout>
		<v-layout class="hidden-md-and-down row ma-4">
			<v-flex xs6>
				<v-card>
					<v-flex v-for="app in processes" :key="app.id">
						<v-list-tile class="pa-2" wrap ripple v-on:click="select(app)"  v-bind:class="{ primary: (selected === app), 'white--text': (selected === app) }">
							{{app.name}}
						</v-list-tile>
					</v-flex>
				</v-card>
			</v-flex>
			<v-flex v-if="selected !== null" xs6>
				<v-card class="mb-1 ml-1" v-for="connection in connections" :key="connection.id" >
					<v-layout class="pr-5">
						<v-flex xs6>
							<v-card-title class="ma-2">
								<v-icon :color="(connection.connected) ? 'primary' : 'red'" style="position: inherit">fiber_manual_record</v-icon>
								{{connection.process.name}}
							</v-card-title>
							<v-card-text>{{connection.endpoints.endpoint1.interfaceId}}</v-card-text>
						</v-flex>
						<v-flex xs6>
							<v-switch class="justify-end" color="primary" :label="(connection.connected) ? 'connected' : 'disconnected'" :input-value="connection.connected" v-on:click="connect_info = connection; dialog = true" :disabled="switch_disabled"></v-switch>
							<v-card-text>{{connection.endpoints.endpoint2.interfaceId}}</v-card-text>
						</v-flex>
					</v-layout>
				</v-card>
			</v-flex>
		</v-layout>


		<!--Mobile Display-->
		<v-layout class="hidden-lg-and-up">
			<v-flex>
				<v-list class="pa-0 v-list--three-line" transition="false">
					<v-list-group v-for="app in processes" :key="app.id" v-on:click="select(app)" prepend-icon="swap_horiz">
						<v-list-tile slot="activator">
								<v-list-tile-title>{{ app.name }}</v-list-tile-title>
						</v-list-tile>
						<v-list-tile class="grey lighten-3" v-for="connection in connections" :key="connection.id">
							<v-list-tile-sub-title class="font-italic subheading">
								<v-icon :color="(connection.connected) ? 'primary' : 'red'" style="position: inherit">fiber_manual_record</v-icon>
								{{connection.process.name}}
							</v-list-tile-sub-title>
							<v-list-tile-action>
								<v-switch class="justify-end" color="primary" :input-value="connection.connected" v-on:click="connect_info = connection; dialog = true" :disabled="switch_disabled"></v-switch>
							</v-list-tile-action>
						</v-list-tile>
					</v-list-group>
				</v-list>
			</v-flex>
		</v-layout>


		<!--Dialog-->
		<v-layout row justify-center>
			<v-dialog v-model="dialog" persistent max-width="340">
				<v-card v-if="connect_info !== null">
					<v-card-title v-if="connect_info.connected" class="headline">Remove the connection?</v-card-title>
					<v-card-title v-else class="headline">Create a connection?</v-card-title>
					<v-card-text>
						Connection between <b>{{selected.name}}</b> and <b>{{connect_info.process.name}}</b>
					</v-card-text>
					<v-card-actions>
						<v-btn large color="grey darken-1" flat @click="dialog = false; select(selected)">Disagree</v-btn>
						<v-spacer></v-spacer>
						<v-btn large color="primary darken-1" flat @click="toggleConnection(connect_info)">Agree</v-btn>
					</v-card-actions>
				</v-card>
				<v-card class="pa-4" v-else>
					<v-layout class="justify-center">
						<v-progress-circular class="justify-center" :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
					</v-layout>
				</v-card>
			</v-dialog>
		</v-layout>
	</v-container>
</template>
<script>
	import { API, Config, PORT, CONTENT_TYPE, METHOD } from "../../js/api.js";

	export default {
		data () {
			return {
				info: false,
				api_config: new Config(PORT.ORCHESTRATOR, CONTENT_TYPE.JSON, METHOD.GET),
				processes: [],
				services: {},
				connections: [],
				selected: null,
				switch_disabled: true,
				dialog: false,
				connect_info: null,
			}
		},
		methods: {
			// Get all services
			getServices: function () {
				API.send(this.api_config, "/service", null, response => {
					console.log(response);
					response.forEach(function (service1) {
						service1["available_connections"] = [];
						service1.interfaces.forEach(function(interface1) {
							response.forEach(function (service2) {
								service2.interfaces.forEach(function(interface2) {
									if(interface1.interfaceVersions[0].sendsHash === interface2.interfaceVersions[0].receivesHash &&
										interface1.interfaceVersions[0].receivesHash === interface2.interfaceVersions[0].sendsHash) {
										service1.available_connections.push({
											service: service2,
											interface1: interface1,
											interface2: interface2,
										});
									}
								}, this);
							}, this);
							this.services[service1.id] = service1;
						}, this);
					}, this);
					this.getProcesses();
				}, null);
			},

			// Get all processes
			getProcesses: function() {
				API.send(this.api_config, "/process", null, response => {
					response.forEach(function(value) {
						// if(value.serviceId !== "dashboard-gateway" && value.serviceId !== "dashboard") {
							this.processes.push(value);
						// }
					}, this);
					this.select(this.processes[0]);
				}, null);
			},

			// Selecting the clicked App
			select: function(app) {
				this.selected = app;

				API.send(this.api_config, "/connection", null, connections => {
					this.connections = [];
					console.log(connections);
					this.services[app.serviceId].available_connections.forEach(function(link) {
						this.processes.forEach(function(process) {
							if(process.serviceId === link.service.id) {
								let connected = false;
								let connectionId = null;
								connections.forEach(function(connection) {
									if(connection.endpoint1.processId === app.id &&
										connection.endpoint2.processId === process.id) {
										connected = true;
										connectionId = connection.id;
									}
								});
								this.connections.push({
									connected: connected,
									connectionId: connectionId,
									endpoints: {
										endpoint1: {
											interfaceId: link.interface1.id,
											processId: app.id,
										},
										endpoint2: {
											interfaceId: link.interface2.id,
											processId: process.id,
										},
									},
									process: process
								});
							}
						}, this);
					}, this);
					this.dialog = false;
					setTimeout(() => {
						this.switch_disabled = false;
					}, 1000);
				}, null);
			},

			// API calls for Adding and Removing Connections
			toggleConnection: function(connection) {
				this.switch_disabled = true;
				this.connect_info = null;
				if(connection.connected) {
					API.send(new Config(PORT.ORCHESTRATOR, CONTENT_TYPE.NONE, METHOD.DELETE), "/connection/" + connection.connectionId, null, response => {
						console.log(response);
						this.select(this.selected);
					}, (error) => {
						this.dialog = false;
					});
				} else {
					API.send(new Config(PORT.ORCHESTRATOR, CONTENT_TYPE.JSON, METHOD.POST), "/connection", JSON.stringify(connection.endpoints), response => {
						console.log(response);
						this.select(this.selected);
					}, (error) => {
						this.dialog = false;
					});
				}
			}
		},
		mounted () {
			this.getServices();
		}
	}
</script>
