const debugApp = require('debug')('app:app');

class Persona{

    nome = "";
    anni = 0;

    constructor(nome, anni){
        this.nome = nome;
        this.anni = anni;
    }

}


const listaPersone = [];

listaPersone.push(new Persona('Tizio', 55));
listaPersone.push(new Persona('Caio', 11));
listaPersone.push(new Persona('Altro', 42));
listaPersone.push(new Persona('Bolombo', 12));
listaPersone.push(new Persona('Sgangarello', 77));

debugApp('Init di listaPersone done: '+listaPersone)

module.exports = {listaPersone, Persona};