<template>
	<v-container>
		<!-- Footer Desktop -->
		<v-footer class="background darken-1 pa-3" height="auto" :absolute="$vuetify.breakpoint.mdAndDown" app>
			<v-layout row wrap>
				<v-toolbar-side-icon @click.stop="drawer = !drawer" large class="hidden-lg-and-up"
									 app></v-toolbar-side-icon>
				<v-layout class="hidden-md-and-down">
					<v-layout v-for="item in menu"  :key="item.url">
						<v-layout>
							<v-btn class="pa-4.5 title" v-bind="{to: item.url}" active-class="primary">
								<v-layout align-center justify-center style="position:absolute;top:-65px;width:100%;">
									<v-icon class="selector_arrow">arrow_drop_down</v-icon>
								</v-layout>
								<v-icon class="pr-1" medium>{{item.icon}}</v-icon>
								{{item.text}}
							</v-btn>
						</v-layout>
					</v-layout>
					<v-layout class="justify-end">
						<a class="pa-4.5 title v-btn v-btn--router theme--light" href="/logout">
							<div class="v-btn__content">
								<v-icon class="pr-1" medium>logout</v-icon>Logout
							</div>
						</a>
					</v-layout>
				</v-layout>
			</v-layout>
		</v-footer>

		<!-- Side Menu -->
		<v-navigation-drawer class="hidden-lg-and-up" v-model="drawer" fixed app>
			<v-list>
				<v-list-group v-for="item in menu" :key="item.url" v-if="(item.sub_items.length > 0)">
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

				<v-list-tile ripple class="v-list--two-line" href="/logout">
					<v-list-tile-action>
						<v-icon large>logout</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title class="title">Logout</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
	</v-container>
</template>


<script>
	import { API, Config, PORT, CONTENT_TYPE, METHOD } from "../js/api.js";

	export default {
		data() {
			return {
				menu: this.$MENU,
				bottomNav: null,
				drawer: false,
				api_config: new Config(PORT.GATEWAY, CONTENT_TYPE.WWW_FORM, METHOD.POST)
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

	.selector_arrow {
		display: none;
	}

	.v-btn.primary .selector_arrow {
		color: rgba(0,0,0,0.4);
		font-size: 60px;
		display:inline-block;
	}
</style>
