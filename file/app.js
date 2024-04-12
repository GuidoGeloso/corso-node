const fs = require('fs');
const {EventEmitter} = require('events');


const fileExist1 = 'f1.txt';
const unexistentFile = 'unexistentFile.txt';
const errorEventEmitter = new EventEmitter(); 
const errorEventName = 'errorEvent';

//Gestione standard lettura file, attenzione al fatto che la lettura e' asincrona quindi se anche ne apro N non so
//in quale ordine poi mi rispondono, vedi l'ordine dei messaggi nella console
function callBackFunction(err, dati){
    console.log('sono nella callback normale di gestione lettura file');
    if(err){
        console.log('errore!');
    }else{
        console.log(dati);
    }
}

console.log('Apro ['+fileExist1+'] in modo async');
fs.readFile(fileExist1, 'utf-8', callBackFunction);

console.log('Apro ['+unexistentFile+'] in modo async');
fs.readFile(unexistentFile, 'utf-8', callBackFunction);

//Gestione degli errori ad eventi

function callBackFunctionConErroriAdEventi(err, dati){
    console.log('sono nella callback con gestione errori ad eventi');
    if(err){
        console.log('errore! Lancio evento');
        errorEventEmitter.emit(errorEventName, err);
    }else{
        console.log(dati); 
    }
}

function callbackGestioneErrore(err){
    console.log('Sono in callbackGestioneErrore, error data ', JSON.stringify(err));
}


errorEventEmitter.on(errorEventName, eventData => callbackGestioneErrore(eventData));

fs.readFile(unexistentFile, 'utf-8', callBackFunctionConErroriAdEventi);