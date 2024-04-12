const fs = require('fs');

const fileExist1 = 'f1.txt';
const unexistentFile = 'unexistentFile.txt';
const errorEventName = 'errorEvent';
const openMode = 'w+';

fs.open(fileExist1, openMode, function fileDescriptorCallback(err, fileDescriptor){
    if(err){
        console.log('fs.open Error', err);
    }else{
        fs.write(fileDescriptor, 'testo','utf8',function fileWriteCallback(err, written, buffer){
            console.log('fs.write Error',
              JSON.stringify({err, written, buffer})
            );
        });
    }

    //chiusura file
    fs.close(fileDescriptor, function errorCallback(err){
        console.log('fs.close Error', err);
    });
}); 