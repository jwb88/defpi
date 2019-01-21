<template>
	<v-container>
		<v-flex>
			<v-flex xs12>
				<!--Device Table-->
					<v-data-table :headers="headers" :items="devices" class="elevation-1" hide-actions>
						<template slot="items" slot-scope="props">
							<td class="title pa-4" @click="open_dialog(props.item)">{{ props.item.name }}</td>
							<td class="pa-4"  @click="open_dialog(props.item.id)">{{ props.item.id}}</td>
							<td class="pa-4" <v-icon @click="open_dialog(props.item)">create</v-icon></td>
							<td class="pa-4" <v-icon @click="open_removeDialog(props.item)">delete</v-icon></td>
						</template>
					</v-data-table>
							<v-dialog
								v-model="device_dialog"
								width="500"
							>
								<v-card>
									<v-card-title
										class="headline primary"
										primary-title
									>
										Settings
									</v-card-title>

									<v-card-text>
										General Information {{ selectedDevice.name}}
									</v-card-text>
									<v-list-tile>
										Name: {{ selectedDevice.name }}
									</v-list-tile>
									<v-list-tile>
										Id: {{ selectedDevice.id }}
									</v-list-tile>
									<v-list-tile>
										Status: {{ selectedDevice.status}}
									</v-list-tile>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn
											color="primary"
											@click="close_dialog()"
										>
											<v-icon>check</v-icon>Yes
										</v-btn>
										<v-btn
											color="red lighten-1"
											dark
											@click="close_dialog()"
										>
											<v-icon>close</v-icon>No
										</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>

				<v-dialog
					v-model="dialogDisconnect"
					width="500">
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
								@click="removeDevice(selectedDevice.id) ; close_removeDialog() "
							>
								<v-icon>check</v-icon>Yes
							</v-btn>
							<v-btn
								color="red lighten-1"
								dark
								@click="close_removeDialog()"
							>
								<v-icon>close</v-icon>No
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
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
						<v-text-field label="Enter Identifier"></v-text-field>
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
	import { API, Config, PORT, CONTENT_TYPE, METHOD } from "../../js/api.js";

	export default {
		name: "MyDevices",
		components: {

		},
		data() {
			return {
				api_config: new Config(PORT.ORCHESTRATOR, CONTENT_TYPE.JSON, METHOD.GET),
				headers: [
					{text: "Name", value: "name"},
					{text: "Token", value: "id"},
				],
				list: [],
				devices: [
					{
						id: 0,
						name: "Raspberry Pi 1",
					},
					{
						id: 1,
						name: "Raspberry Pi 2"
					},
					{
						id: 2,
						name: "Cloud Server 1"
					}
				],
				dialogDisconnect: false,
				dialogConnect: false,
				device_dialog: false,

				selectedDevice: {
					id: "",
					ip_address: "unknown",
					notifications: {},
				},
			}
		},
		methods: {

			retrieveDevices: function(){
				API.send(this.api_config, "/privatenode", [], response => {
					console.log(response);
					this.list = response;

				for(let key in this.list) {
					this.devices.push(this.list[key])
					//this.devices = [
					//	{
					//		id: this.list[key].id,
					//		name: this.list[key].name
					//	}

					//]
				}
				}
			)},

			/* Dialog Methods */
			open_dialog: function(device) {
				this.selectedDevice = device;
				this.device_dialog = true;
			},
			open_removeDialog: function(device){
				this.selectedDevice = device;
				this.dialogDisconnect = true;
			},
			close_removeDialog: function(){
				this.dialogDisconnect = false;
			},
			close_dialog: function() {
				this.selectedDevice = {};
				this.device_dialog = false;
			},

			pushNewDevice: function (id, deviceName) {
				this.devices.push({
					id: id,
					name: deviceName,
				})
			},
			removeDevice: function (selectedDevice) {
				for(var index in this.devices){
					if (this.devices[index].id == selectedDevice){
						this.devices.splice(index, 1)
					}
				}
			}
		},
		mounted () {
			this.retrieveDevices();
		}
	}
</script>
