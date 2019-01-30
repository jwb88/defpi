<template>
	<v-container class="pa-0">
		<!--All Notifications Bell-->
		<v-layout class="justify-end">
			<v-btn small fab slot="activator" v-on:click="dialog = true"><v-icon large>notification_important</v-icon></v-btn>
		</v-layout>

		<!--All Notifications Dialog-->
		<v-dialog v-model="dialog" scrollable width="800" lazy>
			<v-card>
				<v-card-title class="headline grey lighten-2" primary-title>
					Notifications
				</v-card-title>
					<v-card-text>
						<v-list two-line v-for="app in apps" :key="app.id">
							<v-list-tile v-on:click="open_dialog(app)" @click="dialog = false; active_tab = 2">
								<v-list-tile-avatar>
									<img :src="app.icon_url" alt="">
								</v-list-tile-avatar>
								<v-list-tile-content>
									<v-list-tile-title>{{ app.process.name }}</v-list-tile-title>
									<v-list-tile-sub-title v-for="(notification) in app.notifications" :key="notification.id">
										[{{ notification.importance }}] {{ notification.notification }}
									</v-list-tile-sub-title>
								</v-list-tile-content>
							</v-list-tile>
						</v-list>
					</v-card-text>
				<v-divider></v-divider>
				<v-card-actions app>
					<v-spacer></v-spacer>
					<v-btn class="primary" @click="dialog = false">Mark as read</v-btn>
					<v-btn color="primary" @click="dialog = false">Ok</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!--App Dialog-->
		<v-dialog v-if="selectedApp !== null" v-model="app_dialog" :fullscreen="$vuetify.breakpoint.mdAndDown" max-width="800" persistent lazy>
			<v-card>
				<!--Dialog Header-->
				<v-card-title class="primary hidden-md-and-down" relative>
					<span v-if="selectedApp" class="headline">{{ selectedApp.process.name }}</span>
					<v-btn class="background" absolute dark small fab right v-on:click="close_dialog()">
						<v-icon> close </v-icon>
					</v-btn>
				</v-card-title>
				<v-card-title class="primary hidden-lg-and-up text-xs-center justify-center" relative>
					<span v-if="selectedApp" class="headline">{{ selectedApp.process.name }}</span>
					<v-btn absolute large flat icon fab left v-on:click="close_dialog()">
						<v-icon> arrow_back </v-icon>
					</v-btn>
				</v-card-title>

				<!--Tabs-->
				<v-tabs v-model="active_tab" show arrows grow>
					<v-tab class="primary white--text" v-for="tab of tabs" :key="tab.id" active-class="white black--text">{{ tab.name }}</v-tab>

					<!--Global Settings Tab-->
					<v-tab-item>
						<v-container>
							<v-text-field v-model="selectedApp.process.name" label="Name" required></v-text-field>
							<v-select label="Location" :items="nodeOptions" item-text="name" v-model="selectedApp.node"></v-select>
							<v-card-actions class="justify-end">
								<v-btn class="primary" @click="saveSettings()">Save</v-btn>
							</v-card-actions>

							<v-card-actions class="justify-end">
								<v-btn class="primary" @click="confirmDelete = true">Uninstall <v-icon>delete</v-icon></v-btn>
								<v-btn class="primary" @click="close_dialog()">Update <v-icon>play_for_work</v-icon></v-btn>
							</v-card-actions>
						</v-container>
					</v-tab-item>

					<!--Settings Tab-->
					<v-tab-item v-if="selectedApp !== null">
						<v-container v-for="(param) in selectedApp.service.parameters" :key="param.id">
							{{param.name}}
							<v-text-field v-model="param.default" :type="settingsForms[param.type]"></v-text-field>
						</v-container>
						<v-card-actions v-if="selectedApp.service.parameters !== null" class="justify-end">
							<v-btn class="primary" @click="saveSettings()">Save</v-btn>
						</v-card-actions>
						<v-container v-else>This app does not have any settings to change..</v-container>
					</v-tab-item>

					<!--Notifications Tab-->
					<v-tab-item>
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
					</v-tab-item>
				</v-tabs>
			</v-card>
		</v-dialog>

		<!--App Table-->
		<v-container class="fluid pa-0">
			<v-data-table :headers="($vuetify.breakpoint.mdAndUp) ? headers : headers_mobile" :items="apps" class="elevation-1" hide-actions>
				<template slot="items" slot-scope="props">
					<td class="pa-4">
						<v-avatar v-if="props.item.service.iconURL != null" class="primary lighten-3" v-bind:style="{backgroundImage: 'url(' + props.item.service.iconURL + ')', backgroundSize: 'contain', backgroundPosition: 'center'}"></v-avatar>
						<v-avatar v-else class="primary lighten-3 font-weight-bold">{{ getInitials(props.item.service.name) }}</v-avatar>
					</td>
					<td class="subheading pa-4">{{ minifyName(props.item.process.name) }}</td>
					<td class="pa-4" v-if="$vuetify.breakpoint.mdAndUp">{{ props.item.process.serviceId }}</td>
					<td class="pa-4" v-if="$vuetify.breakpoint.mdAndUp">{{ props.item.node.name}}</td>
					<td class="pa-4" v-if="$vuetify.breakpoint.mdAndUp">{{ props.item.process.state}}</td>
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

		<v-layout row justify-center>
			<v-dialog v-model="confirmDelete" persistent max-width="340">
				<v-card v-if="selectedApp !== null">
					<v-card-title class="headline">Uninstall the app?</v-card-title>
					<v-card-text>
						Are you sure you wish to uninstall the {{ selectedApp.name }} app?
					</v-card-text>
					<v-card-actions>
						<v-btn large color="grey darken-1" flat @click="confirmDelete = false">Disagree</v-btn>
						<v-spacer></v-spacer>
						<v-btn large color="primary darken-1" flat @click="uninstall(selectedApp)">Agree</v-btn>
					</v-card-actions>
				</v-card>
				<v-card class="pa-4" v-else>
					<v-layout class="justify-center">
						<v-progress-circular class="justify-center" :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
					</v-layout>
				</v-card>
			</v-dialog>
		</v-layout>

		<!-- App Removed-->
		<div class="text-xs-center">
			<v-dialog v-model="appRemoved" persistent width="300" >
				<v-card dark >
					<v-card-text>
						Your app has been uninstalled!
						<v-btn class="primary" v-on:click="appRemoved = false; confirmDelete = false;">Ok</v-btn>
					</v-card-text>
				</v-card>
			</v-dialog>
		</div>

		<!-- App Updated-->
		<div class="text-xs-center">
			<v-dialog v-model="appUpdated" persistent width="300" >
				<v-card dark >
					<v-card-text>
						Your app has been updated!
						<v-btn class="primary" v-on:click="appUpdated = false">Ok</v-btn>
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
					{text: "Name", value: "process.name"},
					{text: "Service", value: "service.name"},
					{text: "Host", value: "node.hostname"},
					{text: "State", value: "process.state"},
					{sortable: false}
				],
				headers_mobile: [
					{sortable: false},
					{text: "Name", value: "process.name"},
					{sortable: false}
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
				nodePools:[],
				apps: [],
				appRemoved: false,
				confirmDelete: false,
				appUpdated: false,
				active_tab: 0,
				tabs: [{ id: 1, name: "Global Settings"},{ id: 2, name: "Settings"}, {id:3, name: "Notifications"}],
				api_config: new Config(PORT.ORCHESTRATOR, CONTENT_TYPE.JSON, METHOD.GET),
				api_delete: new Config(PORT.ORCHESTRATOR, CONTENT_TYPE.NONE, METHOD.DELETE),
				selectedApp: null,
				ipRules: [
					v => /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(v) || 'IP address must be valid'
				],
			}
		},
		methods: {
			/* API Methods */
			getNodes: function() {
				API.send(this.api_config, "/nodepool", null, response => {
					let temp = [];
					response.forEach(function (value) {
						value.isNodePool = true;
						temp[value.id] = value;
						this.nodeOptions.push(value);
					}, this);
					this.nodePools = temp;
					console.log(this.nodePools);
				}, null);

				API.send(this.api_config, "/privatenode" + '?_filters={"userId":"' + window.localStorage.getItem('defpi_userId') + '"}', null, response => {
					let temp = [];
					response.forEach(function (value) {
						temp[value.id] = value;
						this.nodeOptions.push(value);
					}, this);
					this.privateNodes = temp;
					console.log(this.privateNodes);
					this.getServices();
				}, null);
			},
			getServices: function (){
				API.send(this.api_config, "/service", null, response => {
					response.forEach(function (value, i) {
						this.services[value.id] = value;
					}, this);
					console.log("services: ");
					console.log(this.services);
					this.updateAppList();
				}, null);
			},
			updateAppList: function () {
				this.apps = [];
				API.send(this.api_config, "/process" + '?_filters={"userId":"' + window.localStorage.getItem('defpi_userId') + '"}', null, response => {
					console.log(response);
					let temp = [];
					response.forEach(function (value) {
						if(value.serviceId !== "dashboard-gateway" && value.serviceId !== "dashboard") {
							console.log(this.privateNodes);

							let collection = {
								"process": 	value,
								"node": 	(value.nodePoolId !== null ? this.nodePools[value.nodePoolId] : this.privateNodes[value.privateNodeId]),//this.privateNodes[value.runningNodeId],
								"service": 	this.services[value.serviceId],
								"notifications": [
									{notification: "hello", importance: "Warning"},
									{notification: "update", importance: "Warning"},
								],
							};
							temp.push(collection);
						}
					}, this);
					this.apps = temp;
					this.loading = false;
				}, null);
			},
			uninstall: function (app) {
				API.send(this.api_delete, "/process/" + app.process.id, [], response => {
					this.appRemoved = true;
					console.log(response);
					this.updateAppList();
				}, null);
			},
			saveSettings: function() {
				let data = this.selectedApp.process;
				data.configuration = [];
				if(this.selectedApp.service.parameters !== null) {
					this.selectedApp.service.parameters.forEach(function(param) {
						data.configuration.push({
							key: param.id,
							value: param.default
						});
					});
				}

				console.log(this.appName);
				API.send(new Config(PORT.ORCHESTRATOR, CONTENT_TYPE.JSON, METHOD.UPDATE), "/process/" + data.id, JSON.stringify(data), response => {
					this.appUpdated = true;
					console.log(response);
				}, null);
			},


			/* Dialog Methods */
			open_dialog: function(app) {
				this.selectedApp = app;
				if(this.selectedApp.process.configuration !== null) {
					this.selectedApp.service.parameters.forEach(function(param) {
						this.selectedApp.process.configuration.forEach(function(config) {
							console.log(config);
							if(param.id === config.key) {
								console.log(param);
								param.default = config.value;
							}
						}, this);
					}, this);
				}
				this.app_dialog = true;
			},
			close_dialog: function() {
				this.selectedApp = null;
				this.app_dialog = false;
			},



			getInitials: function(name) {
				if(name !== "") {
					let result = "";
					let initials = name.match(/\b(\w)/g);
					for(let i = 0; i < 2; i++) {
						if(i < initials.length) {
							result += initials[i];
						}
					}
					return result;
				} else { return ""; }
			}
		},
		mounted () {
			this.getNodes();
		}
	}
</script>
