require('dotenv').config();


var io = require('socket.io-client');

const socket = io(process.env.HOST+'?client_type=machine');


socket.on('connect', () =>
{
    console.log('connected to host');

    socket.on('machine.command.led1.on', ()=>
    {
        console.log('led 1 on');
    });
    socket.on('machine.command.led1.off', ()=>
    {
        console.log('led 1 off');
    });
});

// var Gpio = require('onoff').Gpio;
// var led = new Gpio(17, 'out');
// var button = new Gpio(4, 'in', 'both');

let value = 0;

setInterval(() =>
{
    socket.emit('is_alive');

    // value = 1 - value;
    // led.writeSync(value);
}, 1000);

// process.on('SIGINT', function ()
// {
//     led.unexport();
//     button.unexport();
// });
