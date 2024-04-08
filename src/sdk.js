'use strict';
import { PublicClientApplication as pcnode, ConfidentialClientApplication as ccnode } from "@azure/msal-node";
import { PublicClientApplication as pcbrowser } from "@azure/msal-browser";
import { XMLHttpRequest } from "xmlhttprequest";

const msalConfig = {
	"auth": {
		"clientId": "d3742f5f-3d4d-4565-a80a-ebdefaab8d08",
		"authority": "https://login.microsoft.com/common"
	}
};

export default class ODSL {
	token = null;
	// host = "https://odsl-dev.azurewebsites.net/api/";
	host = "http://localhost:7071/api/";
	constructor(loginResponse) {
		this.token = loginResponse.accessToken;
	}
	static async login() {
		try {
			let msalInstance = new pcbrowser(msalConfig);
			console.log("Initialising");
			await msalInstance.initialize();
			console.log("Logging In");
			const loginResponse = await msalInstance.loginPopup(loginRequest);
			return new ODSL(loginResponse);
		} catch (err) {
			console.log("Token Acquisition Failed: " + err);
		}
	}
	static async loginWithSecret(config) {
		try {
			let loginRequest = {
				scopes: ["api://opendatadsl/.default"]
			}
			let msalInstance = new ccnode(config);
			console.log("Logging In");
			const loginResponse = await msalInstance.acquireTokenByClientCredential(loginRequest);
			return new ODSL(loginResponse);
		} catch (err) {
			console.log("Token Acquisition Failed: " + err);
		}
	}
	get(service, source, id) {
		try {
			var xhttp = new XMLHttpRequest();
			id = encodeURIComponent(id);
			var url = new URL(this.host + service + "/v1/" + source + "/" + id);
			xhttp.open("GET", url, false);
			xhttp.setRequestHeader("Authorization", "Bearer " + this.token);
			xhttp.responseType = "json";
			xhttp.send();
			if (xhttp.status < 200 || xhttp.status >= 300) {
				throw xhttp.getResponseHeader("x-odsl-error");
			}
			return JSON.parse(xhttp.responseText);
		} catch (err) {
			console.log("GET request Failed: " + err);			
		}
	}
	getAsync(service, source, id, callback) {
		try {
			var xhttp = new XMLHttpRequest();
			id = encodeURIComponent(id);
			var url = new URL(this.host + service + "/v1/" + source + "/" + id);
			xhttp.open("GET", url);
			xhttp.setRequestHeader("Authorization", "Bearer " + this.token);
			xhttp.responseType = "json";
			xhttp.send();
			xhttp.onload = function() {
				if (xhttp.status < 200 || xhttp.status >= 300) {
					throw xhttp.getResponseHeader("x-odsl-error");
				} else {
					callback(JSON.parse(xhttp.responseText));
				}
			}
		} catch (err) {
			console.log("GET request Failed: " + err);			
		}
	}
	list(service, source, filter) {
		try {
			var xhttp = new XMLHttpRequest();
			var url = new URL(this.host + service + "/v1/" + source);
			if (filter != undefined) {
				url.searchParams.set("_filter", JSON.stringify(filter));
			}
			xhttp.open("GET", url, false);
			xhttp.setRequestHeader("Authorization", "Bearer " + this.token);
			xhttp.responseType = "json";
			xhttp.send();
			if (xhttp.status < 200 || xhttp.status >= 300) {
				throw xhttp.getResponseHeader("x-odsl-error");
			}
			return JSON.parse(xhttp.responseText);
		} catch (err) {
			console.log("GET request Failed: " + err);			
		}
	}
	update(service, source, body) {
		try {
			var xhttp = new XMLHttpRequest();
			var url = new URL(this.host + service + "/v1/" + source);
			xhttp.open("POST", url, false);
			xhttp.setRequestHeader("Authorization", "Bearer " + this.token);
			xhttp.responseType = "json";
			xhttp.send(JSON.stringify(body));
			if (xhttp.status < 200 || xhttp.status >= 300) {
				throw xhttp.getResponseHeader("x-odsl-error");
			}
			return JSON.parse(xhttp.responseText);
		} catch (err) {
			console.log("GET request Failed: " + err);			
		}
	}
}
