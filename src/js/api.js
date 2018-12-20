export default function() {
	this.api_url_base = "http://" + window.location.hostname + ":";

	this.PORT = {
		GATEWAY: "8080",
		ORCHESTRATOR: "8484",
	};

	this.CONTENT_TYPE = {
		WWW_FORM: "application/x-www-form-urlencoded",
		JSON: "application/jsonp",
		JAVASCRIPT: "application/javascript",
		NONE: "",
	};

	this.METHOD = {
		GET: "GET",
		POST: "POST",
	};

	this.default_config = {
		port: 			this.PORT.ORCHESTRATOR,
		contentType: 	this.CONTENT_TYPE.NONE,
		method: 		this.METHOD.GET,
	};

	this.open_request = function(api_config, uri) {
		let url = this.api_url_base + api_config.port + uri;
		console.log("[API] [" + api_config.method + "] " + url);

		let http = new XMLHttpRequest();
		http.open(api_config.method, url, true);
		//http.setRequestHeader("Access-Control-Allow-Origin", "*");
		//http.setRequestHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
		if(api_config.contentType !== this.CONTENT_TYPE.NONE) {
			http.setRequestHeader("Content-Type", api_config.contentType);
		}
		http.setRequestHeader("Authorization", "Basic " + btoa("admin:admin"));
		return http;
	};

	this.send = function(api_config, uri, data, callback, error) {
		//localStorage.setItem("username", "admin");

		if(api_config === null) {
			api_config = this.default_config;
		}

		let http = this.open_request(api_config, uri);
		http.onreadystatechange = function() {
			if(http.readyState === http.DONE ) {
				if (http.status === 200) {
					if (this.getResponseHeader("Content-Type") === "application/javascript" || this.getResponseHeader("Content-Type") === "application/json") {
						let response = JSON.parse(http.response);
						callback(response);
					}
				} else {
					console.error("[Api] HTTP CODE: " + http.status);
				}
			} else {
				if(error != null) {
					error();
				}
			}
		};
		http.send(data);
	};

};
