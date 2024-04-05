# odsl-javascript-sdk
The Javascript SDK for the [OpenDataDSL](https://opendatadsl.com) data management platform

## Installation
You can install the ODSL Javascript SDK from [npm](https://www.npmjs.com/package/odsl-javascript-sdk):

    npm i odsl-javascipt-sdk

## About
This javascript SDK for OpenDataDSL has the following features:

* Find any data in OpenDataDSL using the ```list``` command
* Retrieve any data using the ```get``` command
* Update any data (if you have permission) using the ```update``` command

Check out our [demo repository](https://github.com/OpenDataDSL/odsl-javascript-sdk-demo) for examples of real-world usage.

## Usage

### Logging in and getting started

#### Logging in using a client credentials flow (client secret)
```js
import ODSL from '../src/sdk.js'
import "dotenv/config";

var config = {
    auth: {
        clientId: process.env.clientId,
        authority: process.env.authority,
        clientSecret: process.env.clientSecret
    }
};

ODSL.loginWithSecret(config).then(function(odsl) {
	# Do Something
});
```

### Finding master data

```js
objects = ODSL.list('object', 'public', 'source=ECB')
# objects is a JSON object wrapper containing status, statusText and body
print(objects.body[0])
```

### Getting master data

```js
obj = ODSL.get('object', 'public', '#ECB')
print(obj.body['description'])
```

### Getting a timeseries
```js
ts = ODSL.get('data', 'public', '#ABN_FX.EURUSD:SPOT')
print(ts.body)
```

### Updating some private master data
```js
var = {
    '_id': 'AAA.PYTHON',
    'name': 'Python Example'
}
ODSL.update('object', 'private', var)
```

### Reading and updating some private master data
```js
po = ODSL.get('object', 'private', 'AAA.TEST')
po.body['description'] = 'Updated from Javascript'
ODSL.update('object', 'private', po.body)
```
