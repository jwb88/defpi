<template>
	<v-container>
		<v-layout>
			<v-flex xs12>
				<v-card>
					<v-layout wrap row pa-4 ma-2>
						<h2><b>Username:</b> {{information.username}}</h2>
					</v-layout>
				</v-card>
				<v-card>
					<v-layout wrap row pa-4 ma-2>
						<h2><b>Password:</b> {{information.password}}</h2>
						<v-flex app class="text-xs-right">
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
						</v-flex>
					</v-layout>
				</v-card>
				<v-card>
					<v-layout  pa-4 ma-2>
						<h2><b>Email:</b> {{information.email}}</h2>
						<v-flex app class="text-xs-right">
							<v-dialog
								v-model="dialog"
								width="500"
							>
								<v-btn
									slot="activator"
									icon ripple
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
										Change email-address
									</v-card-title>
									<v-form v-model="valid" class="pa-3">
										<v-text-field
											v-model="name"
											:rules="nameRules"
											label="New email-address"
											required
											type="text"
										></v-text-field>
										<v-text-field
											v-model="email"
											:rules="emailRules"
											label="Confirm email-address"
											required
											type="text"
										></v-text-field>
										<v-btn @click="dialog = false">submit</v-btn>
										<v-btn @click="dialog = false">clear</v-btn>
									</v-form>
								</v-card>
							</v-dialog>
						</v-flex>
					</v-layout>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	export default {
		data () {
			return {
				information: {
					id: 0,
					username: "Gebruiker",
					password: "*********",
					email: "gebruiker@hotmail.com",
				},
				dialogDisconnect: false,
				dialogConnect: false,
			}
		}
	}
</script>
