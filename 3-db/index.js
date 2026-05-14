/*
    Nello sviluppo back-end la persistenza dei dati, rappresente un aspetto fondamenta.
    Un'applicazione moderna deve essere in grado di salvare, aggiornare, 
    recuperare in modo strutturato dati.

    L'integrazione di un database relazione in un progetto Node.js richiede l'utilizzo 
    di driver specifici o di ORM (Object-Relational Mapping) che semplificano l'interazione 
    tra il codice Javascript e il database.

    MySQL è uno dei database relazionali più diffusi, apprezzato per la sua stabilità 
    e velocità nelle operazioni di lettura.

    Per interagire con MySQL in un progetto Node.js è necessario installare il pacchetto 'mysql2'
    [ npm install mysql2 ]

    https://sidorares.github.io/node-mysql2/docs
*/

const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sakila'
})

// Create the connection to database
db.connect((err)=>{
    if(err) {
        console.error("Errore di connessione", err.message);
    }
    // console.log("Connessione al DB MySQL");
})

// A simple SELECT query
db.query('SELECT * FROM actor', (error, result) =>{
    if(error) {
        console.error("Errore nella query", err.message);
    }

    // console.log('Risultati:', result)
})

/*
    Per sfruttare appieno l'architettura asincrona di Node.js è preferibile utilizzare la versione 
    Promise-based di MySQL, che consente di lavorare con il costrutto async/await, 
    evitando la nidificazione della callback.

    Per ottenere questo comportamento si utilizza il metodo createPool(), 
    che offre anche un migliore bilanciamento delle connessioni.

    Quando si lavora con input forniti dall'utente, è fondamentale proteggere il database da vulnerabilità 
    come la SQL injection. Il pacchetto 'mysql2/promise' permette di eseguire query parametrizzate in modo 
    semplice ed efficiente.

    L'uso delle query parametriche è quindi una best practice imprescindibile 
    in qualunque contesto in cui il database riceva input dall'esterno.

    Il driver 'mysql2/promise' consente di eseguire tutte le classiche operazioni di CRUD (Create Read Update Delete)
    utilizzando la sintassi async/await, rendendo il codice più leggibile, lineare e gestibile.
*/


// const mysqlDB = require('mysql2/promise')

// async function connectDB() {
//     try{
//         const dbp = await mysqlDB.createPool({
//             host: 'localhost',
//             user: 'root',
//             password: 'root',
//             database: 'sakila',
//             waitForConnections: true,
//             connectionLimit: 10
//         })
//         console.log("Connessione al DB MySQL tramite Promise");
//         return dbp;
//     } catch (err) {
//         console.error("Errore di connessione", err.message);
//     }
// }

async function getActors() {
    const conn = await connectDB();
    const [result] = await conn.query('SELECT * FROM actor')
    console.log(result);
}

async function getActorById(id) {
    const conn = await connectDB();
    const [result] = await conn.query('SELECT * FROM actor WHERE actor_id = ?', [id])
    console.log(result);
}

async function createActor(first_name, last_name) {
    const conn = await connectDB();
    const [result] = await conn.query('INSERT INTO actor (first_name, last_name) VALUES (?, ?)', [first_name, last_name])
    console.log(result);
}

async function updateActor(first_name, last_name, actor_id) {
    const conn = await connectDB();
    const [result] = await conn.query('UPDATE actor SET first_name=?, last_name=? WHERE actor_id = ?', [first_name, last_name, actor_id])
    console.log(result);
}

async function deleteActor(actor_id) {
    const conn = await connectDB();
    const [result] = await conn.query('DELETE FROM actor WHERE actor_id = ?', [actor_id])
    console.log(result);
}


// getActors()
// getActorById(39)
// createActor('Mario', 'Rossi')
// updateActor('Mariolino', 'Rossini', 201)
// deleteActor(201)


/*
    Le transazioni nei database relazionali sono uno strumento fondamentale per garantire l'integrità 
    e la coerenza dei dati, specialmente in contesti in cui più operazioni 
    devono essere eseguite come un'unica unità atomica.

    Una trasazione permette di eseguire più query assicurandosi che in caso di errore, 
    tutte le modifiche vengano annullate, riportando il database allo stato precedente.

    Una transazione segue quattro proprietà fondamentali, note come ACID: 
    -> Atomicità - garantisce che un gruppo di operazioni venga eseguito completamente o annullato completamente
    -> Consistenza - assicura che il database passi da uno stato valido a un'altro, senza violare vincoli di integrità
    -> Isolamento - impedisce che transazioni concorrenti interferiscano tra loro
    -> Durabilità - garantisce che una transazione confermata rimanga registrata anche in caso di crash del sistema.

    Quando si lavora con Node.js e database relazionali come MySQL o PostgreSQL è possibile gestire transazioni 
    in modo programmatico attraverso i driver nativi o gli ORM come Sequelize e Prisma
*/


/*
    Nei database relazionali, una transazione viene generalmente avviata con BEGIN TRANSACTION, 
    seguita da una serie di query e terminata con COMMIT se tutte le operazioni sono andate a buon fine
    o con ROLLBACK in caso di errore
*/

const mysqlDB = require('mysql2/promise')

async function connectDB() {
    try{
        const dbp = await mysqlDB.createPool({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'sakila',
            waitForConnections: true,
            connectionLimit: 10
        })
        console.log("Connessione al DB MySQL tramite Promise");
        return dbp;
    } catch (err) {
        console.error("Errore di connessione", err.message);
    }
}

async function executeTransaction() {
    const conn = await connectDB().getConnection()

    try {
        await conn.beginTransaction(); // Avvia una trasazione
        
        const [result] = await conn.query('INSERT INTO table (campo1, campo2, ..., campo3) VALUES (?,?,.. ?)', [param1, param2, ..., paramN]);
        await conn.query('UPDATE table SET campo1=?, campo2=? WHERE id=?', [param1, param2, param3])

        // Se tutto procede senza errori la transazione viene confermata con commit()
        await conn.commit()


    } catch (error) {
        console.error("Errore: ", error.message);
        await conn.roolback() // In caso di errore si torna allo stato inziale
    }

}