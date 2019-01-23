<template>
	<v-container>
		<v-layout class="justify-end">
			<v-btn fab slot="activator" v-on:click="dialog = true"><v-icon large>notification_important</v-icon></v-btn>
		</v-layout>
		<!--All Notifications Dialog-->
		<v-dialog v-model="dialog" width="800" lazy>
			<v-card>
				<v-card-title class="headline grey lighten-2" primary-title>
					Notifications
				</v-card-title>
				<v-card-text v-for="app in apps" :key="app.id">
					<v-list two-line>
						<v-list-tile v-on:click="open_dialog(app)" @click="dialog = false; active_tab = 1">
							<v-list-tile-avatar>
								<img :src="app.icon_url" alt="">
							</v-list-tile-avatar>
							<v-list-tile-content>
								<v-list-tile-title>{{ app.serviceId }}</v-list-tile-title>
								<v-list-tile-sub-title>{{ app.id }}</v-list-tile-sub-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn class="primary" @click="dialog = false">Mark as read</v-btn>
					<v-btn color="primary" @click="dialog = false">Ok</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!--App Dialog-->
		<v-dialog v-if="selectedApp !== null" v-model="app_dialog" width="800" lazy>
			<v-toolbar color="primary">
				<v-toolbar-side-icon @click="close_dialog()"><v-icon>navigate_before</v-icon></v-toolbar-side-icon>
				<v-layout class="text-xs-center">
					<v-flex>
						<h1 class="primary title white--text text--lighten-3 pa-1">{{ selectedApp.serviceId }}</h1>
					</v-flex>
				</v-layout>
			</v-toolbar>
			<v-tabs v-model="active_tab" show arrows grow>
				<v-tab v-for="tab of tabs" :key="tab.id">{{ tab.name }}</v-tab>
				<v-tab-item>
					<v-card>
						<v-layout justify-center class="row" wrap>
							<v-flex class="xs5">
								<v-container fluid grid-list-md>
									<v-container v-for="(param, i) in selectedApp.service.parameters">
										{{param.name}}
										<v-text-field :value="param.default" :type="settingsForms[param.type]"></v-text-field>
									</v-container>
									<!--{{selectedApp.service.parameters}}-->
									<br>
									<!--<v-card-text center><h4>IP-address</h4></v-card-text>-->
									<!--<v-text-field align-center v-bind:label="selectedApp.ip_address" :rules="ipRules" placeholder="192.168.2.1"></v-text-field>-->
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn class="primary" @click="selectedApp.dialog = false">Save</v-btn>
									</v-card-actions>
								</v-container>
							</v-flex>
							<v-divider vertical></v-divider>
							<v-flex class="xs5">
								<v-container fluid grid-list-md>
									<h4>Location</h4>
									<v-select label="Location" :items="nodeOptions" item-text="hostname" v-model="selectedApp.node"></v-select>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn class="primary" @click="uninstall(selectedApp)">Uninstall <v-icon>delete</v-icon></v-btn>
										<v-btn class="primary" @click="close_dialog()">Update <v-icon>play_for_work</v-icon></v-btn>
									</v-card-actions>
								</v-container>
							</v-flex>
						</v-layout>
					</v-card>
				</v-tab-item>
				<v-tab-item>
					<v-card>
						<v-card-title class="headline grey lighten-2" primary-title>
							Notifications
						</v-card-title>
						<v-card-text>
							<v-data-table :headers="notification_headers" :items="selectedApp.notifications" class="elevation-1" hide-actions>
								<template slot="items" slot-scope="props">
									<td>{{ props.item.notification }}</td>
									<td>{{ props.item.importance }}</td>
								</template>
							</v-data-table>
						</v-card-text>

						<v-divider></v-divider>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn class="primary" @click="close_dialog()">Mark as read</v-btn>
							<v-btn color="primary" @click="close_dialog()">Ok</v-btn>
						</v-card-actions>
					</v-card>
				</v-tab-item>
			</v-tabs>
		</v-dialog>

		<!--App Table-->
		<v-container>
			<v-data-table :headers="headers" :items="apps" class="elevation-1" hide-actions>
				<template slot="items" slot-scope="props">
					<td class="pa-4">
						<v-avatar v-if="props.item.service.iconURL != null" class="primary lighten-3" v-bind:style="{backgroundImage: 'url(' + props.item.service.iconURL + ')', backgroundSize: 'contain', backgroundPosition: 'center'}"></v-avatar>
						<v-avatar v-else class="primary lighten-3 font-weight-bold">{{ getInitials(props.item.serviceId) }}</v-avatar>
					</td>
					<td class="title pa-4">{{ props.item.name }}</td>
					<td class="pa-4">{{ props.item.serviceId }}</td>
					<td class="pa-4">{{ props.item.node.hostname}}</td>
					<td class="pa-4">{{ props.item.state}}</td>
					<td><v-icon @click="open_dialog(props.item)">edit</v-icon></td>
				</template>
			</v-data-table>
		</v-container>

		<!-- Load bar -->
		<div class="text-xs-center">
			<v-dialog v-model="loading" hide-overlay persistent width="300">
				<v-card class="primary" dark >
					<v-card-text>
						Loading widgets..
						<v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
					</v-card-text>
				</v-card>
			</v-dialog>
		</div>
	</v-container>
