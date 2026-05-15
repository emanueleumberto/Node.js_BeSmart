/*
    L'uso di database NoSQL, come MongoDB e Redis, offre un approccio più flessibile 
    e scalabile rispetto ai tradizionali database relazionali.

    -> MongoDB è un database orientato ai documenti, particolarmente adatto per applicazioni 
        con dati non strutturati o semi-strutturati.
    -> Redis è un database in-memory che eccelle nella gestione di dati ad alta velocità,
        come cache e sessioni utente.

    Molte applicazioni combinano entrambe i database, utilizzando Redis per migliorare le prestazioni 
    e MongoDB per conservare i dati a lungo termine.
*/

/*
    MongoDB
    MongoDB è un database che memorizza i dati in documenti JSON-like, organizzati in collezioni.
    La sua natura flessibile lo rende ideale per applicazioni moderne, in cui la struttura può variare 
    senza necessità di migrazioni complesse.

    A differenza dei database relazionali, MongoDB non impone uno schema fisso per le tabelle, 
    ogni documento può avere una struttura diversa.

    Per connettere Node.js a MongoDB è necessario installare il pacchetto ufficiale 'mongodb' 
    o utilizzare un ORM come Mongoose, che semplifica la gestione dei dati.
    [ npm install mongodb ]
*/

const { MongoClient, ObjectId } = require('mongodb')

// const url = 'mongodb://localhost:27017' // Collegamento ad un db locale
// const url = 'mongodb+srv://admin:Qp1CxtD4s3j6q6TB@cluster0.7opl1ou.mongodb.net/?appName=Cluster0'; // Collegamento ad un db remoto
const url = 'mongodb://admin:Qp1CxtD4s3j6q6TB@ac-ld6xweg-shard-00-00.7opl1ou.mongodb.net:27017,ac-ld6xweg-shard-00-01.7opl1ou.mongodb.net:27017,ac-ld6xweg-shard-00-02.7opl1ou.mongodb.net:27017/?ssl=true&replicaSet=atlas-1hpwfy-shard-0&authSource=admin&appName=Cluster0'

const client = new MongoClient(url); 

const conn = client.connect()
                .then(() => {
                    console.log("Connessione al db MongoDB riuscita")
                    return client.db('BeSmart') // Db reale su mongodb
                } )
                .catch((error) => console.error("Errore di connessione", error))

// Una volta aperta, la connessione a MongoDB può essere mantenuta attiva 
// per tutto il ciclo di vita dell'applicazione, evitando overhead e latenze. 
// Ricorda sempre di chiudere la connessione al termine delle operazioni globali.

process.on('SIGINT', async () => {
    console.log("Chiusura del Client MongoDB");
    await client.close();
    process.exit(0);
})


async function createUser(firstname, lastname, age, email) {
    try{
        const db = await conn;
        const users = db.collection('users')
        const result = await users.insertOne({firstname, lastname, age, email, last_update: new Date()})
        // Il metodo insertOne() restituisce l'ID del documento appena inserito
        console.log('New User: ', result.insertedId);
    } catch(error) {
        console.error(error);
    }
}

// Per inserire più oggetti in un'unica operazione, si usa il metodo insertMany(), 
// che accetta un array di documenti.
// I metodi insertMany(), updateMany(), deleteMany() sono progettati per eseguire operazioni 
// su più documenti contemporaneamente in modo efficiente.
// Quando si lavora su set di dati multipli è preferibile questa soluzione piuttosto 
// che iterare manualmente con cicli for e chiamate singole.

async function createMultipleUsers(arrUsers) {
    try {
         const db = await conn;
         const users = db.collection('users');
         const result = await users.insertMany(arrUsers);
         // Il metodo insertMany() restituisce il numero di documento appena inseriti
         console.log(result.insertedCount, 'users inseriti.');
    } catch(error) {
        console.error(error);
    }
}

// Per leggere i dati all'interno dei una collezione, MongoDB fornisce due metodi principali
// -> findOne() - Recupera il primo documento che corrisponde al criterio specificato
// -> find() - Recupera tutti i documenti corrispondenti, può essere convertito in un array tramite toArray()

