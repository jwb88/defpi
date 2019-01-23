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

		<!-- Edit password -->
		<v-dialog v-model="dialog_password" width="500">
			<v-card>
				<v-card-title class="headline primary" primary-title>Change password</v-card-title>
				<v-form v-model="dpw_valid" class="pa-3">
					<v-text-field v-model="changePassword.password"
								  :rules="[rules.required, rules.passwordLength]"
								  label="Enter new password" required type="password" placeholder="Please enter a new password..."></v-text-field>
					<v-text-field v-model="changePassword.passwordConfirm"
								  :rules="[rules.required, rules.passwordLength, rules.passwordMatch]"
								  label="Confirm password" required type="password" placeholder="Please confirm your password..."></v-text-field>
					<v-btn @click="dialog_password = false" :disabled="!dpw_valid">submit</v-btn>
					<v-btn @click="clear()">clear</v-btn>
				</v-form>
			</v-card>
		</v-dialog>

		<!-- Edit email -->
		<v-dialog v-model="dialog_email" width="500">
			<v-card>
				<v-card-title class="headline primary" primary-title="">
					Change email-address
				</v-card-title>
				<v-form v-model="dem_valid" class="pa-3">
					<v-text-field v-model="changeEmail.email"
								  :rules="[rules.required, rules.validEmail]"
								  label="New email-address" required type="text" placeholder="Please enter a new email..."></v-text-field>
					<v-text-field v-model="changeEmail.emailConfirm"
								  :rules="[rules.required, rules.validEmail, rules.emailMatch]"
								  label="Confirm email-address" required type="text" placeholder="Please confirm your email..."></v-text-field>
					<v-btn @click="dialog_email = false" :disabled="!dem_valid">submit</v-btn>
					<v-btn @click="clear()">clear</v-btn>
				</v-form>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
	import { API, Config, PORT, CONTENT_TYPE, METHOD } from "../../js/api.js";

	export default {
		data () {
			return {
				dialog_password: false,
				dialog_email: false,
				information: {},
				dialogDisconnect: false,
				dialogConnect: false,
				api_config: new Config(PORT.ORCHESTRATOR, CONTENT_TYPE.NONE, METHOD.GET),
				valid: false,
				username: '',
				dem_valid: false,
				dpw_valid: false,
				changeEmail: {
					email: '',
					emailConfirm: ''
				},
				changePassword: {
					password: '',
					passwordConfirm: ''
				},
				rules: {
					validEmail: v => /.+@.+/.test(v) || 'Invalid e-mail',
					passwordLength: v => v.length < 255 || 'Password must be less than 255 characters',
					required: v => !!v || 'This field is required',
					passwordMatch: v => {
						return v === this.changePassword.password || 'Password doesn\'t match.'
					},
					emailMatch: v => {
						return v === this.changeEmail.email || 'Email doesn\'t match.'
					}
				}
			}
		},
		methods: {
			getUserData: function () {
				API.send(this.api_config, "/user/by_username/" + window.localStorage.getItem("defpi_username"), [], response => {
					console.log(response);
					this.information = response;
					this.information.password = "*******";
				}, null);
			},
			clear: function() {
				this.dialog_email = false;
				this.dialog_password = false;
				this.changeEmail = { email: '', emailConfirm: '' };
				this.changePassword = { password: '', passwordConfirm: '' };
			}
		},
		mounted() {
			this.getUserData();
			setInterval(function() {
				this.getUserData();
			}.bind(this), 12500)
		}
	}
</script>
