/*
    Nel contesto dei database non relazionali come MongoDB l'utilizzo di uno strumento ORM rimane fondamentale per 
    introdurre ordine, struttura e validazione nelle operazioni di lettura e scrittura.

    In ambienti NoSQL, gli ORM come 'Mongoose' consentono di modellare i documenti come oggetti strutturati,
    definendo schemi formali con vincoli, valori predefiniti e tipi di dato. Questa astrazione consente di 
    integrare la flessibilità di MongoDB con i vantaggi della programmazione orientata agli oggetti, 
    favorendo un codice più robusto, leggibile e sicuro.
*/

/*
    Mongoose
    l 'ORM più popolare per lavorare con MongoDB in ambiente Node.js. A differenza degli ORM progettati per
    lavorare con i database relazionali, 'Mongoose' introduce una struttura definita e validabile 
    all'interno della flessibilità nativa di MongoDB, permettendo di modellare i documenti 
    attraverso schemi espliciti e controllati.
    Questo approccio consente di mantenere i vantaggi della flessibilità NoSQL, 
    integrandoli con la robustezza e la prevedibilità dei modelli dati.

    Per utilizzare Mongoose in un progetto Node.js è sufficiente installare il pacchetto tramite npm:
    
    [ npm install mongoose ]

    Una volta installato, si può stabilire una connessione a un database MongoDB locale o remoto.
*/

const mongoose = require('mongoose');
const { Schema, model } = require('mongoose')

const db_name = 'BeSmart'

// const url = 'mongodb://localhost:27017' // Collegamento ad un db locale
// const url = 'mongodb+srv://admin:Qp1CxtD4s3j6q6TB@cluster0.7opl1ou.mongodb.net/?appName=Cluster0'; // Collegamento ad un db remoto
const url = 'mongodb://admin:Qp1CxtD4s3j6q6TB@ac-ld6xweg-shard-00-00.7opl1ou.mongodb.net:27017,ac-ld6xweg-shard-00-01.7opl1ou.mongodb.net:27017,ac-ld6xweg-shard-00-02.7opl1ou.mongodb.net:27017/?ssl=true&replicaSet=atlas-1hpwfy-shard-0&authSource=admin&appName=Cluster0/'
const url = 'mongodb://admin:Qp1CxtD4s3j6q6TB@ac-ld6xweg-shard-00-00.7opl1ou.mongodb.net:27017,ac-ld6xweg-shard-00-01.7opl1ou.mongodb.net:27017,ac-ld6xweg-shard-00-02.7opl1ou.mongodb.net:27017/BeSmart?ssl=true&replicaSet=atlas-1hpwfy-shard-0&authSource=admin&appName=Cluster0'
mongoose.connect(url+db_name)
            .then(() => console.log("Connessione al db MongoDB riuscita"))
            .catch((error) => console.error("Errore di connessione", error))

// Con mongoose, le collezioni vengono modellate utilizzando uno 'Schema', che definisce la struttura 
// dei documenti MongoDB e le relative validazioni

const userSchema = new Schema({
    firstname: {type: String, require: true}, 
    lastname: {type: String, require: true}, 
    age: {type: Number, require: true}, 
    email: {type: String, require: true}, 
    createdAt: {type: Date, default: Date.now}
});

const User = model('users', userSchema);

// Le operazioni CRUD in Mongoose sono asincrone e si basano su Promise, 
// rendendole compatibili con la sintassi moderna async/await

async function createUser(user) {
    await user.save();
    console.log("User saved: ", user);
}

async function getAll(){
    const users = await User.find();
    console.log(users);
} 

async function getById(id){
    const user = await User.findById(id)
    console.log(user);
} 

async function getByName(name){
    const users = await User.findOne({firstname: name})
    // Se ci sono più oggetti con lo stesso nome:
    // const users = await User.find({first_name: name});
    console.log(users);
}

async function findByIDAndUpdate(id, age){
    await User.findByIdAndUpdate(id, {age: age})
    console.log("User updated");
}

async function findByIDAndDelete(id){
    await User.findByIdAndDelete(id)
    console.log("User deleted");
}

u = new User({
    firstname: 'Mario', 
    lastname: 'Rossi', 
    age: 34, 
    email: 'm.rossi@example.com', 
    createdAt: new Date()
})
// createUser(u);
// getAll()
// getById('6a06f9bef081892744a1d2c3')