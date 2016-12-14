var hue = require("node-hue-api");

var displayResult = function(bridge) {
    console.log(JSON.stringify(bridge, null, 2));
    console.log("\n");
};

var displayError = function(err) {
    console.log(err);
};


var hostname = "192.168.1.51"
,   username = "2a2583fc299db78fc7ae9d426367707"
,   userDescription = "HueDojo"
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
}

api.getFullState().then(displayResult).done();
