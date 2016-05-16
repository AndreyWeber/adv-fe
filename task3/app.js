var express = require('express');
var path = require('path');

var app = express();

app.use('/', express.static(path.join(__dirname, 'bin')));

app.listen(process.env.npm_package_config_port, function () {
    console.log("Application started.");
});
