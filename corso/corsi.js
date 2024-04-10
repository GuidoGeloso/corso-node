var corsi = [

    {
        nome: 'Maestro Javascript',
        pubblicato: true
    },
    {
        nome: 'Maestro Node',
        pubblicato: false
    },
    {
        nome: 'Maestro PHP',
        pubblicato: false
    }
];

function showCorsiPubblicati(){
    const corsiPubblicati = corsi.filter(corso => corso.pubblicato);
    console.log(corsiPubblicati);
}

//decido cosa esportare del mio modulo, in questo caso esporto la funzione (non nmetto le parentesi tonde
//altrimenti esporto l'invocazione della funzione)
//module.exports.showCorsi = showCorsiPubblicati;

//un altro modo è questo, ma qui in pratica il mio modulo coinciderà con la funzione stessa
module.exports = showCorsiPubblicati;

//Exports e simili son in realtà LOCALI AL MODULO, idem per variabili etc. Inoltre, questi sono sempre raggiungibili in un modulo node.
console.log('-----------------');
console.log(module);
console.log('-----------------');