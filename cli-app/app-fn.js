const fs = require('fs');

function getCliente(nomeClienteDaTrovare){
    const clientiJson = fs.readFileSync('clienti.json', 'utf-8');
    const clienti = JSON.parse(clientiJson);
    const cliente = clienti.find(singolocliente => singolocliente.nome === nomeClienteDaTrovare);
    return cliente;
}

function addCliente(nome, mail, tel){
    const clientiJson = fs.readFileSync('clienti.json', 'utf-8');
    const clienti = JSON.parse(clientiJson);
    //aggiungo cliente passato come parametro
    clienti.push({nome, mail, tel})
    fs.writeFileSync('clienti.json', JSON.stringify(clienti))
    return clienti;
}


module.exports = {
    getCliente,
    addCliente
}