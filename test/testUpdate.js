'use strict';

import ODSL from '../src/sdk.js'
import "dotenv/config";

var config = {
    auth: {
        clientId: process.env.clientId,
        authority: process.env.authority,
        clientSecret: process.env.clientSecret
    }
};

console.log("Synchronous UPDATE");
ODSL.loginWithSecret(config).then(function(odsl) {
	var body = {
		"_id":"AAA.JS",
		"name": "Javascript Update Object"
	}
    var r = odsl.update('object', 'private', body);
    console.log(r);
});
