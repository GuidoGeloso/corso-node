const fs = require('fs');

const fileExist1 = 'f1.txt';
const unexistentFile = 'unexistentFile.txt';
const errorEventName = 'errorEvent';
const openMode = 'w+';

//Ogni volta che saranno disponibili questo numero di byte, arriva un evento "data"
const highWaterMarkValue = 20;
//readStream che permette di leggere FLUSSO di dati (stream)
const readable = fs.createReadStream(fileExist1, 
{
    encoding: 'utf-8',
    highWaterMark: highWaterMarkValue
});

//di fatto readable è un Emitter
readable.on(
    'data',function dataReadFunction(data){
            console.log('dati: ', data);
    }
); 