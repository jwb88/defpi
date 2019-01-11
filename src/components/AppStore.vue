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
						<v-layout wrap>
							<v-flex v-for="app in displayableApps" :key="app.id" xs12 sm6 md4 lg4>
								<v-layout align-center justify-center>
									<v-card class="elevation-4 ma-4" style="min-width: 300px;">
										<v-card-title class="primary darken-1 title primary--text text--lighten-1 pa-1" color="primary"><v-avatar class="primary lighten-1 mr-3 black--text">{{ getInitials(app.name) }}</v-avatar>{{app.name}}</v-card-title>
										<v-card-text class="pa-3" style="width:300px; height: 170px;">
											<v-btn class="primary mb-4 mr-1"
											   	v-on:click="openAppModal(app.id)"
												absolute dark fab small bottom right
											>
												<v-icon>add</v-icon>
											</v-btn>

											<v-label>
												{{ shortenText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.") }}
											</v-label>
										</v-card-text>
									</v-card>
								</v-layout>
							</v-flex>
						</v-layout>
					</v-container>
				</v-flex>
			</v-layout>

			<!-- Dialog -->
			<v-layout row justify-center>
				<!--<v-dialog v-model="appModal" persistent max-width="800px">-->
				<v-dialog lazy v-model="appModal" persistent :fullscreen="$vuetify.breakpoint.smAndDown" max-width="800px">
					<v-card>
						<v-card-title class="hidden-md-and-down">
							<span v-if="appDetails" class="headline">{{ appDetails.name }}</span>
							<v-btn class="primary" absolute dark small fab right v-on:click="closeAppModal()">
								<v-icon> close </v-icon>
							</v-btn>
						</v-card-title>
						<v-card-title class="hidden-lg-and-up text-xs-center justify-center">
							<span v-if="appDetails" class="headline">{{ appDetails.name }}</span>
							<v-btn absolute large flat icon fab left v-on:click="closeAppModal()">
								<v-icon> arrow_back </v-icon>
							</v-btn>
						</v-card-title>

						<v-divider></v-divider>
						<v-layout wrap>
							<v-flex sm12 md12 lg8>
								<v-card-text>
									<v-container grid-list-md>
											<v-layout wrap>
												<v-img src="https://picsum.photos/350/165?random" class="grey darken-4" ></v-img>
												<v-spacer></v-spacer>
												<v-label v-if="appDetails" >{{ appDetails.description }}</v-label>
											</v-layout>
									</v-container>
								</v-card-text>
							</v-flex>
							<v-flex sm12 md12 lg4>
								<v-layout class="fill-height row wrap fill-height text-xs-center align-end justify-end pb-5">
									<v-flex xs12>
										<v-layout justify-center>
											<v-card-actions style="max-width:280px;">
												<v-list>
													<v-list-tile>
														<v-btn :loading="isInstalling" block class="primary" v-on:click="installApp()" :disabled="hasSelectedLocation()">Install</v-btn>
													</v-list-tile>
													<v-list-tile>
														<v-select
														:items="locationPicker"
														v-model="selectedLocation"
														item-text="name"
														placeholder="Select a device..."
														single-line
														return-object
														></v-select>
													</v-list-tile>
												</v-list>
											</v-card-actions>
										</v-layout>
									</v-flex>
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
	import Menu from './Menu'
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
				appList: [],
				displayableApps: [],
				searchFilter: "",
				publicNodes: [],
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
				getRequestConfig: {
					port: 			this.$API.PORT.ORCHESTRATOR,
					contentType: 	this.$API.CONTENT_TYPE.NONE,
					method: 		this.$API.METHOD.GET,
				},
				postRequestConfig: {
					port: 			this.$API.PORT.ORCHESTRATOR,
					contentType: 	this.$API.CONTENT_TYPE.JSON,
					method: 		this.$API.METHOD.POST,
				}
			};
		},
		methods: {
			updateAppList: function () {
				this.$API.send(this.getRequestConfig, "/service", null, response => { this.appList = response; this.updateFilteredList(); this.modalLoading = false; });
			},
			updateFilteredList: function() {
				let tempAppList = [];
				let searchTerm = this.searchFilter.toLowerCase();

				// TODO: Add filtering
				if( this.appList.length > 0 ){
					this.appList.forEach(function (value, key) {
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
				this.$API.send(this.getRequestConfig, "/privatenode", null, response => { this.privateNodes = response; });
				this.$API.send(this.getRequestConfig, "/publicnode", null, response => { this.publicNodes = response; });
				this.$API.send(this.getRequestConfig, "/nodepool", null, response => { this.nodePools = response; });
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
				if( this.publicNodes.length > 0 ) {
					this.publicNodes.forEach(function (value, key) {
						value.isPublicNode = true;
						tempLocationPicker.push(value);
					});
				}
				this.locationPicker = tempLocationPicker;
			},
			openAppModal: function(appId) {
				this.modalLoading = true;
				this.$API.send(this.getRequestConfig, "/service/" + appId, null, response => {
					let data = response;
					this.appDetails = {
						id: data.id,
						name: data.name,
						description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
					};
					this.modalLoading = false;
					this.appModal = true;
				});
			},
			closeAppModal: function() {
				this.appModal = false;
				this.selectedLocation = '';
				this.appDetails = null;
			},
			hasSelectedLocation: function() {
				return this.selectedLocation == null || this.selectedLocation === '';
			},
			installApp: function() {
				if ( this.selectedLocation !== null &&
					this.selectedLocation !== '' &&
					this.appDetails !== null /*&&
					window.localStorage.getItem('efpi_orchestrator_username') !== null &&
					window.localStorage.getItem('efpi_orchestrator_username') !== ''*/ ) {

					this.isInstalling = true;
					let username = window.localStorage.getItem('efpi_orchestrator_username');
					username = 'admin'; // TODO: REMOVE THIS ABOMINATION
					// Fetch user Id
					this.$API.send(this.getRequestConfig, "/user/by_username/" + username, null, response => {
						let data = response;

						// Build payload
						let payLoad = {};
						payLoad.configuration = null;
						payLoad.debuggingPort =  0;
						payLoad.exposePorts = null;
						payLoad.maxMemoryBytes = 0;
						payLoad.maxNanoCPUs = 0;
						payLoad.mountPoints = null;
						payLoad.name = null;
						if( this.selectedLocation.isNodePool ) {
							payLoad.nodePoolId = this.selectedLocation.id;
							payLoad.privateNodeId = null;
						}else {
							payLoad.nodePoolId = null;
							payLoad.privateNodeId = this.selectedLocation.id;
						}
						payLoad.serviceId = this.appDetails.id;
						payLoad.userId = data.id;

						this.$API.send(this.postRequestConfig, "/process", JSON.stringify(payLoad), response => {
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
			}.bind(this), 5000);
			setInterval(function () {
				this.fetchNodes();
			}.bind(this), 5000);
			setInterval(function () {
				this.createNodeList();
			}.bind(this), 1000);
		}
    }
</script>

<style scoped>

</style>
