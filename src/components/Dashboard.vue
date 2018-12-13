<template>
	<v-app class="background">
		<!-- Fullscreen Widgets -->
		<v-toolbar height="100px" class="v-toolbar--fixed" app>
			<v-tabs height="100%" color="primary" class="" show-arrows app fixed-tabs grow>
				<v-tabs-slider type="arrow_drop_up" color="black"></v-tabs-slider>
				<v-tab v-for="(v, k) in widgets" :key="k" justify-center v-bind="{to: '/fullscreen_widget/' + k}" class="fullscreenBtn" active-class="fullscreenActive"> <!--v-if="widget.has_fullscreen_widget"-->
					<v-container class="column fill-height">
						<v-flex>
							<v-avatar v-bind:style="{backgroundImage: 'url(' + '' + ')', backgroundSize: 'contain', backgroundPosition: 'center'}"></v-avatar>
							<h4 class="hidden-sm-and-down" style="margin-top: 12px;">{{ v }}</h4>
						</v-flex>
					</v-container>
				</v-tab>
			</v-tabs>
		</v-toolbar>

		<!-- Widgets -->
		<v-content>
			<v-container v-if="$route.params.id == null" grid-list-xs fluid>
				<v-layout row wrap>
					<v-flex v-for="(v, k) in widgets" :key="k" xs12 sm6 md4 lg3> <!--v-if="widget.has_widget"-->
						<v-layout align-center justify-center>
							<v-card class="elevation-4 ma-4" style="min-width: 300px;">
								<v-card-title class="primary darken-1 title primary--text text--lighten-1 pa-1" color="primary"><v-avatar v-bind:style="{backgroundImage: 'url(' + '' + ')', backgroundSize: 'contain', backgroundPosition: 'center', marginRight: '20px'}"></v-avatar>{{v}}</v-card-title>
								<v-responsive style="width:300px; height: 170px;"><iframe width="100%" height="100%" v-bind:src="'http://localhost:8080/dashboard/'+k+'/index.html'"></iframe></v-responsive>
							</v-card>
						</v-layout>
					</v-flex>
				</v-layout>
			</v-container>

			<v-container v-else>
				<v-card v-if="widgets[$route.params.id] != null">
					<v-card-title class="title">{{ widgets[$route.params.id] }}</v-card-title>
					<v-responsive height="1200px"><iframe width="100%" height="100%" :src="'http://localhost:8080/dashboard/' + $route.params.id + '/index.html'"></iframe></v-responsive>
				</v-card>
				<v-card v-else>
					<v-card-title class="title">[404] Deze App is niet aanwezig... :(</v-card-title>
				</v-card>
			</v-container>
		</v-content>

		<Menu :menu="menu"></Menu>
	</v-app>
</template>

<script>
	import Menu from './Menu'

	export default {
		props: ["menu", "API"],
		components: {
			Menu
		},
		data() {
			return {
				widgets: []
			}
		},
		methods: {
			getWidgets: function () {
				this.API.post("8080", "/dashboard/getWidgets", [], response => this.widgets = response.data);
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
