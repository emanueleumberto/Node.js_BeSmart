/*
    In Express è possibile concatenare più middleware per ogni singola rotta,
    i middleware vengono eseguiti in ordine, da sinistra a destra e ciascuno di essi può decidere
    se proseguire la catena, invocando il metodo next(), oppure terminare la risposta. 

    app.get('/', middleware1, middleware2, ... ,(request, response) => { response.send("Benvenuto su Express!"); });
*/

function logger(req, res, next) {
    console.log("Sono il middleware logger!!! ", req.url);
    next();
}

function testKey(req, res, next) {
    // http://localhost:3000/users?key=qwerty
    const key = req.query.key;
    if(key !== 'qwerty'){
        res.status(401).send('Utente non autorizzato');
    } else {
        next();
    }
    
}

module.exports = {logger, testKey}