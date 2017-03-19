var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);



app.use(express.static(path.join(__dirname, 'build')));

const DEFAULT_BUTTONS = [
    "You are going too fast.",
    "You are going too slow.",
    "The last slide made no sense.",
    "Nice hair!"
];
const RATE_LIMIT = 20*1000;

var lectures = {};

var lecturesCreated = 0;

function generateKey() {
    lecturesCreated++;
    return lecturesCreated*31+5;
}


io.on('connection', function(socket){
    console.log('a user connected');
    var room;
    var lastClick = 0;
    socket.on('create', function(data){
        if(data.name != null){ // add && data.geo != null
            var key = generateKey();
            lectures[key] = {
                owner: socket,
                //geo: data.geo,
                name: data.name,
                buttons: DEFAULT_BUTTONS
            };
            room = key;
            socket.join(key);
            socket.emit('set-key', {
               key: key
            });
            socket.emit('set-buttons', {buttons: lectures[key].buttons});
        }
    });
    socket.on('join', function(data){
        if(data.key != null){
            if(lectures[data.key]){
                socket.join(data.key);
                room = data.key;
                socket.emit('set-buttons', {buttons: lectures[data.key].buttons});
                socket.emit('set-name', {
                    name: lectures[data.key].name
                });

                lectures[room].owner.emit('student', {action: 'add'});
            }
            else{
                socket.emit('collapse');
            }
        }
    });
    socket.on('button', function(data){
        if(data.name != null && lectures[room] != null){
            if(Date.now() - RATE_LIMIT >= lastClick) {
                lectures[room].owner.emit('button', {name: data.name});
                lastClick = Date.now();
            }
        }
    });

    // LATER
    socket.on('set-buttons', function(data){
        if(data.buttons != null && socket == lectures[room].owner){
            lectures[room].buttons = data.buttons;
            socket.to(room).emit('set-buttons', {buttons: data.buttons});
        }
    });
    socket.on('question', function(data){
        if(data.text != null && lectures[room] != null){
            //if(Date.now() - RATE_LIMIT >= lastClick) {
                lectures[room].owner.emit('question', {text: data.text});
                //lastClick = Date.now();
            //}
        }
    });
    socket.on('disconnect', function(){
        if(room != null && lectures[room] != null){
            if(socket == lectures[room].owner){
                socket.to(room).emit('collapse', {});
                lectures[room] = undefined;
            }
            else{
                lectures[room].owner.emit('student', {action: 'remove'});
            }
        }
    });
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
