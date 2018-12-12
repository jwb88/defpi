import axios from 'axios'

export default Object.freeze({
	api_url_base: 'http://localhost:8080',
	data: {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
			'Content-Type': 'application/json',
		},
		auth: {
			username: "admin",
			password: "admin",
		},
	},
	wrong_response: function() {
		// user not logged in?
		console.error("[API] USER IS NOT LOGGED IN EVERYBODY!");
	},
	get: function (uri, callback) {
		console.log('[GET] ' + this.api_url_base + uri);
		axios.get(this.api_url_base + uri, this.data).then(response => {
			if(response.headers["content-type"] === "application/javascript"){
				console.log(response.data);
				callback(response);
			} else {
				this.wrong_response();
			}
		}).catch(error => console.error(error) );
	},
	post: function (uri, callback) {
		console.log('[POST] ' + this.api_url_base + uri);
		axios.post(this.api_url_base + uri, this.data).then(response => {
			if(response.headers["content-type"] === "application/javascript"){
				console.log(response.data);
				callback(response);
			} else {
				this.wrong_response();
			}
		}).catch(error => console.error(error) );
	},
})
