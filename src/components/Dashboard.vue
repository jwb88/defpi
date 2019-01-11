<template>
	<v-app class="background">
		<!-- Fullscreen Widgets -->
		<v-toolbar height="100px" class="v-toolbar--fixed elevation-4" app>
			<v-tabs height="100%" color="primary" class="" show-arrows app fixed-tabs grow :hide-slider="($route.params.id == null)">
				<v-tabs-slider type="arrow_drop_up" color="black"></v-tabs-slider>
				<v-tab v-for="(v, k) in widgets" :key="k" justify-center v-bind="{to: '/fullscreen_widget/' + k}" class="fullscreenBtn" active-class="fullscreenActive"> <!--v-if="widget.has_fullscreen_widget"-->
					<v-container class="column fill-height">
						<v-flex>
							<v-avatar v-if="v.icon_url != null" class="primary lighten-3" v-bind:style="{backgroundImage: 'url(' + '' + ')', backgroundSize: 'contain', backgroundPosition: 'center'}"></v-avatar>
							<v-avatar v-else class="primary lighten-3 font-weight-bold">{{ getInitials(v) }}</v-avatar>
							<h4 class="hidden-sm-and-down white--text" style="margin-top: 12px;">{{ v }}</h4>
						</v-flex>
					</v-container>
				</v-tab>
			</v-tabs>
		</v-toolbar>

		<!-- Widgets -->
		<v-content>
			<v-container v-if="$route.params.id == null" grid-list-xs fluid>
				<v-layout row wrap>
					<v-flex v-if="widgets[0] == null">
						<v-layout align-center justify-center>
							<v-card class="elevation-2 ma-4" style="width: 400px; height: 200px;">
								<v-card-title class="primary darken-1 title white--text pa-1" color="primary">
									Info
								</v-card-title>
								<v-card-text style="font-weight: 600;">
									It seems you do not have any apps with widgets installed yet!
									You can install apps using the button below.
									<v-divider class="mt-4"></v-divider>
									<v-btn class="primary" to="/appstore">Appstore</v-btn>
								</v-card-text>
							</v-card>
						</v-layout>
					</v-flex>
					<v-flex v-else v-for="(v, k) in widgets" :key="k" xs12 sm6 md4 lg3> <!--v-if="widget.has_widget"-->
						<v-layout align-center justify-center>
							<v-card class="elevation-2 ma-4">
								<v-card-title class="primary darken-1 title white--text pa-1" color="primary">
									<v-avatar v-if="v.icon_url != null" class="primary lighten-1 mr-3" v-bind:style="{backgroundImage: 'url(' + '' + ')', backgroundSize: 'contain', backgroundPosition: 'center'}"></v-avatar>
									<v-avatar v-else class="primary lighten-1 mr-3 black--text">{{ getInitials(v) }}</v-avatar>
									{{v}}
								</v-card-title>
								<v-responsive class="pa-4 d-inline-flex" resolution><iframe width="300px" height="170px" v-bind:src="iframe_url + k + '/index.html'"></iframe></v-responsive>
							</v-card>
						</v-layout>
					</v-flex>
				</v-layout>
			</v-container>

			<v-container v-else>
				<v-card v-if="widgets[$route.params.id] != null">
					<v-card-title class="title">{{ widgets[$route.params.id] }}</v-card-title>
					<v-responsive height="1200px"><iframe width="100%" height="100%" :src="iframe_url + $route.params.id + '/index.html'"></iframe></v-responsive>
				</v-card>
				<v-card v-else>
					<v-card-title class="title">[404] Deze App is niet aanwezig... :(</v-card-title>
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

	export default {
		components: {
			Menu
		},
		data() {
			return {
				widgetLoading: true,
				widgets: {},
				api_config: {
					port: 			this.$API.PORT.GATEWAY,
					contentType: 	this.$API.CONTENT_TYPE.WWW_FORM,
					method: 		this.$API.METHOD.POST,
				},
				iframe_url: this.$API.api_url_base + "8080/dashboard/"
			}
		},
		methods: {
			getWidgets: function () {
				this.$API.send(this.api_config, "/dashboard/getWidgets", {username: "admin", password: "admin"}, response => {
					this.widgets = response;
					this.widgetLoading = false;
					//this.widgets["7"].icon_url = "https://image.freepik.com/free-vector/cool-smiling-hop-brewing-mascot-with-sunglasses-vector-illustration-logo-icon_7688-11.jpg";
				});
			},
			getInitials: function(name) {
				let initials = name.match(/\b(\w)/g);
				return initials.join('');
			}
		},
		mounted () {
			this.getWidgets();
			setInterval(function () {
				this.getWidgets();
			}.bind(this), 5000);
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
