const express = require('express');
const app = express();


let hopCounter = 0;

//con questo il body della richiesta viene parsato come json direttamente
//se non lo metto e mando una get ad /api/ciao con body json tipo
/*{
  "nome": "Guido"
}
*/
//in console vedro' undefined al posto dell'oggetto
//app.use(express.json());

app.get('/api/*', (req, res) => {
  console.log(req.body);
  res.send('OK');
});



app.listen(3000);