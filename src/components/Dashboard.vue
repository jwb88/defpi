<template>
	<v-app class="background">
		<!-- Fullscreen Widgets -->
		<v-container>
			<v-toolbar class="primary pa-2" app height="128px">
				<v-layout v-for="fullscreenWidget in fullscreenWidgets" justify-center wrap>
					<v-layout row xs12 md6>
						<v-flex class="text-xs-center">
							<v-btn large ripple fab v-bind:style="{backgroundImage: 'url(' + fullscreenWidget.icon_url + ')', backgroundSize: 'contain', backgroundPosition: 'center'}" v-bind="{to: '/fullscreen_widget/' + fullscreenWidget.id}"></v-btn>
							<h4 class="hidden-sm-and-down">{{ fullscreenWidget.title }}</h4>
						</v-flex>
					</v-layout>
				</v-layout>
			</v-toolbar>
		</v-container>

		<!-- Widgets -->
		<v-content>
			<v-container v-if="$route.params.id == null" grid-list-xs fluid>
				<v-layout row wrap>
					<v-flex v-for="widget in widgets" xs12 sm6 md4 lg3>
						<v-layout align-center justify-center>
							<v-card class="elevation-4 ma-4" style="min-width: 300px;">
								<v-card-title class="primary darken-1 title pa-1"><v-icon large>battery_charging_full</v-icon>{{widget.title}}</v-card-title>
								<v-card-media v-html="widget.iframe" style="width:300px; height: 170px;"></v-card-media>
							</v-card>
						</v-layout>
					</v-flex>
				</v-layout>
			</v-container>

			<v-container v-else>
				<v-card class="fill-height" v-if="fullscreenWidgets[$route.params.id] != null">
					<v-card-text>
						<v-card-title class="title">{{ fullscreenWidgets[$route.params.id].title }}</v-card-title>
						<v-card-media v-html="fullscreenWidgets[$route.params.id].iframe"></v-card-media>
					</v-card-text>
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
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
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
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
					{
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
					{
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
					{
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
					{
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
					{
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
					{
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
					{
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
					{
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
					{
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
					{
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
					{
						title: "Battery",
						iframe: '<iframe src="/src/widgets/battery.html"></iframe>'
					},
				]
			}
		}
	}
</script>
