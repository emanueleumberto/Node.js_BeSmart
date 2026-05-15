/*
    Nel contesto dei database non relazionali come MongoDB l'utilizzo di uno strumento ORM rimane fondamentale per 
    introdurre ordine, struttura e validazione nelle operazioni di lettura e scrittura.

    In ambienti NoSQL, gli ORM come 'Mongoose' consentono di modellare i documenti come oggetti strutturati,
    definendo schemi formali con vincoli, valori predefiniti e tipi di dato. Questa astrazione consente di 
    integrare la flessibilità di MongoDB con i vantaggi della programmazione orientata agli oggetti, 
    favorendo un codice più robusto, leggibile e sicuro.

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

const mongoose = require('mongoose')
const {Schema, model} = require('mongoose')

// const url = 'mongodb://localhost:27017' // Collegamento ad un db locale
// const url = 'mongodb+srv://admin:<db_password>@cluster0.7opl1ou.mongodb.net/?appName=Cluster0'
//const url = 'mongodb://admin:Qp1CxtD4s3j6q6TB@ac-ld6xweg-shard-00-00.7opl1ou.mongodb.net:27017,ac-ld6xweg-shard-00-01.7opl1ou.mongodb.net:27017,ac-ld6xweg-shard-00-02.7opl1ou.mongodb.net:27017/?ssl=true&replicaSet=atlas-1hpwfy-shard-0&authSource=admin&appName=Cluster0'
const url = 'mongodb://admin:Qp1CxtD4s3j6q6TB@ac-ld6xweg-shard-00-00.7opl1ou.mongodb.net:27017,ac-ld6xweg-shard-00-01.7opl1ou.mongodb.net:27017,ac-ld6xweg-shard-00-02.7opl1ou.mongodb.net:27017/BeSmart?ssl=true&replicaSet=atlas-1hpwfy-shard-0&authSource=admin&appName=Cluster0'

mongoose.connect(url)
    .then(() => {
            console.log("Connessione al DB Mongo");
        }).catch((error) => {
            console.error('Errore di connessione al DB', error.message);
        })

// Con mongoose, le collezioni vengono modellate utilizzando uno 'Schema', che definisce la struttura 
// dei documenti MongoDB e le relative validazioni

const userSchema = new Schema({
    firstname: {type: String, require: true}, 
    lastname: {type: String, require: true}, 
    age: {type: Number, require: true}, 
    email: {type: String, require: true}, 
    createdAt: {type: Date, default: Date.now}
})

const User = model('users', userSchema)

// Le operazioni CRUD in Mongoose sono asincrone e si basano su Promise, 
// rendendole compatibili con la sintassi moderna async/await

async function saveUser(user) {
    await user.save();
    console.log('User saved: ', user);
}

// create()	più lenta
// insertMany()	più veloce
async function saveAll(arr) {
    const users = await User.insertMany(arr)
    //const users = await User.create(arr)
    console.log(users);
}

async function getAll() {
    const users = await User.find()
    console.log(users);
}

async function getById(id) {
    const user = await User.findById(id)
    console.log(user);
}

async function getByName(firstname) {
    const user = await User.findOne({firstname})
    // Se ci sono più oggetti con lo stesso nome:
    // const users = await User.find({first_name: firstname});
    console.log(user);
}

async function getByIdAndUpdate(id, age) {
    await User.findByIdAndUpdate(id, {age})
    console.log("Dato modificato con successo");
}

async function getByIdAndDelete(id) {
    await User.findByIdAndDelete(id)
    console.log("Dato eliminato con successo");
}


const obj = new User({firstname: 'Antonio', lastname: 'Bianchi', age: 45, email: 'a.bianchi@example.com', createdAt: new Date()})

arr = [
    {firstname: 'Mario', lastname: 'Rossi', age: 23, email: 'm.rossi@example.com', createdAt: new Date()},
    {firstname: 'Giuseppe', lastname: 'Verdi', age: 39, email: 'g.verdi@example.com', createdAt: new Date()},
    {firstname: 'Francesca', lastname: 'Neri', age: 32, email: 'f.neri@example.com', createdAt: new Date()}
]

// saveUser(obj)
// saveAll(arr)
// getAll()
// getById('6a073b0da3aac31099aa6749')
// getByName('Antonio')
// getByIdAndUpdate('6a0722285a22db46a9f14f61', 30)
// getByIdAndDelete('6a073b0da3aac31099aa6749')