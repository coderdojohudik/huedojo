var argv = require('minimist')(process.argv.slice(2));
var config = require('dotenv').config();
var hue = require("node-hue-api");

console.log(argv);

var displayResult = function(bridge) {
    console.log(JSON.stringify(bridge, null, 2));
    console.log("\n");
};

var displayError = function(err) {
    console.log(err);
};


var hostname = config.HOSTNAME
,   username = config.USERNAME
,   userDescription = config.USER_DESCRIPTION
,   api;

api = new hue.HueApi(hostname, username);


if(false){
    // find bridges in network
    hue.nupnpSearch().then(displayResult).done();

    // get info about a bridge
    api.config().then(displayResult).done();

    // register a user on bridge
    api.registerUser(hostname, userDescription)
        .then(displayResult)
        .fail(displayError)
        .done();

    // description
    api.description().then(displayResult).done();

    // get full state
    api.getFullState().then(displayResult).done();
}

