/*
    Middleware
    Un middleware è una funzione che viene eseguita nel flusso di elaborazione di una richiesta HTTP.
    Può modificare l'oggetto 'request' e/o l'oggetto 'response', terminare una richiesta 
    o passare il controllo ad un middleware successivo utilizzando la funzione next().

    I middleware sono utilizzati per implementare logiche comuni, come la gestione delle sessioni, 
    la validazione dei dati, la compressione delle risposte e il logging.
*/

// Middleware custom

function logger(req, res, next) {
    console.log("Sono il middleware logger!!! " + req.url);
    next();
}

function testKey(req, res, next) {
    const key = req.query.key;
    if(key !== 'qwerty'){
        res.status(401).send('Utente non autorizzato');
    } else {
        next();
    }
    
}

module.exports = {logger, testKey};