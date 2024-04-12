const express = require('express');
const morgan = require('morgan');
const app = express();

//Accedo ad una variabile di default di node
let currentEnvironment = app.get('env');
let environmentFileName = '.env.'+currentEnvironment;

//Attenzione a questo che è diverso dagli altri require
require('dotenv').config(
    {
        path: environmentFileName
    }
);

//Accedo ad una variabile di ambiente definita da me in .env
let dbConnectionString = process.env.DB_CON_STRING;

console.log(currentEnvironment);
console.log(dbConnectionString);


app.listen(3000);

