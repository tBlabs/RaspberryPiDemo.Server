const { exec } = require('child_process');

exports.Exec = (command) =>
{
    console.log('Executing command ' + command + '...');
    
    exec(command, (error, stdout, stderr) =>
    {
        if (error)
        {
            console.error(`exec error: ${ error }`);
            return;
        }
        //console.log(`stdout: ${ stdout }`);
        console.log(`stderr: ${ stderr }`);
    });
}