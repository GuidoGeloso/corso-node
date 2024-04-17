const fs = require('fs');
var path = require('path');
const express = require('express');

const personaModule = require('./persone.js');

//Estraggo dal moduleo Persone sia la lista pre-confezionata sia la classe Persona
const {listaPersone, Persona} = personaModule;

const app = express();

app.get('/',
(req, res) => {
    res.status(301).redirect('/homeDatiStatici');    
});
 
let service_count = 0;

//servo il file con la home page presente nel folder templates, popolandolo con dati presi dalla lista staticamente definita nel modulo node
app.use('/homeDatiStatici', 
(req, res) => {
    for(let i=0;i<10000;i++){
        service_count++;
        console.log('count'+service_count);
    }
    res.send(listaPersone);
});

const redisModule = require('redis');



const {createClient} = redisModule;

async function connectToRedis(){

    const client = createClient();

    client.on('error', err => console.log('Redis Client Error', err));

    await client.connect();

    await client.set('key', 'value');
    const value = await client.get('key');

    console.log('Settato: ' + value);
}

connectToRedis();

app.listen(3000);
