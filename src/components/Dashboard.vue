<template>
	<v-app class="background">
		<!-- Fullscreen Widgets -->
		<v-toolbar height="100px" class="v-toolbar--fixed elevation-4" color="primary" app>
			<!--<v-container class="text-xs-center"><v-toolbar-title class="white&#45;&#45;text align-content-center">dEF - PI</v-toolbar-title></v-container>-->
			<v-tabs height="100%" color="primary" show-arrows app fixed-tabs grow :hide-slider="($route.params.id == null)"><!-- slot="extension"-->
				<v-tabs-slider type="arrow_drop_up" color="black"></v-tabs-slider>
				<v-tab v-for="(widget, k) in widgetsFullscreen" :key="widget.widgetId" justify-center v-bind:to="'/fullscreen_widget/' + widget.iframe_id" active-class="fullscreenActive"> <!--v-if="widget.has_fullscreen_widget"-->
					<v-container class="column fill-height">
						<v-flex>
							<v-avatar v-if="widget.service.iconURL != null" class="background lighten-3" v-bind:style="{backgroundImage: 'url(' + widget.service.iconURL + ')', backgroundSize: 'contain', backgroundPosition: 'center'}"></v-avatar>
							<v-avatar v-else class="background lighten-3 font-weight-bold">{{ getInitials(widget.process.name) }}</v-avatar>
							<h4 class="hidden-sm-and-down black--text" style="margin-top: 12px;">{{ $minifyName(widget.title) }}</h4>
						</v-flex>
					</v-container>
				</v-tab>
			</v-tabs>
		</v-toolbar>

		<!-- Widgets -->
		<v-content style="height: 94%;">
			<v-container v-if="$route.params.id == null" grid-list-xs fluid>
				<v-layout row wrap :class="{ 'justify-center': $vuetify.breakpoint.mdAndDown}">
					<!--No Widgets Installed-->
					<v-flex v-if="widgets.length < 1">
						<v-layout v-if="!widgetLoading" align-center justify-center>
							<v-card class="elevation-2 ma-4" style="width: 400px; height: 200px;">
								<v-card-title class="primary darken-1 title white--text pa-1" color="primary">
									Info
								</v-card-title>
								<v-card-text style="font-weight: 600;">
									It seems you do not have any apps with widgets installed yet!
									You can install apps using the button below.
									<v-divider class="mt-4"></v-divider>
									<v-btn class="primary" to="/appstore"><v-icon>shop</v-icon> App store</v-btn>
								</v-card-text>
							</v-card>
						</v-layout>
					</v-flex>
					<!--Small Widgets-->
					<v-flex v-else v-for="(widget, k) in widgets" :key="k" xs12 sm6 md4 lg3 style="min-width: 400px !important;"> <!--v-if="widget.has_widget"-->
						<v-layout justify-center v-if="!(widget.process.state === 'RUNNING' && widget.widgetId == null)">
							<v-card class="elevation-2 ma-4" style="min-width: 340px !important;">
								<v-card-title class="primary darken-1 title white--text pa-1" color="primary">
									<v-avatar v-if="widget.service.iconURL != null" class="background lighten-1 mr-3" v-bind:style="{backgroundImage: 'url(' + widget.service.iconURL + ')', backgroundSize: 'contain', backgroundPosition: 'center'}"></v-avatar>
									<v-avatar v-else class="background lighten-1 mr-3 black--text">{{ getInitials(widget.process.name) }}</v-avatar>
									{{ $minifyName(widget.process.name) }}
								</v-card-title>
								<v-card-title class="primary pa-0 pr-3 primary--text text--lighten-3 text-xs-right" style="display: block;">{{$minifyName(widget.title)}}</v-card-title>
								<v-responsive v-if="widget.process.state === 'RUNNING' && widget.widgetId !== null" class="pa-4 d-inline-flex"><iframe width="300px" height="170px" v-bind:src="'/' + widget.widgetId + '/index.html'"></iframe></v-responsive>
								<v-responsive v-if="widget.process.state === 'STARTING'" class="pa-4 d-inline-flex">STARTING..</v-responsive>
								<v-responsive v-if="widget.process.state === 'INITIALIZING'" class="pa-4 d-inline-flex">INITIALIZING..</v-responsive>
								<v-responsive v-if="widget.process.state === 'TERMINATED'" class="pa-4 d-inline-flex">TERMINATED..</v-responsive>
							</v-card>
						</v-layout>
					</v-flex>
				</v-layout>
			</v-container>

			<!--Fullscreen Widget FullDisplay-->
			<v-container v-else style="max-width: 1200px;" class="fill-height">
				<v-card v-if="hasFullscreenWidget($route.params.id)" style="width: 100%; height: 100%;">
					<v-card-title class="title">{{ getFullScreenWidget($route.params.id).name }}</v-card-title>
					<v-responsive style="width: 100%; height: 100%"><iframe width="100%" height="100%" :src="'/' + $route.params.id + '/index.html'"></iframe></v-responsive>
				</v-card>
				<v-card v-else>
					<v-card-title class="title">[404] Fullscreen Widget Not Found!</v-card-title>
				</v-card>
			</v-container>
		</v-content>

		<!-- Load bar -->
		<div class="text-xs-center">
			<v-dialog v-model="widgetLoading" hide-overlay persistent width="300">
				<v-card class="primary" dark >
					<v-card-text>
						Loading widgets..
						<v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
					</v-card-text>
				</v-card>
			</v-dialog>
		</div>

		<Menu></Menu>
	</v-app>
