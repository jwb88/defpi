<template>
	<v-app id="Appstore" class="background">
		<v-toolbar height="100px" class="v-toolbar--fixed primary" app>
			<v-layout class="text-xs-center" align-center justify-center>
					<v-text-field color="background--text"
								  v-model="searchFilter"
								  v-on:input="updateFilteredList"
								  id="search"
								  prepend-inner-icon="search"
								  name="search"
								  type="search"
								  placeholder="Search..."
								  style="max-width:300px;">
					</v-text-field>
			</v-layout>

		</v-toolbar>

		<v-content>
			<v-layout row wrap ml-5>
				<v-flex class="hidden-md-and-down"  lg2 xs2 mt-5>
					<v-card class="elevation-4">
						<v-toolbar color="primary" dark>
							<v-toolbar-title class="text-xs-center">Categories</v-toolbar-title>
						</v-toolbar>

						<v-list>
							<v-list-tile v-for="cat in categories" :key="cat.name" :to="'/appstore/category/' + cat.name">
								<v-list-tile-content>
									<v-list-tile-title v-text="cat.name" ripple></v-list-tile-title>
								</v-list-tile-content>
							</v-list-tile>
						</v-list>
					</v-card>
				</v-flex>
				<v-flex md12 lg10 xs10>
					<v-container grid-list-xs fluid>
						<v-layout row wrap class="align-center justify-center">
							<v-flex v-for="app in displayableApps" :key="app.id" xs12 sm6 md4 lg3 style="min-width: 400px !important;">
								<v-layout align-center justify-center>
									<v-card class="elevation-2 ma-4" style="min-width: 340px !important;">

										<v-card-title class="primary darken-1 title white--text pa-1" color="primary">
											<v-avatar v-if="app.iconURL != null" class="primary lighten-3" v-bind:style="{backgroundImage: 'url(' + app.iconURL + ')', backgroundSize: 'contain', backgroundPosition: 'center'}"></v-avatar>
											<v-avatar v-else class="primary lighten-3 font-weight-bold">{{ getInitials(app.name) }}</v-avatar>
											{{app.name}}
										</v-card-title>
										<v-card-text class="pa-3" style="width:300px; height: 170px;">
											<v-label >{{ shortenText(app.description) }}</v-label>
										</v-card-text>
										<v-divider></v-divider>
										<v-card-actions style="height:50px;">
											<v-btn class="primary mb-4 mr-1"
												   style="left:80%;top:10px;"
												   v-on:click="openAppModal(app.id)"
												   dark fab small
											>
												<v-icon>add</v-icon>
											</v-btn>
										</v-card-actions>
									</v-card>
								</v-layout>
							</v-flex>
						</v-layout>
					</v-container>
				</v-flex>
			</v-layout>

			<!-- Dialog -->
			<v-layout row justify-center>
				<v-dialog lazy v-model="appModal" persistent :fullscreen="$vuetify.breakpoint.mdAndDown" max-width="800px">
					<v-card>
						<v-card-title class="hidden-md-and-down" relative>
							<span v-if="appDetails" class="headline">{{ appDetails.name }}</span>
							<v-btn class="primary" absolute dark small fab right v-on:click="closeAppModal()">
								<v-icon> close </v-icon>
							</v-btn>
						</v-card-title>
						<v-card-title class="hidden-lg-and-up text-xs-center justify-center" relative>
							<span v-if="appDetails" class="headline">{{ appDetails.name }}</span>
							<v-btn absolute large flat icon fab left v-on:click="closeAppModal()">
								<v-icon> arrow_back </v-icon>
							</v-btn>
						</v-card-title>

						<v-divider></v-divider>
						<v-layout wrap>
							<v-responsive>
								<v-container>
									<v-flex xs12>
										<v-layout align-center justify-center pb-1>
											<img src="https://picsum.photos/350/165?random" class="grey darken-4" alt="App Preview"/>
										</v-layout>
									</v-flex>
									<v-flex xs12 wrap>
										<v-label v-if="appDetails" >{{ appDetails.description }}</v-label>
									</v-flex>
								</v-container>
							</v-responsive>
							<v-flex sm12 md12 lg12>
								<v-layout align-center justify-center>
									<v-card-actions>
										<v-list style="width:300px;">
											<v-list-tile>
												<v-btn :loading="isInstalling" block class="primary" v-on:click="installApp()" :disabled="canInstall()">Install</v-btn>
											</v-list-tile>
											<v-list-tile>
												<v-select
													:items="locationPicker"
													v-model="selectedLocation"
													item-text="name"
													placeholder="Select a location..."
													single-line
													return-object
												></v-select>
											</v-list-tile>
											<v-list-tile>
												<!-- TODO: Add checks -->
												<v-text-field v-model="appNickName" placeholder="Enter a name..."> </v-text-field>
											</v-list-tile>
										</v-list>
									</v-card-actions>
								</v-layout>
							</v-flex>
						</v-layout>
					</v-card>
				</v-dialog>
			</v-layout>

			<!-- Load bar -->
			<div class="text-xs-center">
				<v-dialog v-model="modalLoading" hide-overlay persistent width="300" >
					<v-card class="primary" dark >
						<v-card-text>
							Loading app data...
							<v-progress-linear indeterminate color="white" class="mb-0" ></v-progress-linear>
						</v-card-text>
					</v-card>
				</v-dialog>
			</div>

			<!-- Successful install-->
			<div class="text-xs-center">
				<v-dialog v-model="appInstalled" persistent width="300" >
					<v-card dark >
						<v-card-text>
							The app has been installed, and will be started momentarily.
							<v-btn class="primary" v-on:click="appInstalled = false; closeAppModal();">Ok</v-btn>
						</v-card-text>
					</v-card>
				</v-dialog>
			</div>
		</v-content>
		<Menu></Menu>
	</v-app>
