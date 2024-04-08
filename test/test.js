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
        console.log(r.description);
    });
});

console.log("Synchronous GET");
ODSL.loginWithSecret(config).then(function(odsl) {
    var r = odsl.get('object', 'private', 'AAA');
    console.log(r.description);
});

console.log("Synchronous GET");
ODSL.loginWithSecret(config).then(function(odsl) {
    var r = odsl.get('object', 'public', '#ABN.FX');
    console.log(r.name);
});

console.log("Synchronous GET error");
ODSL.loginWithSecret(config).then(function(odsl) {
    var r = odsl.get('object', 'private', 'AAA2');
});

console.log("Synchronous LIST");
ODSL.loginWithSecret(config).then(function(odsl) {
    var r = odsl.list('object', 'private', {"source":"ICE"});
    for (let index = 0; index < r.length; index++) {
        const element = r[index];
        console.log(element.description);
    }
});