</template>

<script>
	import { API, Config, PORT, CONTENT_TYPE, METHOD } from "../../js/api.js";

	export default {
		data() {
			return {
				loading: true,
				headers: [
					{sortable: false},
					{text: "Name", value: "name"},
					{text: "Service", value: "service.name"},
					{text: "Host", value: "node.hostname"},
					{text: "State", value: "state"},
				],
				notification_headers: [
					{text: "Notification", value: "notification"},
					{text: "Importance", value: "importance"},
				],
				settingsForms: {
					"integer": "number",
					"double": "number",
					"string": "text",
				},
				app_dialog: false,
				dialog: false,
				nodeOptions: [],
				services: [],
				privateNodes: [],
				apps: [],
				active_tab: 0,
				tabs: [{ id: 1, name: 'Settings'},{ id: 2, name: 'Notifications'}],
				api_config: new Config(PORT.ORCHESTRATOR, CONTENT_TYPE.JSON, METHOD.GET),
				api_delete: new Config(PORT.ORCHESTRATOR, CONTENT_TYPE.NONE, METHOD.DELETE),
				selectedApp: null,
				ipRules: [
					v => /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(v) || 'IP address must be valid'
				]
			}
		},
		methods: {
			/* API Methods */
			getPrivateNodes: function() {
				API.send(this.api_config, "/privatenode", null, response => {
					let temp = [];
					response.forEach(function (value) {
						temp[value.id] = value;
						this.nodeOptions.push(value);
					}, this);
					this.privateNodes = temp;
					console.log(this.privateNodes);
					this.getServices();
				});
			},
			getServices: function (){
				API.send(this.api_config, "/service", {}, response => {
					response.forEach(function (value, i) {
						this.services[value.id] = value;
					}, this);
					console.log("services: ");
					console.log(this.services);
					this.updateAppList();
				});
			},
			updateAppList: function () {
				this.apps = [];
				API.send(this.api_config, "/process", null, response => {
					console.log(response);
					let temp = [];
					response.forEach(function (value) {
						if(value.serviceId !== "dashboard-gateway" && value.serviceId !== "dashboard") {
							console.log(this.privateNodes);
							value["node"] = this.privateNodes[value.runningNodeId];
							value["service"] = this.services[value.serviceId];
							value["notifications"] = [
								{notification: "hello", importance: "Warning"},
								{notification: "update", importance: "Warning"},
							];
							temp.push(value);
						}
					}, this);
					this.apps = temp;
					this.loading = false;
				});
			},
			uninstall: function (app) {
				API.send(this.api_delete, "/process/" + app.id, [], response => {
					console.log(response);
					this.updateAppList();
				});
			},


			/* Dialog Methods */
			open_dialog: function(app) {
				this.selectedApp = app;
				this.app_dialog = true;
			},
			close_dialog: function() {
				this.selectedApp = {};
				this.app_dialog = false;
			},



			getInitials: function(name) {
				if(name === "") {
					let initials = name.match(/\b(\w)/g);
					return initials.join('');
				} else { return ""; }
			}
		},
		mounted () {
			this.getPrivateNodes();
		}
	}
</script>