</template>

<script>
	// Temporary
	import Menu from './Menu';
	import { API, Config, PORT, CONTENT_TYPE, METHOD } from "../js/api.js";

	export default {
		name: 'AppStore',
		props: ["menu"],
		components: {
			Menu
		},
		data: function() {
			return {
				appModal: false,
				modalLoading: false,
				isInstalling: false,
				appInstalled: false,
				selectedLocation: "",
				appNickName: "",
				appList: [],
				displayableApps: [],
				searchFilter: "",
				privateNodes: [],
				nodePools: [],
				locationPicker: [],
				appDetails: null,
				categories: [
					{ name: "All" },
					{ name: "Category_One" },
					{ name: "Category_Two" },
					{ name: "Category_Three" },
					{ name: "Category_Four" }
				],
				getRequestConfig: new Config(PORT.ORCHESTRATOR, CONTENT_TYPE.NONE, METHOD.GET),
				postRequestConfig: new Config(PORT.ORCHESTRATOR, CONTENT_TYPE.JSON, METHOD.POST),
			};
		},
		methods: {
			updateAppList: function () {
				API.send(this.getRequestConfig, "/service", null, response => { this.appList = response; this.updateFilteredList(); this.modalLoading = false; });
			},
			updateFilteredList: function() {
				let tempAppList = [];
				let searchTerm = this.searchFilter.toLowerCase();

				// TODO: Add filtering
				if( this.appList.length > 0 ){
					this.appList.forEach(function (value, key) {
						//TODO: Replace with actual description
						value.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
						if(	value.name !== "Dashboard" &&
							value.name !== "Dashboard Gateway") {
							if( searchTerm.length > 0 ) {
								if( value.name.toLowerCase().includes( searchTerm ) ) {
									tempAppList.push(value);
								}
							}else {
								tempAppList.push(value);
							}
						}
					});
				}
				this.displayableApps = tempAppList;
			},
			fetchNodes: function() {
				API.send(this.getRequestConfig, "/privatenode", null, response => { this.privateNodes = response; });
				API.send(this.getRequestConfig, "/nodepool", null, response => { this.nodePools = response; });
			},
			createNodeList: function() {
				let tempLocationPicker = [];
				if( this.nodePools.length > 0 ) {
					this.nodePools.forEach(function (value, key) {
						value.isNodePool = true;
						tempLocationPicker.push(value);
					});
				}
				if( this.privateNodes.length > 0 ) {
					this.privateNodes.forEach(function (value, key) {
						value.isPrivateNode = true;
						tempLocationPicker.push(value);
					});
				}
				this.locationPicker = tempLocationPicker;
			},
			openAppModal: function(appId) {
				this.modalLoading = true;
				this.appNickName = '';

				this.appDetails = this.getAppByID(appId);
				if(this.appDetails)
					this.appModal = true;
				/*API.send(this.getRequestConfig, "/service/" + appId, null, response => {
					let data = response;
					this.appDetails = {
						id: data.id,
						name: data.name,
						//TODO: Replace with actual description
						description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
					};
					this.modalLoading = false;
					this.appModal = true;
				});*/
			},
			getAppByID: function(appId) {
				if(!this.appList)
					return null;
				if(!appId)
					return null;
				let app = object;
				this.appList.forEach(function(value, key){
					if( value.id === appId )
						app = value;
				});
				return app;
			},
			closeAppModal: function() {
				this.appNickName = '';
				this.appModal = false;
				this.selectedLocation = '';
				this.appDetails = null;
			},
			canInstall: function() {
				return this.selectedLocation == null || this.selectedLocation === '' || this.appNickName == null || this.appNickName === '';
			},
			installApp: function() {
				if ( this.selectedLocation !== null &&
					this.selectedLocation !== '' &&
					this.appDetails !== null &&
					window.localStorage.getItem('defpi_username') !== null &&
					window.localStorage.getItem('defpi_username') !== '' &&
					this.appNickName !== null &&
					this.appNickName !== '' ) {

					//TODO: Verify Unique nickname

					this.isInstalling = true;
					let username = window.localStorage.getItem('defpi_username');
					// Fetch user Id
					API.send(this.getRequestConfig, "/user/by_username/" + username, null, response => {
						let data = response;

						// Build payload
						let payLoad = {};
						payLoad.configuration = null;
						payLoad.debuggingPort =  0;
						payLoad.exposePorts = null;
						payLoad.maxMemoryBytes = 0;
						payLoad.maxNanoCPUs = 0;
						payLoad.mountPoints = null;
						payLoad.name = this.appNickName;
						if( this.selectedLocation.isNodePool ) {
							payLoad.nodePoolId = this.selectedLocation.id;
							payLoad.privateNodeId = null;
						}else {
							payLoad.nodePoolId = null;
							payLoad.privateNodeId = this.selectedLocation.id;
						}
						payLoad.serviceId = this.appDetails.id;
						payLoad.userId = data.id;

						API.send(this.postRequestConfig, "/process", JSON.stringify(payLoad), response => {
							let data = response;

							this.isInstalling = false;
							this.appInstalled = true;
						});
					});
				}
			},
			getInitials: function(name) {
				let initials = name.match(/\b(\w)/g);
				return initials.join('');
			},
			shortenText: function(text) {
				return text.replace(/(.{220})..+/, "$1…");
			}
		},
		mounted () {
			console.log("IS AppStore:");
			console.log(this.$route.matched[0].components["default"].name === this.name);

			this.modalLoading = true;
			this.updateAppList();
			this.fetchNodes();
			setInterval(function () {
				this.updateAppList();
			}.bind(this), 10000);
			setInterval(function () {
				this.fetchNodes();
			}.bind(this), 15000);
			setInterval(function () {
				this.createNodeList();
			}.bind(this), 2500);
		}
    }
</script>

<style scoped>

</style>
