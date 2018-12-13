import axios from 'axios'

export default Object.freeze({
	api_url_base: 'http://localhost:',
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
	get: function (port, uri, callback) {
		console.log('[GET] ' + this.api_url_base + port + uri);
		axios.get(this.api_url_base + port + uri, this.data)
			.then(response => {
				if(response.headers["content-type"] === "application/javascript" ||
					response.headers["content-type"] === "application/json"){
					console.log(response.data);
					callback(response);
				} else {
					console.log(response);
					this.wrong_response();
				}
			})
			.catch(error => console.error(error) );

	},
	post: function (port, uri, postData, callback) {
		console.log('[POST] ' + this.api_url_base + port + uri);
		axios.post(this.api_url_base + port + uri, postData, this.data)
			.then(response => {
				if(response.headers["content-type"] === "application/javascript" ||
					response.headers["content-type"] === "application/json"){
					console.log(response.data);
					callback(response);
				} else {
					console.log(response);
					this.wrong_response();
				}
			})
			.catch(error => console.error(error) );
	},
})