</template>

<script>
	import Menu from './Menu';
	import { API, Config, PORT, CONTENT_TYPE, METHOD } from "../js/api";

	export default {
		components: {
			Menu
		},
		data() {
			return {
				widgetLoading: true,
				widgets: [],
				widgetsFullscreen: [],
				api_config: new Config(PORT.ORCHESTRATOR, CONTENT_TYPE.JSON, METHOD.GET),
				iframe_url: API.api_url_base + "8080/dashboard/"
			}
		},
		methods: {
			/**
			 * Get Services
			 */
			getServices: function (){
				API.send(this.api_config, "/service", null, response => {
					let services = {};
					response.forEach(function (value, i) {
						services[value.id] = value;
					}, this);
					this.getProcesses(services);
				}, null);
			},

			/**
			 * Get Services
			 * @param {object}	services
			 */
			getProcesses: function(services) {
				API.send(this.api_config, "/process"+ '?_filters={"userId":"' + window.localStorage.getItem('defpi_userId') + '"}', null, response => {
					let processes = [];
					response.forEach(function(value) {
						if(services[value.serviceId].id !== "dashboard-gateway" && services[value.serviceId].id !== "dashboard") {
							value["service"] = services[value.serviceId];
							processes.push(value);
						}
					}, this);
					this.getWidgets(processes);
				}, null);
			},

			/**
			 * Get Widgets
			 * @param {object}	processes
			 */
			getWidgets: function (processes) {
				API.send(new Config(PORT.GATEWAY, CONTENT_TYPE.NONE, METHOD.GET), "/getWidgets", {}, response => {
					// Create a new object to store processes with their services based on processId
					let processList = {};
					let tempWidgetsFullscreen = [];
					let _tempWidgets = [];
					let tempWidgets = {};

					processes.forEach(function(value,key) {
						processList[value.id] = value;
						tempWidgets[value.id] = {
							process: value,
							service: value.service
						};
					});

					response.forEach(function(value,key) {
						// Add the correct process and service to widget
						value.process = processList[value.processId];
						value.service = value.process.service;

						switch(value.type) {
							case 'FULL_WIDGET':
								console.log('FULL: \t' + value.widgetId + '\t' + value.toString());
								console.log(value);
								tempWidgetsFullscreen.push(value);
								delete tempWidgets[value.process.id];
								break;

							default:
							case 'SMALL_WIDGET':
								console.log('SMALL: \t' + value.widgetId + '\t' + value.toString());
								console.log(value);
								delete tempWidgets[value.process.id];
								_tempWidgets.push(value);
								break;
						}
					});

					Object.keys(tempWidgets).forEach(function(value,key) {
						if(tempWidgets[value])
							_tempWidgets.push(tempWidgets[value]);
					});

					this.widgets = _tempWidgets;
					this.widgetsFullscreen = tempWidgetsFullscreen;
					this.widgetLoading = false;
				}, null);
			},

			/**
			 * Check if a process has a Fullscreen widget
			 * @param {number}	id
			 */
			hasFullscreenWidget: function(id) {
				if(this.widgetsFullscreen.length < 1)
					return false;
				this.widgetsFullscreen.forEach(function(value,key){
					if(value.widgetId === id)
						return true;
				});
				return false;
			},
			/**
			 * Get Fullscreen widget
			 * @param {number}	id
			 */
			getFullScreenWidget: function(id) {
				this.widgetsFullscreen.forEach(function(value,key){
					if(value.widgetId === id)
						return value;
				});
			},

			/**
			 * Retrieves a set of initials based on app name
			 * @param name Name of the app
			 * @returns {string} Initials
			 */
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
			this.getServices();
			setInterval(function () {
				this.getServices();
			}.bind(this), 7500);

			API.send(new Config(PORT.ORCHESTRATOR, CONTENT_TYPE.NONE, METHOD.GET), "/user/by_username/" + window.localStorage.getItem('defpi_username'), null, response => {
				window.localStorage.setItem("defpi_userId", response.id);
			}, null);
		}
	}
</script>

<style>
	.v-toolbar__content {
		padding: 0px !important;
	}
	iframe {
		border: none;
	}
</style>
