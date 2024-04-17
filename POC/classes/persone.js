const debugApp = require('debug')('app:persone');

class Persona{

    nome = "";
    anni = 0;

    constructor(_nome, _anni){
        this.nome =_nome;
        this.anni =_anni;
    }

}


const listaPersone = [];

listaPersone.push(new Persona('Tizio', 55));
listaPersone.push(new Persona('Caio', 11));
listaPersone.push(new Persona('Altro', 42));
listaPersone.push(new Persona('Bolombo', 12));
listaPersone.push(new Persona('Sgangarello', 77));

debugApp('Init di listaPersone done: '+listaPersone.length)

module.exports = {listaPersone, Persona};