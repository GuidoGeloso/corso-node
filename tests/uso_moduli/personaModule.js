class Persona{

    nome = "";
    anni = 0;

    constructor(){
        
    }

    set nome(_nome){
        this.nome = _nome;
    }

    set anni(_anni){
        this.anni = _anni;
    }

}

let persona1 = new Persona();
persona1.nome= 'Uno';

let persona2 = new Persona();
persona2.nome= 'Due';

let data = [
    persona1, persona2
];

module.exports = {data, Persona};