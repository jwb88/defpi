/**
 * PORTs for APIConfig
 * @type {{ORCHESTRATOR: string, GATEWAY: string}}
 */
export const PORT = {
	GATEWAY: 		"8080",
	ORCHESTRATOR: 	"8484",
};


/**
 * ContentTypes for APIConfig
 * @type {{JAVASCRIPT: string, WWW_FORM: string, JSON: string, NONE: string}}
 */
export const CONTENT_TYPE = {
	WWW_FORM: 	"application/x-www-form-urlencoded",
	JSON: 		"application/json",
	JAVASCRIPT: "application/javascript",
	NONE: 		"",
};


/**
 * METHODs for APIConfig
 * @type {{DELETE: string, POST: string, GET: string}}
 */
export const METHOD = {
	GET: 	"GET",
	POST: 	"POST",
	DELETE: "DELETE",
	UPDATE: "PUT"
};


/**
 * Config Object for API
 * @param {string} port
 * @param {string} contentType
 * @param {string} method
 * @constructor
 */
export function Config(port, contentType, method) {
	this.port = port;
	this.contentType = contentType;
	this.method = method;
}



/**
 * API Class for the dEF-PI Interface
 * @author J.W.Balsma
 */
function APIClass() {
	// Config
	this.api_url_base = "http://" + window.location.hostname + ":";
	this.default_config = new Config(PORT.ORCHESTRATOR, CONTENT_TYPE.NONE, METHOD.GET);


	/**
	 * Open HTTP Request
	 * @param api_config
	 * @param uri
	 * @returns {XMLHttpRequest}
	 */
	this.open_request = function(api_config, uri) {
		let url = this.api_url_base + api_config.port + uri;
		console.log("[API] [" + api_config.method + "] " + url);

		let http = new XMLHttpRequest();
		http.open(api_config.method, url, true);
		if(api_config.contentType !== CONTENT_TYPE.NONE) {
			http.setRequestHeader("Content-Type", api_config.contentType);
		}
		http.setRequestHeader("Authorization", "Basic " + window.localStorage.getItem("defpi_token"));
		return http;
	};

	/**
	 * Send method for API request
	 * @param {object}				api_config
	 * @param {string}         		uri
	 * @param {object}         		data
	 * @param {function}       		callback
	 * @param {function(number)}    error
	 */
	this.send = function(api_config, uri, data, callback, error) {
		if(api_config === null) api_config = this.default_config;

		let http = this.open_request(api_config, uri);
		http.onreadystatechange = function() {
			if(http.readyState === http.DONE ) {
				if (http.status >= 200 && http.status <= 207) {
					if (this.getResponseHeader("Content-Type") === "application/javascript" || this.getResponseHeader("Content-Type") === "application/json") {
						let response = JSON.parse(http.response);
						callback(response);
					} else {
						callback(http.response);
					}
				} else {
					console.error("[Api] HTTP CODE: " + http.status);
					if(error != null) { error(http.status); return; }

					console.log("Server down?");
					//document.location = "/";
				}
			}
		};
		http.send(data);
	};

}

export const API = new APIClass();
