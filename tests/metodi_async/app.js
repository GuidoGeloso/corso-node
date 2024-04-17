
//Info utili: https://wesbos.com/javascript/12-advanced-flow-control/71-async-await-error-handling 

//funzione normale
function somma(a,b){
    return a+b;
}

console.log('Sincrona, valore diretto? => '+ somma(1,2));

//funzione async SBAGLIATA perchè mi da si una promise in output, ma il risultato non e' dentro di essa
async function sommaAsyncSbagliata(id, a,b){
    let waitfor = 2000+Math.random(10000);
    console.log('['+id+'] Aspettiamo '+ waitfor +' qualche secondo..');
    setTimeout(
            () => {
                return a+b;
            }, waitfor);
}

//aspetto la promise, ma questa non conterra' il risultato
async function waitUselessly(){
    let waitUselessPromise = await sommaAsyncSbagliata('waitUselessPromise',1,2);
    console.log('waitUselessPromise '+ waitUselessPromise);
}

//Qui vedo che l'output e' appunto undefined.
waitUselessly();

//funzione async CORRETTA
async function sommaAsyncCorretta(id, a,b){
    let waitfor = 2000+Math.random(10000);
    console.log('['+id+'] Aspettiamo '+ waitfor +' qualche secondo..');
    //Creo la promise in cui inserire il risultato
    let promise = new Promise((resolve, reject) => {
        setTimeout(
            () => {
                resolve(a+b);
            }, waitfor);
    });
    return promise;
}

//funzione async CORRETTA CON REJECT
async function sommaAsyncCorrettaConReject(id, a,b){
    let waitfor = 2000+Math.random(10000);
    console.log('['+id+'] Aspettiamo '+ waitfor +' qualche secondo..');
    //Creo la promise in cui inserire il risultato
    let promise = new Promise((resolve, reject) => {
        setTimeout( 
            () => {
                reject('Attenzione, schioppa tutto');
            }, waitfor);
    });
    return promise;
}

//mi restituisce comunque una promise, ma su questa ho il controllo ed avro' il risultato se facessi await, vedi esempio successivo
//Qui ho comunque una promise.
console.log('Promise? =>'+ sommaAsyncCorretta('Promise?',1,2));

//provo ad aspettare con await per vedere il risultato
async function aspettaPromise(){
    console.log('aspettaPromise: Aspettiamo e vediamo..');
    let result = await sommaAsyncCorretta('myPromise',1,2);
    console.log('aspettaPromise result: ' +result);
}

//questa deve funzionare ed ho il risultato dopo tot secondi
aspettaPromise();


//provo a usare la stessa funzione a cui faccio restituire un 
//errore, ma la chiamo con try e catch per intercettare errori

//ErrorHandling
async function testTryCatchWithPromises(){
    try{
        let anotherPromise = await sommaAsyncCorrettaConReject('Uso try catch', 1,2);
        console.log('testTryCatchWithPromises =>' + anotherPromise);
    }catch(err){
        console.log ('testTryCatchWithPromises - got error ' +err);
    }
}

testTryCatchWithPromises();

//provo a fare ErrorHandling con uso di then e catch
async function testErrorHandlingConThenCatch(){
    sommaAsyncCorrettaConReject('testErrorHandlingConThenCatch', 1,2)
    .then(onSuccess, onError)
    .catch(onException);   
}

testErrorHandlingConThenCatch();

//provo a fare uso di then e catch chiamando una funzione che non da errori
async function testConThenCatchSenzaErrori(){
    sommaAsyncCorretta('testConThenCatchSenzaErrori', 1,2)
    .then(onSuccess, onError)
    .catch(onException);   
}

testConThenCatchSenzaErrori();


function onSuccess( value){
    console.log('onSuccess ['+ value+']');
}

function onError( error){
    console.log('onError ['+ error+']');
}

function onException( exception){
    console.log('otherErrorPromise onException ['+ exception+']');
}