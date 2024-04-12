const url = require('url')

const indirizzo = 'http://user:password@miosito.coom/user?id=1&nome=Anna;'

//Estraggo le info da una URL
urlObject = new URL(indirizzo);

console.log(urlObject);

//parsing Indirizzo
console.log('Parsing: ', url.parse(indirizzo));

//estraggo i parametri
console.log('Parsing - Params', urlObject.searchParams);

//Itero sui parametri
const parametri = urlObject.searchParams;
let iterator = urlObject.searchParams.entries();
console.log('Itero sul primo parametro', iterator.next());


parametri.forEach(function(value, name){
    console.log('Parametro: ',{value,name})
});

//Lista dei codici HTTP
const http = require('http');
console.log(http.STATUS_CODES);