var express = require('express');
var fs = require('fs');
var path = require('path');

var app = express();

var CLIENT_PATH = '/client_build';

app.get('/test',function (req, res) {
    res.sendFile(path.join(__dirname, CLIENT_PATH, '/test.html'));
});

app.use('/', express.static(path.join(__dirname, CLIENT_PATH, '/')));

var server = app.listen(process.env.npm_package_config_port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Application started.');
    console.log('listening ' + host + ':' +  port);
});