<template>
	<v-app class="background">
		<v-container>
			<v-layout>
				<v-flex xs12>
					<v-toolbar class="primary pa-2" app height="70px">
						<h1>My Apps</h1>
					</v-toolbar>
					<v-list two-line subheader>
						<v-list-tile
							v-for="item in items"
							:key="item.title"
							avatar
						>
							<v-list-tile-avatar>
								<v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
							</v-list-tile-avatar>

							<v-list-tile-content>
								<v-list-tile-sub-title>{{ item.title }}</v-list-tile-sub-title>
								<v-list-tile-title>{{ item.subtitle }}</v-list-tile-title>
							</v-list-tile-content>

						</v-list-tile>

						<v-divider inset></v-divider>

						<v-list-tile
							v-for="item in items2"
							:key="item.title"
							avatar
						>
							<v-list-tile-avatar>
								<v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
							</v-list-tile-avatar>

							<v-list-tile-content>
								<v-list-tile-sub-title>{{ item.title }}</v-list-tile-sub-title>
								<v-list-tile-title>{{ item.subtitle }}</v-list-tile-title>
							</v-list-tile-content>

							<v-list-tile-action>
								<v-dialog
									v-model="dialog"
									width="500"
								>
								<v-btn
									icon ripple
									slot="activator"
								>
									<v-icon color="grey lighten-1">
										edit
									</v-icon>
								</v-btn>
									<v-card>
									<v-card-title
										class="headline primary"
										primary-title
									>
										Change password
									</v-card-title>
									<v-form v-model="valid" class="pa-3">
										<v-text-field
											v-model="name"
											:rules="nameRules"
											label="Current password"
											required
											type="password"
										></v-text-field>
										<v-text-field
											v-model="email"
											:rules="emailRules"
											label="Enter new password"
											required
											type="password"
										></v-text-field>
										<v-text-field
											v-model="email"
											:rules="emailRules"
											label="Confirm password"
											required
											type="password"
										></v-text-field>
										<v-btn @click="dialog = false">submit</v-btn>
										<v-btn @click="dialog = false">clear</v-btn>
									</v-form>
									</v-card>
								</v-dialog>
							</v-list-tile-action>
						</v-list-tile>
					</v-list>
				</v-flex>
			</v-layout>
		</v-container>
	</v-app>
</template>

<script>
	export default {
		data () {
			return {
				dialog: false,
				items: [
					{ icon: 'assignment_ind', iconClass: 'grey white--text', title: 'Username', subtitle: 'Gebruiker' },
				],
				items2: [
					{ icon: 'lock', iconClass: 'grey white--text', title: 'Password', subtitle: '*******' },
				]
			}
		}
	}
</script>
