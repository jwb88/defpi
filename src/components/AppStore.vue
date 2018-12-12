<template>
	<v-app id="Appstore" class="background">
		<v-toolbar height="100px" class="v-toolbar--fixed primary" app>
			<v-layout class="text-xs-center" align-center justify-center>
				<v-form align-center justify-center>
						<v-text-field color="background--text" id="search" prepend-inner-icon="search" name="search" type="search" placeholder="Search..." style="max-width:300px;"></v-text-field>
				</v-form>
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
							<v-flex v-for="widget in widgets.widgets" :key="widget.id" xs12 sm6 md4 lg4>
								<v-layout align-center justify-center>
									<v-card class="elevation-4 ma-4" style="min-width: 300px;">
										<v-card-title class="primary darken-1 title primary--text text--lighten-1 pa-1" color="primary"><v-avatar v-bind:style="{backgroundImage: 'url(' + widget.icon_url + ')', backgroundSize: 'contain', backgroundPosition: 'center', marginRight: '20px'}"></v-avatar>{{widget.title}}</v-card-title>
										<v-responsive style="width:300px; height: 170px;"><iframe width="100%" height="100%" v-bind:src="widget.iframe_src"></iframe></v-responsive>
									</v-card>
								</v-layout>
							</v-flex>
						</v-layout>
					</v-container>
				</v-flex>
			</v-layout>
		</v-content>

		<Menu :menu="menu"></Menu>
	</v-app>
</template>

<script>
	// Temporary
	import Menu from './Menu'
	import widgets from '../widgets.json';
    export default {
		name: 'Appstore',
		props: ["menu"],
		components: {
			Menu
		},
		data () {
			return {
				widgets,
				categories: [
					{ name: 'All' },
					{ name: 'Category_One' },
					{ name: 'Category_Two' },
					{ name: 'Category_Three' },
					{ name: 'Category_Four' }
				],
			}
		}
    }
</script>

<style scoped>

</style>
