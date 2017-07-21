require('dotenv').config();

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function (req, res)
{
    res.sendFile(__dirname + '/client.html');
});

let machineSocket = null;

io.on('connection', function (socket)
{
    if (socket.handshake.query.client_type == "machine")
    {
        console.log("machine connected");

        machineSocket = socket;
    }
    else
    {
        console.log('human connected');
    }


    socket.on('machine.command.led1.on', () =>
    { 
        machineSocket.emit('machine.command.led1.on');
    });

    socket.on('machine.command.led1.off', () =>
    { 
        machineSocket.emit('machine.command.led1.off');
    });
});

http.listen(process.env.PORT, function ()
{
    console.log('host @'+process.env.PORT);
});

