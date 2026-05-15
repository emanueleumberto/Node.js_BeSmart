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

// const {Sequelize, DataTypes, or} = require('sequelize')

// const sequelize = new Sequelize('sakila', 'root', 'root', {host: 'localhost', dialect: 'mysql'})

// sequelize.authenticate()
//     .then(() => console.log("Connessione al DB"))
//     .catch((error) => console.error('Errore di connessione al DB', error))

// Dopo aver stabilito la connessione, è possibile definire un modello 
// per rappresentare una tabella del database

// const MyActors = sequelize.define('myactors', {
//     actor_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
//     first_name: {type: DataTypes.STRING(50), allowNull: false},
//     last_name: {type: DataTypes.STRING(50), allowNull: false},
//     age: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 18},
//     email: {type: DataTypes.STRING(50), allowNull: false, unique: true},
//     date: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW}
// })

// Create Table
// sequelize.sync()
//     .then(() => console.log("Tabella mappata con il DB"))
//     .catch((error) => console.error('Errore di mappatura con il DB', error))

// Operazioni di CRUD

// MyActors.create({first_name: 'Mario', last_name: 'Rossi', age: 34, email: 'm.rossi@example.com'})
//     .then((actor) => {console.log(actor)})
//     .catch((error) => console.error(error))

// MyActors.findByPk(5)
//     .then((actor) => {console.log(actor)})
//     .catch((error) => console.error(error))

// MyActors.findAll()
//     .then((actor) => {console.log(actor)})
//     .catch((error) => console.error(error)) 

// MyActors.update({age: 99}, {where: {last_name: 'Rossi'}})
//     .then((row) => {console.log(row)})
//     .catch((error) => console.error(error)) 

// MyActors.destroy({where: {actor_id: 5}})
//     .then((row) => {console.log(row)})
//     .catch((error) => console.error(error)) 


/*
    Sequelize offre un'API avanzata per gestire le transazioni senza dover scrivere direttamente query SQL native.
    Una transazione viene avviata con il metodo transaction() e può essere utilizzata 
    all'interno di un blocco try-catch per garantire che gli errori non lascino il database in uno stato incoerente.
*/

const {Sequelize, DataTypes, or} = require('sequelize')

const sequelize = new Sequelize('sakila', 'root', 'root', {host: 'localhost', dialect: 'mysql'})

const MyActors = sequelize.define('myactors', {
    actor_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    first_name: {type: DataTypes.STRING(50), allowNull: false},
    last_name: {type: DataTypes.STRING(50), allowNull: false},
    age: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 18},
    email: {type: DataTypes.STRING(50), allowNull: false, unique: true}
})

const MyFilms = sequelize.define('myfilms', {
    film_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    title: {type: DataTypes.STRING(50), allowNull: false},
    actor: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    
        references:{
            model: MyActors,
            key: 'actor_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    }
})

// Creazione di Foreign Key
// hasMany() descrive la relazione logica
// MyActors.hasMany(MyFilms, {
//     foreignKey: 'actor',
//     as: 'films'
// })
// // belongsTo() descrive la relazione fisica SQL
// MyFilms.belongsTo(MyActors, {
//     foreignKey: 'actor_id',
//     as: 'actors'
// })

// Create Table
// sequelize.sync()
//     .then(() => console.log("Tabella mappata con il DB"))
//     .catch((error) => console.error('Errore di mappatura con il DB', error))

async function executeTransaction() {
    const transaction = await sequelize.transaction();

    try {

        const actor = await MyActors.create({first_name: 'Mario', last_name: 'Rossi', age: 34, email: 'mario.rossi@example.com'}, {transaction})
        // const film = await MyFilms.create({title: 'Batman', actor: actor.actor_id }, {transaction})
        const row = await MyFilms.update({actor: actor.actor_id}, {where: {film_id: 1}}, {transaction})
        if(row === 0) {
            throw new Error('Film non è stato aggiornato')
        }

        await transaction.commit()
        console.log("Operazione conclusa");
    } catch(error) {
        console.log("Errore, torno allo stato iniziale");
        console.log(error);
        await transaction.rollback()
    }
}

executeTransaction()