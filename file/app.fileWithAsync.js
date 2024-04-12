const fs = require('fs');

const fileExist1 = 'f1.txt';
const unexistentFile = 'unexistentFile.txt';
const errorEventName = 'errorEvent';


async function read(file){
    const dati = await fs.promises.readFile(file, 'utf-8');
    console.log(dati);
}

read(fileExist1);

//non gestisco pero' il caso di errore, per cui se chiamo questo si spacca tutto
//read(unexistentFile);

//devo gestire il caso di errore
read(unexistentFile).catch(err => gestioneErrore(err));

function gestioneErrore(error){
    console.log('Funzione gestioneErrore. Errore: ', error);
}