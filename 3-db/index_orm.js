/*
    ORM (Object-Relational Mapping)

    L'approccio ORM consente di interfacciarsi con un database utilizzando concetti e strutture 
    tipiche della programmazione orientata agli oggetti.
    Invece di scrivere manualmente query SQL o comandi diretti verso il database, gli ORM permettono 
    di rappresentare le entità e le relazioni del dominio applicativo come classi, metodi, proprietà, 
    favorendo una maggiore astrazione e coerenza nel codice.

    Questo paradigma semplifica lo sviluppo, migliora la leggibilità del codice e introduce un livello 
    di sicurezza aggiuntivo, grazie a funzionalità come la validazione automatica dei dati e 
    la prevenzione delle SQL injection.
*/

/*
    Quando si lavora con database relazionali l'uso di SQL puro può diventare complesso e ripetitivo, 
    specialmente in applicazioni di grandi dimensioni.
    Per semplificare la gestione dei dati, vengono utilizzati gli ORM, strumenti che consentono di interagire
    con il database utilizzando un linguaggio più vicino alla programmazione orientata agli oggetti
    invece di scrivere direttamente query SQL.

    In Node.js gli ORM più popolari per lavorare con database relazionali sono 
    'Sequelize', 'TypeORM' e 'Prisma'.
*/

/*
    Sequelize

    è uno degli ORM più utilizzati in Node.js e supporta database come 'MySQL', 'PostgreSQL', 'SQLite' e 'MariaDB'.
    La sua flessibilità permette di astrarre la scrittura delle query SQL attraverso una sintassi ad alto livello,
    definendo modelli Javascript che mappano tabelle del database, 
    consentendo di eseguire operazioni CRUD in modo intuitivo.

    Per utilizzare Sequelize è necessario installarlo insieme al driver del database scelto
    
    [ npm install sequelize mysql2]

*/

// const { Sequelize, DataTypes } = require('sequelize')

// const sequelize = new Sequelize('sakila', 'root', 'root', {host: 'localhost', dialect:'mysql'})

// sequelize.authenticate()
//     .then(() => console.log("Connessione al DB"))
//     .catch((err) => console.error(err))

// Dopo aver stabilito la connessione, è possibile definire un modello 
// per rappresentare una tabella del database

// const MyActor = sequelize.define('myactors', {
//     actor_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     first_name: {type: DataTypes.STRING(50),  allowNull: false},
//     last_name: {type: DataTypes.STRING(50), allowNull: false},
//     age: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 18},
//     email: {type: DataTypes.STRING(50), unique: true, allowNull: false},
//     last_update: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW}
// })

// sequelize.sync()
//     .then(() => console.log("Tabella mappata nel DB"))
//     .catch((error) => console.log("Errore nella mappatura", error))

// Operazioni di CRUD

// MyActor.create({first_name: 'Mario', last_name: 'Rossi', age: 34, email: 'm.rossi@example.com'})
//     .then(actor => console.log("Actor inserito", actor))
//     .catch((error) => console.log("Errore nella mappatura", error))

// MyActor.findByPk(1)
//     .then(actor => console.log("Actor:", actor))
//     .catch((error) => console.log("Errore nella mappatura", error))

// MyActor.findAll()
//     .then(actor => console.log("Actors:", actor))
//     .catch((error) => console.log("Errore nella mappatura", error))

// MyActor.update(
//     {age: 40},
//     {where: {first_name: 'Mario'}})
//     .then(actor => console.log("Actors:", actor))
//     .catch((error) => console.log("Errore nella mappatura", error))

// MyActor.destroy({where: {first_name: 'Mario'}})
//     .then(row => {
//         if(row > 0) {
//             console.log("Dato eliminato!!");
//         } else {
//             console.log("Nessun dato eliminato");
//         }
//     })
//     .catch((error) => console.log("Errore nella mappatura", error))



/*
    Sequelize offre un'API avanzata per gestire le transazioni senza dover scrivere direttamente query SQL native.
    Una transazione viene avviata con il metodo transaction() e può essere utilizzata 
    all'interno di un blocco try-catch per garantire che gli errori non lascino il database in uno stato incoerente.
*/


const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('sakila', 'root', 'root', {host: 'localhost', dialect:'mysql'})

const MyActor = sequelize.define('myactors', {
    actor_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    first_name: {type: DataTypes.STRING(50),  allowNull: false},
    last_name: {type: DataTypes.STRING(50), allowNull: false},
    age: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 18},
    email: {type: DataTypes.STRING(50), unique: true, allowNull: false}
})

const MyFilm = sequelize.define('myfilm', {
    film_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING(50),  allowNull: false},
    actor: {type: DataTypes.INTEGER, allowNull: false}
})

// sequelize.sync()
//     .then(() => console.log("Tabella mappata nel DB"))
//     .catch((error) => console.log("Errore nella mappatura", error))

async function executeTransaction() {
    const transaction = await sequelize.transaction();

    try {
        const actor = await MyActor.create({first_name: 'Giuseppe', last_name: 'Verdi', age: 34, email: 'dadd.verdi@example.com'}, {transaction})
        // const film = await MyFilm.create({title: 'Batman', actor: actor.actor_id}, {transaction})
        const film = await MyFilm.update({actor: actor.actor_id}, {where: {film_id: 1}, transaction} )
        if (film === 0){
            new Error('E')
        }
        console.log(film);

        await transaction.commit()
        console.log("Modifiche effettuate correttamente nel DB");
    } catch (error){
        console.log("Errore: ", error);
        await transaction.rollback()
    }

}

executeTransaction();