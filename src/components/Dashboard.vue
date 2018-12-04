<template>
	<v-app class="background">
		<v-container>
			<v-toolbar class="primary pa-2" app height="128px">
				<v-layout v-for="fullscreenWidget in fullscreenWidgets" justify-center wrap>
					<v-layout row xs12 md6>
						<v-flex class="text-xs-center">
							<v-btn large ripple fab v-bind:style="{backgroundImage: 'url(' + fullscreenWidget.icon_url + ')', backgroundSize: 'contain', backgroundPosition: 'center'}"></v-btn>
							<h4 class="hidden-sm-and-down">{{ fullscreenWidget.title }}</h4>
						</v-flex>
					</v-layout>
				</v-layout>
			</v-toolbar>
		</v-container>

		<v-content>
			<v-container grid-list-xs fluid>
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
						title: "Miele",
						icon_url: "https://pbs.twimg.com/profile_images/959009047977582592/Yrzj3piC_400x400.jpg"
					},
					{
						title: "Smart Energy",
						icon_url: "https://www.davehewer.com/wp-content/uploads/2018/02/greenleaf-logo-branding03.png"
					},
					{
						title: "Vue Power",
						icon_url: "https://pbs.twimg.com/profile_images/875996174305472512/upM71pVR_400x400.jpg"
					},
					{
						title: "Battery",
						icon_url: "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/BTrHt7uCiu335hjs/battery-icon-charging-hd-animation-pixel-art-style-on-white-background_syetkwefsx_thumbnail-full01.png"
					},
					{
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
