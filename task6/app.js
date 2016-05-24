var express = require('express');
var app = express();
var path = require('path');

app.use('/', express.static(path.join(__dirname, 'client_build')));

app.listen(process.env.npm_package_config_port, function() {
    console.log("Application started.");
});
