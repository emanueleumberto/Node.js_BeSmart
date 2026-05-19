/* Relazioni MongoDB */
// One to One | One to Many | Many to Many

/* Referencing - Embedding */

// User 
let user = [
    {
        _id: 1,
        firstname: 'Mario',
        lastname: 'Rossi',
        age: 34,
        // address: {
        //     city: 'Roma',
        //     state: 'Italia'
        // }
        address_id: 1,
        posts: []
    },
    {
        _id: 2,
        firstname: 'Giuseppe',
        lastname: 'Verdi',
        age: 41,
        // address: {
        //     city: 'Roma',
        //     state: 'Italia'
        // }
        address_id: 1,
        posts: [1,2]
    },
    {
        _id: 3,
        firstname: 'Francesca',
        lastname: 'Neri',
        age: 22,
        // address: {
        //     city: 'Paris',
        //     state: 'France'
        // }
        address_id: 2,
        posts: []
    }
]

// Address
let address = [
    {
        _id: 1,
        city: 'Roma',
        state: 'Italy'
    },
    {
        _id: 2,
        city: 'Paris',
        state: 'France'
    }
] 

let posts = [
    {
        _id: 1,
        title: 'First Post',
        body: 'Lorem ipsum',
        date: '19/05/2026',
        comments: [
            {
                comment: 'First Comment',
                date: '19/05/2026',
                author: 'Mario Rossi'
            }
        ]
    },
    {
        _id: 1,
        title: 'First Post',
        body: 'Lorem ipsum',
        date: '19/05/2026',
        comments: []
    }
]