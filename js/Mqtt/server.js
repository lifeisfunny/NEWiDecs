var mosca = require('mosca');

var settings = {
    port: 1883
};

//here we start mosca
var server = new mosca.Server(settings);
server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running')
}

server.on('published', function(packet, client) {
    console.log('Published', packet);
    console.log('Client', client);
});
// fired when a client connects
server.on('clientConnected', function(client) {
    console.log('Client Connected:', client.id);
});

// fired when a client disconnects
server.on('clientDisconnected', function(client) {
    console.log('Client Disconnected:', client.id);
});



// fired when a client subscribes to a topic
server.on('subscribed', function(topic, client) {
    console.log('subscribed : ', topic);
});

// fired when a client subscribes to a topic
server.on('unsubscribed', function(topic, client) {
    console.log('unsubscribed : ', topic);
});

// fired when a client is disconnecting

