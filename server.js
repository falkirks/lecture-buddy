var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/thing', function (req, res) {
    res.send('Hello World!')
});

app.use(express.static(path.join(__dirname, 'build')));


io.on('connection', function(socket){
    console.log('a user connected');
});


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json(err);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json(err);
});


http.listen(process.env.PORT || 3000, function () {
    console.log('RUNNING!')
});
