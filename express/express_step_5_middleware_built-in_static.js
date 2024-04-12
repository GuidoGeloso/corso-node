const express = require('express');
const app = express();


let hopCounter = 0;

//con questo vado ad esporre i file statici contenuti sotto 
//la cartella static_files
app.use(express.static('static_files'));

app.listen(3000);