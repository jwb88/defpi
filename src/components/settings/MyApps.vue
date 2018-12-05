<template>
	<v-app class="background">
		<v-layout>
			<v-flex xs12>
				<v-container>
					<v-toolbar class="primary pa-2" app height="70px">
						<h1>My Apps</h1>
						<v-layout>
							<v-flex class="text-xs-right">
								<v-dialog v-model="dialog" width="800">
									<v-btn fab slot="activator"  v-on:click="dialog = true" v-bind:style="{backgroundImage:'url(' + alarm_bell + ')', backgroundSize: 'contain', backgroundPosition: 'center'}">
									</v-btn>
									<!--<v-btn slot="activator" icon v-on:click="dialog = true">
										<v-avatar>
											<img src="https://www.onsolve.com/wp-content/uploads/2015/08/Alarm-bell.png">
										</v-avatar>
									</v-btn>
									-->
									<v-tabs grow>
										<v-tab>Settings</v-tab>
										<v-tab>Notifications</v-tab>
										<v-tab-item>
											<v-layout justify-center>
												<v-flex xs12 sm6>
													<v-card height="500px">
														<v-container fluid grid-list-md>
															<h2>Miele Wasmachine P039</h2>
															<br>
															<v-card-text center><h4>IP-address</h4></v-card-text>
															<v-text-field align-center label="192.168.1.15"></v-text-field>
															<v-card-actions>
																<v-spacer></v-spacer>
																<v-btn class="primary" @click="dialog = false">Save</v-btn>
															</v-card-actions>
														</v-container>
													</v-card>
												</v-flex>
												<v-divider vertical></v-divider>
												<v-flex xs12 sm6>
													<v-card row wrap xs12 sm6 height="500px">
														<v-container fluid grid-list-md>
															<h4>Location</h4>
															<v-overflow-btn label="Location" :items="installed_locations"></v-overflow-btn>
															<v-card-actions>
																<v-spacer></v-spacer>
																<v-btn class="primary" @click="dialog = false">Uninstall <v-icon>delete</v-icon></v-btn>
																<v-btn class="primary" @click="dialog = false">Update <v-icon>play_for_work</v-icon></v-btn>
															</v-card-actions>
														</v-container>
													</v-card>
												</v-flex>
											</v-layout>
										</v-tab-item>
										<v-tab-item>
											<v-card>
												<v-card-title class="headline grey lighten-2" primary-title>
													Notifications
												</v-card-title>
												<v-card-text>
													<v-data-table
														:headers="headers"
														:items="applications"
														class="elevation-1"
														hide-actions
													>
														<template slot="items" slot-scope="props">
															<td>{{ props.item.name }}</td>
															<td class="text-xs-right">{{ props.item.message }}</td>
															<v-btn small class="mr-2">Update</v-btn>
															<v-btn small class="mr-2">Dismiss</v-btn>
														</template>
													</v-data-table>
												</v-card-text>

												<v-divider></v-divider>

												<v-card-actions>
													<v-spacer></v-spacer>
													<v-btn class="primary" @click="dialog = false">Mark as read</v-btn>
													<v-btn color="primary"  @click="dialog = false">Ok</v-btn>
												</v-card-actions>
											</v-card>
										</v-tab-item>
									</v-tabs>
								</v-dialog>
							</v-flex>
						</v-layout>
					</v-toolbar>
				</v-container>
				<v-container>
					<v-layout pa-4 ma-3>
						<v-subheader>Applicationname</v-subheader>
						<v-divider>divider</v-divider>
						<v-subheader>Location</v-subheader>
					</v-layout>
					<v-card v-for="app in apps">
						<v-layout align-center justify-center wrap row pa-4 ma-3>
							<v-img max-width="100px" max-height="100px" v-bind:src="app.icon_url" ></v-img>
							<h2>{{ app.title }}</h2>
							<v-flex wrap row ma-5 class="text-lg-right">
								<h2>{{ app.locations }}</h2>
								<!--<v-btn large xs12 sm6 md4 >Configureren</v-btn>
								<v-btn large xs12 sm6 md4 >Verwijderen</v-btn>-->
							</v-flex>
						</v-layout>
					</v-card>
				</v-container>
			</v-flex>
		</v-layout>

		<Menu></Menu>
	</v-app>
</template>

<script>
	export default {
		name: "AppManager",
		components: {
		},
		data() {
			return {
				dialog: false,
				installed_locations: ["Cloud","Pi meterkast","Thuis PC", "Homeserver"],
				icon_url: "https://www.davehewer.com/wp-content/uploads/2018/02/greenleaf-logo-branding03.png",
				apps: [
					{
						title: "Miele",
						icon_url: "http://www.bruggink-bv.nl/wp-content/uploads/2015/09/miele-logo-1.png",
						locations: "Cloud"
					},
					{
						title: "Smart Energy",
						icon_url: "https://www.davehewer.com/wp-content/uploads/2018/02/greenleaf-logo-branding03.png",
						locations: "Raspberry Pi - 1"
					},
					{
						title: "Vue Power",
						icon_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Vue.js_Logo.svg/400px-Vue.js_Logo.svg.png",
						locations: "Cloud"
					},
				],
				headers: [
					{
						text: 'Application',
						align: 'left',
						sortable: false,
						value: 'name'
					},
					{ text: 'Message', value: 'message', sortable: false },
					{text: '', value: 'action',sortable: false}
				],
				applications: [
					{
						value: false,
						name: 'Miele wasmachine P039',
						message: 'Er is een update beschikbaar'
					},
					{
						value: false,
						name: 'Batterij',
						message: 'De batterij is kapot.'
					}
				],
				alarm_bell: "https://www.onsolve.com/wp-content/uploads/2015/08/Alarm-bell.png"
			}
		}
//<v-btn fab large ripple v-bind:style="{backgroundImage:'url(' + icon_url + ')'}"></v-btn>
	}
</script>

<style scoped>
</style>
