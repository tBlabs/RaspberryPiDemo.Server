require('dotenv').config();

const { exec } = require('child_process');
exec('mpc play', (error, stdout, stderr) =>
{
    if (error)
    {
        console.error(`exec error: ${ error }`);
        return;
    }
    console.log(`stdout: ${ stdout }`);
    console.log(`stderr: ${ stderr }`);
});

var io = require('socket.io-client');

const socket = io(process.env.SERVER_ADDR+'?client_type=machine');

socket.on('connect', () =>
{
    console.log('Connected to server');

    socket.on('server-to-machine', (cmd) =>
    {
        switch (cmd)
        {
            case 'led1on': console.log('Led 1 on'); break;
            case 'led1off': console.log('Led 1 off'); break;
        }
    });
});

socket.on('disconnect', ()=>
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
