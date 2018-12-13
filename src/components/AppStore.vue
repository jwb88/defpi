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
							<v-list-tile v-for="cat in categories" :to="'/appstore/category/' + cat.name">
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
										<v-card-title class="primary darken-1 title primary--text text--lighten-1 pa-1" color="primary"><v-avatar v-bind:style="{backgroundImage: 'url(' + '' + ')', backgroundSize: 'contain', backgroundPosition: 'center', marginRight: '20px'}"></v-avatar>{{app.name}}</v-card-title>
										<v-card-media style="width:300px; height: 170px;">
											<v-btn class="primary mb-4 mr-1"
											   	v-on:click="openAppModal(app.id)"
												absolute dark fab small bottom right
											>
												<v-icon>add</v-icon>
											</v-btn>

											<v-label>
												Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
											</v-label>
										</v-card-media>
									</v-card>
								</v-layout>
							</v-flex>
						</v-layout>
					</v-container>
				</v-flex>
			</v-layout>

			<!-- Dialog -->
			<v-layout row justify-center>
				<v-dialog v-model="appModal" persistent max-width="600px">
					<v-card>
						<v-card-title>
							<span v-if="appDetails" class="headline">{{ appDetails.name }}</span>
						</v-card-title>
						<v-card-text>
							<v-container grid-list-md>
								<v-layout wrap>
									<v-label v-if="appDetails" >{{ appDetails.description }}</v-label>
								</v-layout>
							</v-container>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" flat @click="appModal = false">Close</v-btn>
							<v-btn color="blue darken-1" flat @click="appModal = false">Save</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-layout>
		</v-content>

		<Menu :menu="menu"></Menu>
	</v-app>
</template>

<script>
	// Temporary
	import Menu from './Menu'
    export default {
		name: 'Appstore',
		props: ["menu", "API"],
		components: {
			Menu
		},
		data () {
			return {
				appModal: false,
				appList: [],
				displayableApps: [],
				searchFilter: '',
				publicNodes: [],
				privateNodes: [],
				nodePools: [],
				locationPicker: [],
				appDetails: null,
				categories: [
					{ name: 'All' },
					{ name: 'Category_One' },
					{ name: 'Category_Two' },
					{ name: 'Category_Three' },
					{ name: 'Category_Four' }
				],
			}
		},
		methods: {
			updateAppList: function () {
				this.API.get("8484", "/service", response => { this.appList = response.data; this.updateFilteredList()});
			},
			updateFilteredList: function() {
				let tempAppList = [];
				let searchTerm = this.searchFilter.toLowerCase();

				// TODO: Add filtering
				if( this.appList.length > 0 ){
					this.appList.forEach(function (value, key) {
						if(	1/*value.name !== "Dashboard" &&
							value.name !== "Dashboard Gateway"*/ ) {
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
				this.API.get("8484", "/privatenode", response => { this.privateNodes = response.data; });
				this.API.get("8484", "/publicnode", response => { this.publicNodes = response.data; });
				this.API.get("8484", "/nodepool", response => { this.nodePools = response.data; });
			},
			createNodeList: function() {
				this.locationPicker = [];
				if( this.nodePools.length > 0 )
					this.locationPicker.push( this.nodePools );
				if( this.privateNodes.length > 0 )
					this.locationPicker.push( this.privateNodes );
				if( this.publicNodes.length > 0 )
					this.locationPicker.push( this.publicNodes );

				console.log("---Nodes---");
				console.log(this.nodePools.length );
				console.log(this.privateNodes.length );
				console.log(this.publicNodes.length );
				console.log(this.locationPicker);
				this.locationPicker.forEach(function (value, key) {
					console.log(key + "|" + value[0].name)
				});
				console.log("-----------")

			},
			openAppModal: function(appId) {
				console.log("App id:\t" + appId);
				this.appModal = true;
				this.appDetails = {
					name: appId,
					description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
				};
			}
		},
		mounted () {
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
