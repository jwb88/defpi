<template>
	<v-app class="background">
		<v-container>
			<v-toolbar color="primary" app height="70px">
					<v-layout class="text-xs-center">
						<v-flex>
							<h1 class="primary--text text--lighten-1 pa-1">Connection Manager</h1>
						</v-flex>
					</v-layout>
				</v-toolbar>
			<v-layout wrap justify-center>
				<v-flex xs4>
					<v-card height="500px">
						<v-flex v-for="i in applications" ma-3 pa-2>
						<v-list-tile wrap ripple @click="">
							{{ i }}
						</v-list-tile>
						</v-flex>
					</v-card>
				</v-flex>
				<v-divider vertical></v-divider>
				<v-flex xs12 sm6>
					<v-card row wrap xs12 sm6 height="500px">
							<v-flex ma-3 pa-2>
								<v-card>
									<v-card>
											Test
									</v-card>
								</v-card>
							</v-flex>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</v-app>
</template>
<script>
	export default {
		data () {
			return {
				applications: ["applicatie-1","applicatie-2","applicatie-3"]
			}
		}
	}
</script>

