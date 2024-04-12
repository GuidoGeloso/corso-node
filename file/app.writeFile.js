const fs = require('fs');

const fileExist1 = 'f1.txt';
const unexistentFile = 'unexistentFile.txt';
const errorEventName = 'errorEvent';

function errorCallback(err){
    console.log('Error');
}
function onWriteOk(){
    console.log('Write OK!');
}

async function myWriteFile(errorCallback){
    await fs.promises.writeFile(unexistentFile, 'Prova', errorCallback);
}

myWriteFile(errorCallback);

//Esempio di uso delle promise con le callback positive e negative
fs.promises.writeFile(fileExist1, 'Testo da scrivere')
    .then(onWriteOk)
    .catch(errorCallback)

function onAppendOK(){
    onWriteOk()
}

function onAppendKO(){
    errorCallback()
}

fs.promises.appendFile(fileExist1,'Stringa da appendere')
    .then(onAppendOK)
    .catch(onAppendKO)