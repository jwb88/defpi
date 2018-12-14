<template>
	<v-app class="background">
		<v-container>
			<v-flex>
				<v-flex xs12>
					<v-toolbar color="primary" app height="70px">
						<v-layout class="text-xs-center">
							<v-flex>
								<h1>My Devices</h1>
							</v-flex>
						</v-layout>
					</v-toolbar>
					<v-card v-for="device in devices">
						<v-layout align-center justify-center wrap row pa-4 ma-3>
							<h2>{{device.deviceName}}</h2>
							<v-flex app class="text-xs-right">
								<v-btn large>Disconnect</v-btn>
							</v-flex>
						</v-layout>
					</v-card>
				</v-flex>
			</v-flex>
			<v-layout align-start justify-end row>
				<v-btn class="right" large>Add Device</v-btn>
			</v-layout>
		</v-container>
	</v-app>
</template>
<script>
	export default {
		name: "MyDevices",
		components: {

		},
		data() {
			return {
				devices: [
					{
						id: 0,
						deviceName: "Raspberry Pi 1",
					},
					{
						id: 1,
						deviceName: "Raspberry Pi 2"
					},
					{
						id: 2,
						deviceName: "Cloud Server 1"
					}
				]
			}
		}
	}
</script>
