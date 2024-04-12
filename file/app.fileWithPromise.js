const fs = require('fs');

const fileExist1 = 'f1.txt';
const unexistentFile = 'unexistentFile.txt';
const errorEventName = 'errorEvent';

const ris = fs.promises.readFile(fileExist1, 'utf-8');
//ottengo una promise pending
console.log(ris);

const risGestita =
    fs.promises.readFile(fileExist1, 'utf-8')
    .then(fileData => console.log(fileData));

//gestisco il caso in cui il file non ci sia

const risGestitaWithErrorCase =
    fs.promises.readFile(unexistentFile, 'utf-8')
    .then(fileData => console.log(fileData))
    .catch(err => console.log(err));