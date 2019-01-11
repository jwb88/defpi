<template>
	<v-container>
		<v-flex>
			<v-flex xs12>
				<v-card v-for="device in devices">
					<v-layout align-center justify-center wrap row pa-4 ma-3>
						<h2>{{device.deviceName}}</h2>
						<v-flex app class="text-xs-right">
							<v-dialog
								v-model="dialogDisconnect"
								width="500"
								:key="device.id"
							>
								<v-btn
									slot="activator"
									color="red lighten-2"
									large
								>
									Disconnect
								</v-btn>
								<v-card>
									<v-card-title
										class="headline primary"
										primary-title
									>
										Confirm action
									</v-card-title>

									<v-card-text>
										Are you sure you want to disconnect this device?
									</v-card-text>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn
											color="primary"
											@click="removeDevice(device.id) ; dialogDisconnect = false"
										>
											<v-icon>check</v-icon>Yes
										</v-btn>
										<v-btn
											color="red lighten-1"
											dark
											@click="dialogDisconnect = false"
										>
											<v-icon>close</v-icon>No
										</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</v-flex>
					</v-layout>
				</v-card>
			</v-flex>
		</v-flex>
		<v-layout align-start justify-end row>
			<v-dialog
				v-model="dialogConnect"
				width="500"
			>
				<v-btn
					slot="activator"
					color="primary"
					class="right"
					large
				>
					Add Device
				</v-btn>
				<v-card>
					<v-card-title
						class="headline primary"
						primary-title
					>
						Connect device
					</v-card-title>

					<v-card-text>
						<v-text-field label="Enter device name"></v-text-field>
						<v-text-field label="Enter IP Address"></v-text-field>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							activator
							color="primary"
							@click="pushNewDevice(Math.random(), 'Test') ; dialogConnect = false"
						>
							<v-icon>check</v-icon>Confirm
						</v-btn>
						<v-btn
							color="red lighten-1"
							dark
							@click="dialogConnect = false"
						>
							<v-icon>close</v-icon>Cancel
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-layout>
	</v-container>
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
				],
				dialogDisconnect: false,
				dialogConnect: false
			}
		},
		methods: {
			pushNewDevice: function (id, deviceName) {
				this.devices.push({
					id: id,
					deviceName: deviceName,
				})
			},
			removeDevice: function (id) {
				console.log("This is the starter id: "+id)
				for(var index in this.devices) {
					console.log(index)
				}
			}
		},
	}
</script>
