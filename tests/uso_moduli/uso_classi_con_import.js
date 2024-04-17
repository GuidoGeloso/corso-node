const PersonaModule = require('./personaModule');

//const Persona = PersonaModule.Persona;

const {data, Persona} = PersonaModule;

let persona = new Persona();

console.log(persona);
console.log(data);