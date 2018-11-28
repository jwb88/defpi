<template>
	<v-container>
		<v-toolbar color="primary" app height="128px">
			<v-layout v-for="fullscreenWidget in fullscreenWidgets" justify-center wrap>
				<div class="fullscreenWidget"
					 v-bind:style="{backgroundImage: 'url(' + fullscreenWidget.icon_url + ')'}"></div>
				<h4>{{ fullscreenWidget.title }}</h4>
			</v-layout>
		</v-toolbar>

		<v-container fill-height fluid>
			<v-layout row wrap>
				<v-flex v-for="widget in widgets" xs12 sm6 md4 lg3 style="min-width: 256px;">
					<div align="center">
						<div class="widget">
							<h2> {{ widget.title }} </h2>
							<div v-html="widget.iframe"></div>
						</div>
					</div>
				</v-flex>
			</v-layout>
		</v-container>
	</v-container>
</template>

<script>
	export default {
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
					{title: "Battery"},
					{title: "GridConnect"},
				],
				widgets: [
					{
						title: "Battery",
						iframe: '<iframe class="widgetIframe" width="256px" height="256px" src="https://google.nl"></iframe>'
					},
					{
						title: "Miele Wasmachine P039",
						iframe: '<iframe class="widgetIframe" width="256px" height="256px" src="https://google.nl"></iframe>'
					},
					{
						title: "Battery Widget",
						iframe: '<iframe class="widgetIframe" width="256px" height="256px" src="https://google.nl"></iframe>'
					},
					{
						title: "Battery Widget",
						iframe: '<iframe class="widgetIframe" width="256px" height="256px" src="https://google.nl"></iframe>'
					},
					{
						title: "Battery Widget",
						iframe: '<iframe class="widgetIframe" width="256px" height="256px" src="https://google.nl"></iframe>'
					},
					{
						title: "Battery Widget",
						iframe: '<iframe class="widgetIframe" width="256px" height="256px" src="https://google.nl"></iframe>'
					},
					{
						title: "Battery Widget",
						iframe: '<iframe class="widgetIframe" width="256px" height="256px" src="https://google.nl"></iframe>'
					},
					{
						title: "Battery Widget",
						iframe: '<iframe class="widgetIframe" width="256px" height="256px" src="https://google.nl"></iframe>'
					},
				]
			}
		}
	}
</script>

<style scoped>
	.widget {
		background: #000;
		width: 256px;
		box-shadow: 0px 4px 2px rgba(0, 0, 0, 0.4);
	}

	.widget h2 {
		overflow: hidden;
		background: #7DB530;
		color: #FFF;
	}

	.fullscreenWidget {
		width: 80px;
		height: 80px;
		border-radius: 100%;
		border-width: 100px;
		background: #fff no-repeat center;
		background-size: 100%;
		transition: all 0.2s;
	}

	.fullscreenWidget:hover {
		background-size: 140%;
	}
</style>

<style>
	.widgetIframe {
		border: none;
		background: #181818;
	}
</style>
