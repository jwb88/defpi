<template>
	<v-app class="background">
		<!-- Fullscreen Widgets -->
		<v-toolbar height="100px" class="v-toolbar--fixed" app>
			<v-tabs height="100%" color="primary" class="" show-arrows app fixed-tabs grow>
				<v-tabs-slider type="arrow_drop_up" color="black"></v-tabs-slider>
				<v-tab v-for="fullscreenWidget in fullscreenWidgets" :key="fullscreenWidget.id" justify-center v-bind="{to: '/fullscreen_widget/' + fullscreenWidget.id}" class="fullscreenBtn" active-class="fullscreenActive">
					<v-container class="column fill-height">
						<v-flex>
							<v-avatar v-bind:style="{backgroundImage: 'url(' + fullscreenWidget.icon_url + ')', backgroundSize: 'contain', backgroundPosition: 'center'}"></v-avatar>
							<h4 class="hidden-sm-and-down" style="margin-top: 12px;">{{ fullscreenWidget.title }}</h4>
						</v-flex>
					</v-container>
				</v-tab>
			</v-tabs>
		</v-toolbar>

		<!-- Widgets -->
		<v-content>
			<v-container v-if="$route.params.id == null" grid-list-xs fluid>
				<v-layout row wrap>
					<v-flex v-for="widget in widgets" :key="widget.id" xs12 sm6 md4 lg3>
						<v-layout align-center justify-center>
							<v-card class="elevation-4 ma-4" style="min-width: 300px;">
								<v-card-title class="primary darken-1 title primary--text text--lighten-1 pa-1" color="primary"><v-icon color="primary lighten-1" large>battery_charging_full</v-icon>{{widget.title}}</v-card-title>
								<v-responsive v-html="widget.iframe" style="width:300px; height: 170px;"></v-responsive>
							</v-card>
						</v-layout>
					</v-flex>
				</v-layout>
			</v-container>

			<v-container v-else>
				<v-card v-if="fullscreenWidgets[$route.params.id] != null">
					<v-card-title class="title">{{ fullscreenWidgets[$route.params.id].title }}</v-card-title>
					<v-responsive height="1200px" v-html="fullscreenWidgets[$route.params.id].iframe"></v-responsive>
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
		props: ["menu"],
		components: {
			Menu
		},
		data() {
			return {
				fullscreenWidgets: [
					{
						id: 0,
						title: "Miele",
						icon_url: "https://pbs.twimg.com/profile_images/959009047977582592/Yrzj3piC_400x400.jpg",
						iframe: '<iframe width="100%" height="100%" src="/src/widgets/battery.html"></iframe>'
					},
					{
						id: 1,
						title: "Smart Energy",
						icon_url: "https://www.davehewer.com/wp-content/uploads/2018/02/greenleaf-logo-branding03.png"
					},
					{
						id: 2,
						title: "Vue Power",
						icon_url: "https://pbs.twimg.com/profile_images/875996174305472512/upM71pVR_400x400.jpg"
					},
					{
						id: 3,
						title: "Battery",
						icon_url: "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/BTrHt7uCiu335hjs/battery-icon-charging-hd-animation-pixel-art-style-on-white-background_syetkwefsx_thumbnail-full01.png"
					},
					{
						id: 4,
						title: "GridConnect",
						icon_url: "https://azure.microsoft.com/svghandler/event-grid/?width=600&height=315"
					},
				],
				widgets: [
					{
						id:	0,
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
					{
						id:	1,
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
					{
						id:	2,
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
					{
						id:	3,
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
					{
						id:	4,
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
					{
						id:	5,
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
					{
						id:	6,
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
					{
						id:	7,
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
					{
						id:	8,
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
					{
						id:	9,
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
					{
						id:	10,
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
					{
						id:	11,
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
				]
			}
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
