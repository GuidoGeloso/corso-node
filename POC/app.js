const fs = require('fs');
var path = require('path');
const morgan = require('morgan');
const express = require('express');
const debugApp = require('debug')('app:app');
const personaModule = require('./classes/persone.js');
const DBConnection = require('./classes/dbConnection.js').DBConnection;
const connectionCompleteEvent =  require('./classes/dbConnection.js').connectionCompleteEvent;
const redisModule = require('redis');

const {createClient} = redisModule;

//Estraggo dal moduleo Persone sia la lista pre-confezionata sia la classe Persona
const {listaPersone, Persona} = personaModule;

const app = express();

//MORGAN
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

//TEMPLATES
//di default si usa la cartella views, io ne specifico un'altra
app.set('views', 'templates')
//specifico il template-engine da usare
app.set('view engine', 'ejs')

//Parsing di body in formato json
app.use(express.json()) // for parsing application/json

app.get('/',
(req, res) => {
    res.status(301).redirect('/home');    
});
 
//servo il file con la home page presente nel folder templates, popolandolo con dati presi dalla lista staticamente definita nel modulo node
app.use('/homeDatiStatici', 
(req, res) => {
    res.render('home',{
        data: listaPersone}
    );
});

//servo il file con la home page presente nel folder templates, popolandolo con dati presi dal db
let service_count = 0;

app.use('/homeDatiDaDB', 
async (req, res) => {
    for(let i=0;i<10000;i++){
        service_count++;
        console.log('count'+service_count);
    }
    res.render('home',{
        data: await dbConnection.getPersone()}
    );
});

//connetto al DB
debugApp('DBConnection start');
const dbConnection = new DBConnection();
dbConnection.connect();


dbConnection.on(connectionCompleteEvent, event =>{
    debugApp('DBConnection ok!');
    dbConnection.setupData();
    debugApp('DBConnection.setupData ok!');
    
    connectToRedis();

    app.listen(3000);
    debugApp('Ready to go');
});

//Servizio REST con elenco di persone
app.get('/persone',
async (req, res) => {
    let personeDalDb = await dbConnection.getPersone();
    debugApp('Ci sono '+ personeDalDb.length + ' persone');    
    res.send(personeDalDb);
});


//Inserimento persona
app.post('/persona',
async (req, res) => {
    debugApp('Body: '+req.body);
    let persona = new Persona(req.body.nome, req.body.anni);
    
    debugApp('Persona da inserire [' + persona.nome +']');
    let result = await dbConnection.addPersona(persona)
        .then(successAddPersona(res, persona))
        .catch(errorAddPersona(res, persona));

    debugApp('Metodo asincrono chiamato, aspetto risposta');
});

function successAddPersona(res, persona){
    debugApp('successAddPersona');
    //res.send('Persona ['+ persona.nome+'] inserita con successo');
}
    
function errorAddPersona(res, persona){
    debugApp('errorAddPersona');
    res.send('Errore durante inserimento '+ persona.nome);
}

async function connectToRedis(){
    console.log('Connecting to REDIS');
    const client = createClient();

    client.on('error', err => console.log('Redis Client Error', err));

    await client.connect();
    console.log('Connecting to REDIS..OK');

    await client.set('key', 'value');
    const value = await client.get('key');

    console.log('Settato: ' + value);
}