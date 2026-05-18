/*
    Express.js è una libreria leggera e flessibile che semplifica notevolmente lo sviluppo 
    di applicazioni web e API con Node.js.
    A differenza del modulo 'http' di Node.js che richiede molta configurazione manuale, 
    Express offre un'interfaccia più intuitiva e consente di concentrarsi sulla logica dell'applicazione.

    [ npm install express ]
*/

const express = require('express');

const app = express();

// Middleware
app.use(express.json())

let users = [
    {id:1, firstname: 'Mario', lastname: 'Rossi', age: 34, email: 'm.rossi@example.com', password: 'Pa$$w0rd!'},
    {id:2, firstname: 'Giuseppe', lastname: 'Verdi', age: 21, email: 'g.verdi@example.com', password: 'Pa$$w0rd!'},
    {id:3, firstname: 'Francesca', lastname: 'Neri', age: 29, email: 'f.neri@example.com', password: 'Pa$$w0rd!'}
];

app.get('/', (request, response) => {
    response.send('Benvenuto sul server Node.js');
})

app.get('/users', (request, response) => {
    response.json(users);
})

app.get('/users/:id', (request, response) => {
    const id = request.params.id;
    const obj = users.find(u => u.id === +id);
    response.json(obj);
})

app.post('/users', (request, response) => {
    const obj = request.body;
    users.push(obj);
    response.json({message: 'Utente salvato'})
})

app.put('/users/:id', (request, response) => {
    const id = request.params.id;
    const obj = request.body;
    const user = users.find(u => u.id === +id);
    if(user.id === obj.id) {
        Object.assign(obj, user);
    }
    response.json({message: 'Utente modificato'})
})

app.delete('/users/:id', (request, response) => {
    const id = request.params.id;
    users = users.filter(u => u.id !== +id);
    response.json({message: 'Utente eliminato'})
})

// Rotta di fallback
app.use((request, response) => {
    response.status(404).send('Pagina non trovata')
})

app.listen(3000, () => {
    console.log("Server in ascolto sulla porta 3000");
})
