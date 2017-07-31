require('dotenv').config();

var io = require('socket.io-client');
var exe = require('./exec').Exec;


const socket = io(process.env.SERVER_ADDR + '?client_type=machine');

socket.on('connect', () =>
{
    console.log('Connected to server');

    socket.on('server-to-machine', (cmd) =>
    {
        switch (cmd)
        {
            case 'led1on': console.log('Led 1 on'); break;
            case 'led1off': console.log('Led 1 off'); break;
            
            case 'radioon':
                console.log('Radio on');
                exe('mpc play');
                break;
            
            case 'radiooff':
                console.log('Radio off');
                exe('mpc stop');
                break;
        }
    });
});

socket.on('disconnect', () =>
{
    console.log('Disconnected from server');
});

// var Gpio = require('onoff').Gpio;
// var led = new Gpio(17, 'out');
// var button = new Gpio(4, 'in', 'both');

// let value = 0;

// setInterval(() =>
// {
//     socket.emit('is_alive');

//     // value = 1 - value;
//     // led.writeSync(value);
// }, 1000);

// process.on('SIGINT', function ()
// {
//     led.unexport();
//     button.unexport();
// });
