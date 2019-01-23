<template>
	<v-container>
		<v-flex>
			<v-flex xs12>
				<!--Device Table-->
				<v-data-table :headers="headers" :items="devices" class="elevation-1" hide-actions>
					<template slot="items" slot-scope="props">
						<td class="title pa-4" @click="open_dialog(props.item)">{{ props.item.name }}</td>
						<td class="pa-4" @click="open_dialog(props.item)">{{ props.item.hostname}}</td>
						<td class="pa-4" @click="open_dialog(props.item)">{{ props.item.status}}</td>
						<td class="pa-4" @click="open_dialog(props.item)">
							{{new Date( props.item.lastSync).toLocaleString() }}
						</td>
						<td class="pa-4">
							<v-icon @click="open_dialog(props.item)">create</v-icon>
							&nbsp
							<v-icon @click="open_removeDialog(props.item)">delete</v-icon>
						</td>
					</template>
				</v-data-table>
				<v-dialog v-model="device_dialog" width="500" >
					<v-card>
						<v-card-title class="headline primary" primary-title >
							Settings
						</v-card-title>

						<v-card-text>
							General Information {{ selectedDevice.name}}
						</v-card-text>
						<v-list-tile>
							Name: <v-text-field placeholder="Please enter a name..." v-model="newDeviceName" :rules="[rules.required, rules.allowedName, rules.sizeLimit]"></v-text-field>
						</v-list-tile>
						<v-list-tile>
							Hostname: {{ selectedDevice.hostname }}
						</v-list-tile>
						<v-list-tile>
							Status: {{ selectedDevice.status}}
						</v-list-tile>
						<v-list-tile>
							Architecture: {{ selectedDevice.architecture}}
						</v-list-tile>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="primary" @click="applyChanges()" >
								<v-icon>check</v-icon>Apply
							</v-btn>
							<v-btn color="red lighten-1" dark @click="close_dialog()" >
								<v-icon>close</v-icon>Cancel
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>

				<v-dialog v-model="dialogDisconnect" width="500">
					<v-card>
						<v-card-title class="headline primary" primary-title >
							Confirm action
						</v-card-title>
						<v-card-text>
							Are you sure you want to disconnect this device?
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="primary" @click="removeDevice(selectedDevice) ; close_removeDialog() " >
								<v-icon>check</v-icon>Yes
							</v-btn>
							<v-btn color="red lighten-1" dark @click="close_removeDialog()" >
								<v-icon>close</v-icon>No
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-flex>
		</v-flex>

		<v-layout align-start justify-end row>
			<v-dialog v-model="dialogConnect" width="500" >
				<v-btn slot="activator" color="primary" class="right" large >
					Add Device
				</v-btn>
				<v-card>
					<v-card-title class="headline primary" primary-title >
						Connect device
					</v-card-title>

					<v-card-text>
						<v-text-field v-model="newDevice.name" label="Device name" placeholder="Enter a device name..."></v-text-field>
						<v-text-field v-model="newDevice.identifier" label="Identifier" placeholder="Enter your unique identifier..."></v-text-field>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn activator color="primary" @click="pushNewDevice(); dialogConnect = false" >
							<v-icon>check</v-icon>Confirm
						</v-btn>
						<v-btn color="red lighten-1" dark @click="dialogConnect = false" >
							<v-icon>close</v-icon>Cancel
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-layout>

		<!-- Successful update-->
		<div class="text-xs-center">
			<v-dialog v-model="deviceUpdated" persistent width="300" >
				<v-card dark >
					<v-card-text>
						Your device has been updated!
						<v-btn class="primary" v-on:click="deviceUpdated = false">Ok</v-btn>
					</v-card-text>
				</v-card>
			</v-dialog>
		</div>

		<!-- Successful Delete-->
		<div class="text-xs-center">
			<v-dialog v-model="deviceRemoved" persistent width="300" >
				<v-card dark >
					<v-card-text>
						Your device has been removed!
						<v-btn class="primary" v-on:click="deviceRemoved = false">Ok</v-btn>
					</v-card-text>
				</v-card>
			</v-dialog>
		</div>

		<!-- Failed Delete-->
		<div class="text-xs-center">
			<v-dialog v-model="deviceFailedRemove" persistent width="300" >
				<v-card dark >
					<v-card-text>
						Failed to remove device!
						<v-btn class="primary" v-on:click="deviceFailedRemove = false">Ok</v-btn>
					</v-card-text>
				</v-card>
			</v-dialog>
		</div>

		<!-- Successful Add-->
		<div class="text-xs-center">
			<v-dialog v-model="deviceAdded" persistent width="300" >
				<v-card dark >
					<v-card-text>
						Your device has been added!
						<v-btn class="primary" v-on:click="deviceAdded = false">Ok</v-btn>
					</v-card-text>
				</v-card>
			</v-dialog>
		</div>

		<!-- Failed Add-->
		<div class="text-xs-center">
			<v-dialog v-model="deviceFailedToAdd" persistent width="300" >
				<v-card dark >
					<v-card-text>
						Failed to add device!
						<v-btn class="primary" v-on:click="deviceFailedToAdd = false">Ok</v-btn>
					</v-card-text>
				</v-card>
			</v-dialog>
		</div>


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
				updateConfig: new Config(PORT.ORCHESTRATOR, CONTENT_TYPE.JSON, METHOD.UPDATE),
				deleteConfig: new Config(PORT.ORCHESTRATOR, CONTENT_TYPE.NONE, METHOD.DELETE),
				addConfig: new Config(PORT.ORCHESTRATOR, CONTENT_TYPE.JSON, METHOD.POST),
				headers: [
					{text: "Name", value: "name"},
					{text: "Hostname", value: "hostname"},
					{text: "Status", value: "status"},
					{text: "Synced", value: "Synced"},
					{sortable: false}
				],
				newDeviceName: '',
				deviceUpdated: false,
				deviceRemoved: false,
				deviceFailedRemove: false,
				deviceAdded: false,
				deviceFailedToAdd: false,
				list: [],
				devices: [],
				dialogDisconnect: false,
				dialogConnect: false,
				device_dialog: false,
				newDevice: {
					name: "",
					identifier: "",
					userId: window.localStorage.getItem('defpi_userId')
				},
				selectedDevice: {
					id: "",
					ip_address: "unknown",
					notifications: {},
				},
				rules: {
					required: value => !!value || 'Required.',
					allowedName: value => {
						const pattern = /^[\w -]+$/;
						return pattern.test(value) || 'Invalid name';
					},
					sizeLimit: value => {
						return value.length <= 32 || 'Name too long';
					}
				}
			}
		},
		methods: {
			applyChanges: function() {
				let device = this.selectedDevice;
				device.name = this.newDeviceName;
				let payLoad = JSON.stringify(device);
				API.send(this.updateConfig, "/privatenode/" + device.id, payLoad, response => {
					this.close_dialog();
					this.deviceUpdated = true;
				}, response => {
					this.retrieveDevices();
				})
			},
			retrieveDevices: function(){
				API.send(this.api_config, "/privatenode", {"_filters": { "userId" : window.localStorage.getItem('defpi_userId') }}, response => {
					this.list = response;
					this.devices = [];
					for(let key in this.list) {
						this.devices.push(this.list[key])
					}
				}, null)
			},

			/* Dialog Methods */
			open_dialog: function(device) {
				this.newDeviceName = device.name;
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

			pushNewDevice: function () {
				let payLoad = {};
				payLoad.dockerId = this.newDevice.identifier;
				payLoad.name = this.newDevice.name;
				payLoad.userId = this.newDevice.userId;

				API.send(this.addConfig, '/privatenode', payLoad, response => {
					this.deviceAdded = true;
					this.dialogConnect = false;
				}, response => {
					this.dialogConnect = false;
					this.deviceFailedToAdd = true;
				});
			},
			removeDevice: function (selectedDevice) {
				API.send(this.deleteConfig, '/privatenode/' + selectedDevice.id, null, response => {
					this.deviceRemoved = true;
				}, response => {
					this.deviceFailedRemove = true;
				})
			}
		},
		mounted () {
			this.retrieveDevices();
			setInterval(function() {
				this.retrieveDevices();
			}.bind(this), 12500)
		}
	}
</script>
