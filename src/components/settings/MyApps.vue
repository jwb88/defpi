<template>
	<v-layout>
		<v-flex xs12>
			<v-container>
				<v-toolbar color="primary" class="v-toolbar--fixed" app height="70px">
					<v-layout class="text-xs-right">
						<v-flex>
							<h1 class="primary title primary--text text--lighten-1 pa-1">My apps</h1>
						</v-flex>
					</v-layout>
					<v-layout>
						<v-flex class="text-xs-right">
							<v-dialog v-model="dialog" width="800" lazy>
								<v-btn fab slot="activator"  v-on:click="dialog = true"><v-icon large>notification_important</v-icon></v-btn>
								<v-card>
									<v-card-title class="headline grey lighten-2" primary-title>
										Notifications
									</v-card-title>
									<v-card-text v-for="app in apps" :key="app.id">
										<v-list two-line>
											<v-list-tile v-on:click="open_dialog(app.id)" @click="dialog = false ; active_tab = 1">
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
						</v-flex>
					</v-layout>
				</v-toolbar>
			</v-container>

			<v-container>
				<v-data-table :headers="headers" :items="apps" class="elevation-1" hide-actions>
					<template slot="items" slot-scope="props">
						<td class="title pa-4" @click="open_dialog(props.item.id)">{{ props.item.serviceId }}</td>
						<td class="title pa-4"  @click="open_dialog(props.item.id)">{{ props.item.locations }}</td>
						<td class="title pa-4"  @click="open_dialog(props.item.id)">{{ props.item.ip_address }}</td>
					</template>
				</v-data-table>
			</v-container>

			<v-dialog v-model="appdialog" width="800" lazy>
				<v-toolbar color="primary">
					<v-toolbar-side-icon @click="close_dialog()"><v-icon>arrow_left</v-icon></v-toolbar-side-icon>
					<v-layout class="text-xs-center">
						<v-flex>
							<h1 class="primary title primary--text text--lighten-3 pa-1">{{ appinfo.title }}</h1>
						</v-flex>
					</v-layout>
				</v-toolbar>
				<v-tabs v-model="active_tab" show arrows grow>
					<v-tab v-for="tab of tabs" :key="tab.id">{{ tab.name }}</v-tab>
					<v-tab-item>
						<v-card>
							<v-layout justify-center row wrap>
								<v-flex >
									<v-container fluid grid-list-md>
										<h2>{{ appinfo.title }}</h2>
										<br>
										<v-card-text center><h4>IP-address</h4></v-card-text>
										<v-text-field align-center v-bind:label="appinfo.ip_address"> </v-text-field>
										<v-card-actions>
											<v-spacer></v-spacer>
											<v-btn class="primary" @click="appinfo.dialog = false">Save</v-btn>
										</v-card-actions>
									</v-container>
								</v-flex>
								<v-divider vertical></v-divider>
								<v-flex>
									<v-container fluid grid-list-md>
										<h4>Location</h4>
										<v-overflow-btn label="Location" :items="installed_locations"></v-overflow-btn>
										<v-card-actions>
											<v-spacer></v-spacer>
											<v-btn class="primary" @click="close_dialog(app.id)">Uninstall <v-icon>delete</v-icon></v-btn>
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
								<td>{{ appinfo.notifications }}</td>
								<v-data-table :headers="headers" :items="apps" class="elevation-1" hide-actions>
									<template slot="items" slot-scope="props">
										<td>{{ apps.title }}</td>
										<td class="text-xs-right">{{ apps.notifications }}</td>
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
		</v-flex>
	</v-layout>
</template>

<script>
	export default {
		name: "AppManager",
		components: {
		},
		data() {
			return {
				headers: [
					{text: "serviceId", value: "serviceId"},
					{text: "locations", value: "locations"},
					{text: "IP Address", value: "ip_address"},
				],
				appinfo: {},
				appdialog: false,
				dialog: false,
				installed_locations: ["Cloud","Pi meterkast","Thuis PC", "Homeserver"],
				active_tab: 0,
				app_list: {},
				apps: [
					{
						id:	0,
						serviceId: "Miele wasmachine P039",
						icon_url: "http://www.bruggink-bv.nl/wp-content/uploads/2015/09/miele-logo-1.png",
						locations: "Cloud",
						ip_address: "192.168.1.15",
						notifications: ["Er is een update beschikbaar.","Dit is een update"],
						dialog: false
					},
					{
						id:	1,
						serviceId: "Smart Energy",
						icon_url: "https://www.davehewer.com/wp-content/uploads/2018/02/greenleaf-logo-branding03.png",
						locations: "Raspberry Pi - 1",
						ip_address: "192.168.1.16",
						notifications: "Dit is een notificatie.",
						dialog: false
					},
					{
						id:	2,
						serviceId: "Vue Power",
						icon_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Vue.js_Logo.svg/400px-Vue.js_Logo.svg.png",
						locations: "Cloud",
						ip_address: "192.168.1.17",
						notifications: "Geen notificaties.",
						dialog: false
					},
				],
				tabs: [{ id: 1, name: 'Settings'},{ id: 2, name: 'Notifications'}],
				api_config: {
					port: 			this.$API.PORT.ORCHESTRATOR,
					contentType: 	this.$API.CONTENT_TYPE.JSON,
					method: 		this.$API.METHOD.GET,
				},
			}
		},
		methods: {
			updateAppList: function () {
				let appies = this.apps;
				this.$API.send(this.api_config, "/process", response => {
					this.app_list = response;

					this.app_list.forEach(function(value,key) {
						appies.push(value);
					});
					console.log(appies);
					this.apps = appies;
					console.log(this.apps);
				});


			},
			open_dialog: function(appid) {
				this.appinfo = {};
				this.appinfo = {
					id: this.apps[appid].id,
					title: this.apps[appid].serviceId,
					location: this.apps[appid].locations,
					ip_address: this.apps[appid].ip_address,
					notifications: this.apps[appid].notifications
				};
				console.log(this.appinfo);
				this.appdialog = true;
			},
			close_dialog: function() {
				this.appinfo = {};
				this.appdialog = false;
			}
		}
	}
</script>
