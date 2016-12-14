var argv = require('minimist')(process.argv.slice(2));
var config = require('dotenv').config();
var hue = require('node-hue-api');
var display = require('./display');
console.log('argv: ', argv);

var hostname = config.HOSTNAME
,   username = config.USERNAME
,   userDescription = config.USER_DESCRIPTION
,   api, lightstate;

var got_args = argv['_'].length > 0
,   command = argv['_'][0];

var controllAll = function(data){
    lightState = hue.lightState;
    state = lightState.create().on().hsl(argv['h'], argv['s'], argv['l']);

    for(var i = 0; i<data.lights.length; i++){
        api.setLightState(data.lights[i].id, state).then(display.result).done();
    }
};

if(!got_args){
    var commands = {
        'ligths': 'Show all lights',
        'register': 'Register a user',
        'full': 'Show full state of connected bridge',
        'bridges': 'Find bridges in your network'
    };
    display.result(commands);
}

if(got_args){
    api = new hue.HueApi(hostname, username);

    if(command === 'lights'){
        api.lights().then(controllAll).done();
    }
}

if(false){
    // find bridges in network
    hue.nupnpSearch().then(display.result).done();

    // get info about a bridge
    api.config().then(display.result).done();

    // register a user on bridge
    api.registerUser(hostname, userDescription)
        .then(display.result)
        .fail(display.error)
        .done();

    // description
    api.description().then(display.result).done();

    // get full state
    api.getFullState().then(display.result).done();
}
