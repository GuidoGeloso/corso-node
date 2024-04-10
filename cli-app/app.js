const chalk = require('chalk');

/*console.log(chalk.red.inverse('Messaggio rosso'))

console.log(chalk.red(process.version));

console.log(process.argv);

console.log(argv_parsed);

console.log(argv_parsed._);

console.log(argv_parsed.flag);
*/

//Importo modulo locale
const {getCliente, addCliente} = require('./app-fn');

//uso di yargs
const yargs = require('yargs');

//definizione del comando "get" e di una proprieta' "nome" obbligatoria
yargs.command({
    command: 'get',
    describe: 'Ricerca cliente in base al nome',
    builder: {        
        nome:{
            decribe: 'Nome del cliente da ricercare',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        nomeClienteDaTrovare = argv.nome
        console.log((nomeClienteDaTrovare));
        clienteTrovato = getCliente(nomeClienteDaTrovare);
        console.log(clienteTrovato != undefined ? clienteTrovato : 'No customer found with name '+nomeClienteDaTrovare);
    }

});

//definizione del comando "add" e di una proprieta' "nome" obbligatoria
yargs.command({
    command: 'add',
    describe: 'Aggiunta di un cliente',
    builder: {        
        nome:{
            decribe: 'Nome del cliente da aggiungere',
            demandOption: true,
            type: 'string'
        },
        email:{
            decribe: 'Mail del cliente da aggiungere',
            demandOption: true,
            type: 'string'
        },
        tel:{
            decribe: 'Nome del cliente da aggiungere',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        console.log(chalk.red(argv.nome));
        console.log(chalk.red(argv.email));
        console.log(chalk.red(argv.tel));

        clienti = addCliente(argv.nome, argv.email, argv.tel);
        console.log(clienti != undefined ? JSON.stringify(clienti) : 'Unable to add' + argv.nome);
    }

});


yargs.parse();





