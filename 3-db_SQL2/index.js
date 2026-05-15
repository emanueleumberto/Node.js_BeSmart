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

// Create the connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sakila'
})

db.connect((error) => {
    if(error) {
        console.error('Errore di connessione al DB', error)
    }
    // console.log("Connessione al DB");
})

db.query('SELECT * FROM actor', (error, result) => {
    if(error) {
        console.error('Errore nella query', error)
    }
    // console.log('Risultati: ', result)
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
//         console.log("Connessione al DB tramite Promise");
//         return dbp;

//     } catch(error) {
//         console.error('Errore nella query', error);
//     }
// }

async function getActors(){
    const db = await connectDB();
    const [result] = await db.query('SELECT * FROM actor')
    console.log(result);
}

async function getActorByID(id){
    const db = await connectDB();
    const [result] = await db.query('SELECT * FROM actor WHERE actor_id = ?', [id])
    console.log(result);
}

async function createActor(first_name, last_name) {
    const db = await connectDB();
    const [result] = await db.query('INSERT INTO actor (first_name, last_name) VALUES (?,?)',[first_name, last_name]);
    console.log(result);
}

async function updateActor(first_name, last_name, actor_id) {
    const db = await connectDB();
    const [result] = await db.query('UPDATE actor SET first_name = ?, last_name=? WHERE actor_id = ?', [first_name, last_name, actor_id]);
    console.log(result);
}

async function deleteActor(actor_id) {
    const db = await connectDB();
    const [result] = await db.query('DELETE FROM actor WHERE actor_id = ?', [actor_id])
    console.log(result);
}

// getActors()
// getActorByID(38)
// createActor('Mario', 'Rossi')
// updateActor('Mariolino', 'Rossini', 202)
// deleteActor(202)

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
        console.log("Connessione al DB tramite Promise");
        return dbp;

    } catch(error) {
        console.error('Errore nella query', error);
    }
}

async function executeTransaction() {
    const conn = await connectDB().getConnetion()

    try {
        await conn.beginTransaction() // Avvia una Transaction
        
        await db.query('INSERT INTO table (coumn1, column2) VALUES (?,?)',[params1, params2]);
        await db.query('UPDATE table SET coumn1 = ?, column2=? WHERE id = ?', [params1, params2, params3]);
        await db.query('DELETE FROM table WHERE id = ?', [param1])
        
        // Commit
        await conn.commit()
        console.log("Salvataggio effettuato correttamente");

    } catch (error) {

        // Rollback
        await conn.rollback()
        console.log("Errore nel Salvataggio");
    }
}