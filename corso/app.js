//Modulo principale

//Importo modulo corsi.js e lo assegno all'oggetto corsi.
//Uso const perchè così se  andassi a ridefinire la variabile corsi, me lo dice subito in compilazione.
//Tipo var corsi = 1 non me lo fa fare.
const corsi = require('./corsi');

//questa mi da in output un oggetto con la funzione showCorsiPubblicati
//{ showCorsiPubblicati: [Function: showCorsiPubblicati] }
console.log(corsi);

//se voglio richiamare la funzione devo fare
corsi();
//questo perche' il modulo esportato è una funzione e stop

//Importo moduli di sistema
const fs = require('fs');

//Guardo cosa ci sia dentro
console.log(fs);

//Scrivo su un file
fs.appendFileSync('myFile','info\n');

//importo il pacchetto validator come fosse un modulo nativo di node
const validator = require('validator');

console.log(validator);

var checkValid = validator.isEmail('geloso86@gmail.com');
var checkNotValid = validator.isEmail('geloso86@@@gmail.com');

console.log(checkValid);
console.log(checkNotValid);
console.log('ciao')