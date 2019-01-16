<template>
	<v-container>
		<v-dialog v-model="dialog_password" width="500">
			<v-btn icon ripple slot="activator">
				<v-icon color="grey lighten-1">
					edit
				</v-icon>
			</v-btn>
			<v-card>
				<v-card-title class="headline primary" primary-title>Change password</v-card-title>
				<v-form v-model="valid" class="pa-3">
					<v-text-field v-model="username" :rules="nameRules" label="Current password" required type="password"></v-text-field>
					<v-text-field v-model="email" :rules="emailRules" label="Enter new password" required type="password"></v-text-field>
					<v-text-field v-model="email" :rules="emailRules" label="Confirm password" required type="password"></v-text-field>
					<v-btn @click="dialog_password = false">submit</v-btn>
					<v-btn @click="dialog_password = false">clear</v-btn>
				</v-form>
			</v-card>
		</v-dialog>

		<v-dialog v-model="dialog_email" width="500">
			<v-card>
				<v-card-title class="headline primary" primary-title="">
					Change email-address
				</v-card-title>
				<v-form v-model="valid" class="pa-3">
					<v-text-field v-model="username" :rules="nameRules" label="New email-address" required type="text"></v-text-field>
					<v-text-field v-model="email" :rules="emailRules" label="Confirm email-address" required type="text"></v-text-field>
					<v-btn @click="dialog_email = false">submit</v-btn>
					<v-btn @click="dialog_email = false">clear</v-btn>
				</v-form>
			</v-card>
		</v-dialog>

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
							<v-btn @click="dialog_password=true" icon ripple>
								<v-icon color="grey lighten-1">
									edit
								</v-icon>
							</v-btn>
						</v-flex>
					</v-layout>
				</v-card>
				<v-card>
					<v-layout  pa-4 ma-2>
						<h2><b>Email:</b> {{information.email}}</h2>
						<v-flex app class="text-xs-right">
							<v-btn @click="dialog_email=true" icon ripple>
								<v-icon color="grey lighten-1">
									edit
								</v-icon>
							</v-btn>
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
				dialog_password: false,
				dialog_email: false,
				information: {},
				dialogDisconnect: false,
				dialogConnect: false,
				api_config: {
					port: 			this.$API.PORT.ORCHESTRATOR,
					contentType: 	this.$API.CONTENT_TYPE.NONE,
					method: 		this.$API.METHOD.GET,
				},
				valid: false,
				username: '',
				email: '',
				nameRules: [
					v => !!v || 'Name is required',
					v => v.length <= 10 || 'Name must be less than 10 characters'
				],
				email: '',
				emailRules: [
					v => !!v || 'E-mail is required',
					v => /.+@.+/.test(v) || 'E-mail must be valid'
				]
			}
		},
		methods: {
			getUserData: function () {
				this.$API.send(this.api_config, "/user/by_username/" + window.localStorage.getItem("defpi_username"), [], response => {
					console.log(response);
					this.information = response;
					this.information.password = "*******";
				});
			}
		},
		mounted() {
			this.getUserData();
		}
	}
</script>
