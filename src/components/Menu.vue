<template>
	<v-container>
		<!-- BIG FOOTER THING -->
		<v-footer class="background darken-1 pa-3" height="auto" app>
			<v-layout row wrap>
				<v-toolbar-side-icon @click.stop="drawer = !drawer" large class="hidden-lg-and-up"
									 app></v-toolbar-side-icon>
				<v-layout class="hidden-md-and-down">
					<v-layout v-for="item in menu"  :key="item.url">
							<v-btn class="pa-4.5 title" v-bind="{to: item.url}" active-class="primary">
								<v-icon class="btn_arrow">arrow_drop_down</v-icon>
								<v-icon class="pr-1" medium>{{item.icon}}</v-icon> <!--{{ $route.path }}-->
								{{item.text}}
							</v-btn>
					</v-layout>
					<v-layout class="justify-end">
						<v-btn class="pa-4.5 title" v-bind="{to: '/logout'}" @click="logout">
							<v-icon class="pr-1" medium>logout</v-icon>Logout
						</v-btn>
					</v-layout>
				</v-layout>

				<!--<v-flex primary lighten-1 py-3 text-xs-center xs12> &copy;{{ new Date().getFullYear() }} — <strong>dEF-PI</strong> </v-flex>-->
			</v-layout>
		</v-footer>

		<!-- SIDE MENU -->
		<v-navigation-drawer class="hidden-lg-and-up" v-model="drawer" temporary app>
			<v-list v-for="item in menu" :key="item.url">
				<v-list-group v-if="(item.sub_items.length > 0)">
					<v-list-tile slot="activator" ripple class="v-list--three-line">
						<v-list-tile-action>
							<v-icon large>{{ item.icon }}</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title class="title">{{ item.text }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>

					<v-list-tile v-for="subItem in item.sub_items" :key="subItem.url"  ripple v-bind="{to: subItem.url}" class="v-list--two-line">
						<v-list-tile-action>
							<v-icon medium class="ml-3">{{ subItem.icon }}</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title class="ml-3 subheading">{{ subItem.text }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list-group>

				<v-list-tile v-else ripple v-bind="{to: item.url}" class="v-list--three-line">
					<v-list-tile-action>
						<v-icon large>{{ item.icon }}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title class="title">{{ item.text }}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
	</v-container>
</template>


<script>
	export default {
		data() {
			return {
				menu: this.$MENU,
				bottomNav: null,
				drawer: false,
				api_config: {
					port: 			this.$API.PORT.GATEWAY,
					contentType: 	this.$API.CONTENT_TYPE.WWW_FORM,
					method: 		this.$API.METHOD.POST,
				}
			}
		},
		methods: {
			logout: function() {
				this.$API.send(this.api_config, "/logout", null, () => { document.location = "/" });
			}
		}
	}
</script>

<style scoped>
	.v-footer {
		box-shadow: 0 -3px 2px rgba(0,0,0,0.2);
	}
	.pa-4\.5 {
		padding: 34px;
	}

	.btn_arrow {
		display: none;
	}

	.v-btn.primary .btn_arrow {
		color: rgba(0,0,0,0.4);
		font-size: 60px;
		display: inline-block !important;
		position: absolute;
		margin-top: -50px;
	}
</style>
