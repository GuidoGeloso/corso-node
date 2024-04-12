const express = require('express');
const app = express();

//di default si usa la cartella views
app.set('views', 'view-files')
//specifico il template-engine da usare
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    //renderizzo la pagina
    res.render('index', {

        intestazione : "Information",
        otherInfo : "Other info set into template"

    });
})

app.listen(3000);