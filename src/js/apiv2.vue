<template></template>

<script>
	export default {
		data() {
			return {
				api_url_base: 'http://localhost:',
				http_options: {
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					auth: {
						username: "admin",
						password: "admin",
					},
					emulateJSON: true
				}
			}
		},
		methods: {
			wrong_response: function () {
				// user not logged in?
				console.error("[API] USER IS NOT LOGGED IN EVERYBODY!");
				this.$router.push("/login");
			},
			get: function (port, uri, callback) {
				let url = this.api_url_base + port + uri;
				console.log('[GET] ' + url);

				this.$http.get(url, {username: "admin", password: "admin"}, this.http_options).then(response => {
					if (response.headers.get('content-type') === "application/javascript" ||
						response.headers.get('content-type') === "application/json") {
						console.log(response);
						callback(response.body);
					} else {
						console.log(response);
						this.wrong_response();
					}
				})
					.catch(error => console.error(error));

			},
			post: function (port, uri, postData, callback) {
				let url = this.api_url_base + port + uri;
				console.log('[POST] ' + url);

				this.$http.post(url, postData, this.http_options).then(response => {
					if (response.headers.get('content-type') === "application/javascript" ||
						response.headers.get('content-type') === "application/json") {
						console.log(response);
						callback(response.body);
					} else {
						console.log(response);
						this.wrong_response();

						if (document.cookie.includes("EFPISESSION")) {
							console.log("SESSION");
							this.$router.push("/");
						}
					}
				})
					.catch(error => console.error(error));
			},
		}
	}
</script>
