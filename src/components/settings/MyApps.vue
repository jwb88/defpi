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
		<v-dialog v-model="app_dialog" width="800" lazy>
			<v-toolbar color="primary">
				<v-toolbar-side-icon @click="close_dialog()"><v-icon>navigate_before</v-icon></v-toolbar-side-icon>
				<v-layout class="text-xs-center">
					<v-flex>
						<h1 class="primary title primary--text text--lighten-3 pa-1">{{ selectedApp.serviceId }}</h1>
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
									<h2>{{ selectedApp.serviceId }}</h2>
									<br>
									<v-card-text center><h4>IP-address</h4></v-card-text>
									<v-text-field align-center v-bind:label="selectedApp.ip_address" :rules="ipRules" placeholder="192.168.2.1"></v-text-field>
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
									<v-overflow-btn label="Location" :items="locations"></v-overflow-btn>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn class="primary" @click="uninstall(selectedApp)">Uninstall <v-icon>delete</v-icon></v-btn>
										<v-btn class="primary" @click="close_dialog(app.id)">Update <v-icon>play_for_work</v-icon></v-btn>
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
									<td>{{ props.item.type }}</td>
									<td>{{ props.item.importance }}</td>
								</template>
							</v-data-table>
						</v-card-text>

						<v-divider></v-divider>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn class="primary" @click="close_dialog(app.id)">Mark as read</v-btn>
							<v-btn color="primary" @click="close_dialog(app.id)">Ok</v-btn>
						</v-card-actions>
					</v-card>
				</v-tab-item>
			</v-tabs>
		</v-dialog>

		<!--App Table-->
		<v-container>
			<v-data-table :headers="headers" :items="apps" class="elevation-1" hide-actions>
				<template slot="items" slot-scope="props">
					<td class="title pa-4" @click="open_dialog(props.item)">{{ props.item.name }}</td>
					<td class="pa-4" @click="open_dialog(props.item)">{{ props.item.serviceId }}</td>
					<td class="pa-4"  @click="open_dialog(props.item.id)">{{ props.item.token}}</td>
					<td class="pa-4"  @click="open_dialog(props.item.id)">{{ props.item.state}}</td>
				</template>
			</v-data-table>
		</v-container>
	</v-container>
</template>

<script>
	export default {
		data() {
			return {
				headers: [
					{text: "Name", value: "name"},
					{text: "Service", value: "serviceId"},
					{text: "Token", value: "token"},
					{text: "State", value: "state"},
				],
				notification_headers: [
					{text: "Notification", value: "notification"},
					{text: "Type", value: "type"},
					{text: "Importance", value: "importance"},
				],
				app_dialog: false,
				dialog: false,
				locations: ["Cloud","Pi meterkast","Thuis PC", "Homeserver"],
				apps: [],
				active_tab: 0,
				tabs: [{ id: 1, name: 'Settings'},{ id: 2, name: 'Notifications'}],
				api_config: {
					port: 			this.$API.PORT.ORCHESTRATOR,
					contentType: 	this.$API.CONTENT_TYPE.JSON,
					method: 		this.$API.METHOD.GET,
				},
				api_delete: {
					port: 			this.$API.PORT.ORCHESTRATOR,
					contentType: 	this.$API.CONTENT_TYPE.NONE,
					method: 		this.$API.METHOD.DELETE,
				},
				selectedApp: {
					serviceId: "",
					ip_address: "unknown",
					notifications: {},
				},
				ipRules: [
					v => /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(v) || 'IP address must be valid'
				]
			}
		},
		methods: {
			/* API Methods */
			updateAppList: function () {
				this.apps = [];
				this.$API.send(this.api_config, "/process", [], response => {
					console.log(response);
					this.apps = response;

					/*for(let key in this.apps) {
						console.log(this.apps[key]);
						this.$API.send(this.api_config, "/privatenode/" + this.apps[key].privateNodeId, [], response => {

						});
						this.apps[key].notifications = [
							{notification: "Some notification", type: "Something", importance: "Warning"}
						];
					}*/
				});
			},
			uninstall: function (app) {
				this.$API.send(this.api_delete, "/process/" + app.id, [], response => {
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
			}
		},
		mounted () {
			this.updateAppList();
		}
	}
</script>
