require('dotenv').config();

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
let machineSocket = null;


app.get('/', function (req, res)
{
    res.sendFile(__dirname + '/client.html');
});


io.on('connection', function (socket)
{
    if (socket.handshake.query.client_type == "machine")
    {
        console.log("Machine connected");

        machineSocket = socket;

        socket.on('disconnect', ()=>
        {
            machineSocket = null;
        });
    }
    else
    {
        console.log('Human connected');

        socket.on('human-to-machine', (cmd) =>
        {
            console.log('Message from Human to Machine:', cmd);

            if (machineSocket)
            {
                machineSocket.emit('server-to-machine', cmd);
            }
        });
    }
});

http.listen(process.env.PORT, function ()
{
    console.log('Server started at port ' + process.env.PORT);
});

