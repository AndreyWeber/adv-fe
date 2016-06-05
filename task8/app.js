var express = require('express');
var path = require('path');
var fs = require('fs');
var url = require('url');
var find = require('findit');
var apiVersion = require('./package').version;

var app = express();

app.set('port', process.env.npm_package_config_port || 5000);

app.listen(app.get('port'), function() {
    console.log('Node app is running on http://localhost:' + app.get('port'));
});

app.get('/', function (req, res) {
    var urlParsed = url.parse(req.url, true);

    console.log(urlParsed);

    res.send('<html><body><h1>My web app http API! Version ' + apiVersion + ' </h1></body></html>');
});

app.all('/test/', function (req, res) {
    res.send('<html><body><h1>Hello test</h1></body></html>');
});

app.all('/api/' + apiVersion + '/users', function (req, res) {
    renderSeveral(req, res);
});

app.all('/api/' + apiVersion + '/users/*', function (req, res) {
    renderSingle(req, res);
});

app.all('/api/' + apiVersion + '/posts', function (req, res) {
    renderSeveral(req, res);
});

app.all('/api/' + apiVersion + '/posts/*', function (req, res) {
    renderSingle(req, res);
});

function renderSeveral (req, res) {
    var dirName = req.path.replace('/' + apiVersion + '/', '/');
    //   /api/users/
    var dirPath = path.join(__dirname, dirName);
    //   /Users/puzankov/work/fs/node-js-getting-started/api/users/

    var finder = find(dirPath);
    var output = [];
    finder.on('directory', function (dir, stat, stop) {
        if (dirPath === dir) {
            return;
        }
        var filePath = path.join(dir, req.method.toLowerCase() + '.json');
        try {
            fs.statSync(filePath);

            var json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            if (Array.isArray(json)){
                json.forEach(e => output.push(e));
            } else {
                output.push(json);
            }
        } catch (e) {
            console.log('File not found', filePath);
        }
    });

    finder.on('end', function () {
        console.log('Succeeded');

        res.setHeader('content-type', 'application/json');
        res
            .status(200)
            .json(output)
            .end();1
    });

    finder.on('error', function (err) {
        console.log('Error occured', err);

        res
            .status(500)
            .json([
                {
                    "info": {
                        "success": false,
                        "code": 12345
                    }
                }
            ])
            .end();

    });
}

function renderSingle(req, res) {
    var fileName = req.path + '/' + req.method.toLowerCase() + '.json';
    //   /api/1.0.1/users/get.json
    fileName = fileName.replace('/' + apiVersion + '/', '/');
    //   /api/users/get.json
    var filePath = path.join(__dirname, fileName);
    // /Users/puzankov/work/fs/node-js-getting-started/api/users/get.json

    console.log(req.method, filePath);

    try {
        fs.statSync(filePath);

        res.setHeader('content-type', 'application/json');
        fs.createReadStream(filePath).pipe(res);
    } catch (e) {
        console.log('no such file', filePath);

        res
            .status(404)
            .json([
                {
                    "info": {
                        "success": false,
                        "code": 12345
                    }
                }
            ])
            .end();
    }
}

//
//app.get('/api/1.0/users', function (req, res) {
//    res.send(users);
//});
//
//app.get('/api/1.0/users/:userId', function (req, res) {
//
//    console.log(req.query);
//
//    res.send(user);
//});