async function getUserByID(id) {
    try{
        const db = await conn;
        const users = db.collection('users');
        const user = await users.findOne({_id: new ObjectId(id)});
        if(user) {
            console.log('User: ', user);
        } else {
            console.log('Nessun risultato traovato per l\id richiesto');
        }
    } catch(error) {
        console.error('Errore nella esecuzione della query: ', error);
    }
}

async function getAll() {
    try {
        const db = await conn;
        const users = db.collection('users');
        const lista = await users.find().toArray()
        if(lista.length > 0) {
            console.log('Users: ', lista);
        } else {
            console.log('Nessun risultato trovato');
        }
    } catch(error) {
        console.error('Errore nella esecuzione della query: ', error);
    }
}


// Per costruire query maggiormente avanzate abbiamo a disposizione operatori di confronto
// $lt(less than - minore di) -  {prop: {$lt: val}}
// $gt(greater than - maggiore di) - {prop: {$gt: val}} 
// $in(in array) - {prop: {$in: [val, ..., val]}}
// $regex(regular expression) - {prop: {$regex: val}}
// limit() -> find().limit(val) - Numero max di valori restituiti
// skip() -> find().skip(val).limit(val) - Salta un certo numero di documenti

async function getUserForAge(age) {
    try {
        const db = await conn;
        const users = db.collection('users');
        const lista = await users.find({age: {$gt: age}}).toArray()
        if(lista.length > 0) {
            console.log('Users: ', lista);
        } else {
            console.log('Nessun risultato trovato');
        }
    } catch(error) {
        console.error('Errore nella esecuzione della query: ', error);
    }
}

// UpdateOne() modifica il primo documento che soddisfa il criterio specificato
// $set consente di aggiornare uno o più campi senza alterare gli altri valori del documento
async function updateUser(username, newAge) {
    try {
        const db = await conn;
        const users = db.collection('users');
        const result = await users.updateOne(
            {firstname: username},
            {$set: {age: newAge}}
        )
        if(result) {
            console.log('Dato aggiornato correttamente');
        } else {
            console.log('Nessun risultato trovato');
        }

        
    } catch(error) {
        console.error('Errore nella esecuzione della query: ', error);
    }
}

// UpdateMany() aggiorna tutti i documenti che soddisfano il criterio specificato
// Esempio cerare tutti i documenti con la proprietà age minore di 50 e incrementare($inc) il valore age di 2
async function updateMultipleUsers() {
    try {
        const db = await conn;
        const users = db.collection('users');
        const result = await users.updateMany(
            {age: {$lt: 40}},
            {$inc: {age: 1}}
        )
        if(result.modifiedCount > 0) {
            console.log('Dato aggiornato correttamente');
        } else {
            console.log('Nessun risultato trovato');
        }
        
    } catch(error) {
        console.error('Errore nella esecuzione della query: ', error);
    }
}


async function  deleteUser(username) {
    try {
        const db = await conn;
        const users = db.collection('users');
        const result = await users.deleteOne({firstname: username})
        if(result.deletedCount > 0) {
            console.log('Dato eliminato correttamente');
        } else {
            console.log('Nessun dato eliminato');
        }
        
    } catch(error) {
        console.error('Errore nella esecuzione della query: ', error);
    }
}

async function deleteMultipleUsers(age) {
    try {
        const db = await conn;
        const users = db.collection('users');
        const result = await users.deleteMany({age: {$lt: age}})
        if(result.deletedCount > 0) {
            console.log(result.deletedCount, ' user eliminati correttamente');
        } else {
            console.log('Nessun dato eliminato');
        }
        
    } catch(error) {
        console.error('Errore nella esecuzione della query: ', error);
    }
}

users = [
    {firstname: 'Mario', lastname: 'Rossi', age: 23, email: 'm.rossi@example.com', last_update: new Date()},
    {firstname: 'Giuseppe', lastname: 'Verdi', age: 39, email: 'g.verdi@example.com', last_update: new Date()},
    {firstname: 'Francesca', lastname: 'Neri', age: 32, email: 'f.neri@example.com', last_update: new Date()}
]


// createUser("Antonio", "Bianchi", 44, "a.bianchi@example.com");
// createMultipleUsers(users);
// getUserByID('6a06e260ac9beb58ab8c7b96')
// getAll()
// getUserForAge(35)
// updateUser('Mario', 45)
// updateMultipleUsers()
// deleteUser("Mario")
// deleteMultipleUsers(35)