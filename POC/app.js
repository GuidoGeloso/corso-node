const express = require('express');
const debugApp = require('debug')('app:app');
const persone = require('./persone.js').listaPersone;

const app = express();

app.get('/',
(req, res) => {
    res.send('It Works!')
    
});
 
//Servizio REST con elenco di persone
app.get('/persone',
(req, res) => {
    debugApp('Ci sono '+ persone + ' persone');    
    res.send(persone);
});



app.listen(3000);
debugApp('Ready to go');