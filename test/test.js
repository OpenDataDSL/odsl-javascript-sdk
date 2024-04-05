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

console.log("Asynchronous GET");
ODSL.loginWithSecret(config).then(function(odsl) {
	odsl.getAsync('object', 'private', 'AAA', function(r) {
        if (r.status == 200) {
            console.log(r.body);
        } else {
            console.log(r.status + ": " + r.statusText);
        }
    });
});

console.log("Synchronous GET");
ODSL.loginWithSecret(config).then(function(odsl) {
    var r = odsl.get('object', 'private', 'AAA');
    if (r.status == 200) {
        console.log(r.body);
    } else {
        console.log(r.status + ": " + r.statusText);
    }
});
