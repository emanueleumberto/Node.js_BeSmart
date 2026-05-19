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
        //     state: 'Italy'
        // },
        address_id: 1,
        posts: []
    },
    {
        _id: 2,
        firstname: 'Francesca',
        lastname: 'Neri',
        age: 36,
        // address: {
        //     city: 'Paris',
        //     state: 'France'
        // },
        address_id: 2,
        // posts: [
        //     {
        //         title: 'First Post',
        //         boby: 'Lorem Ipsum',
        //         date: '17/05/2026',
        //         comments: []
        //     },
        //     {
        //         title: 'Second Post',
        //         boby: 'Lorem Ipsum',
        //         date: '18/05/2026',
        //         comments: [
        //             {
        //                 comment: 'First Comment',
        //                 date: '18/05/2026',
        //                 author: 'Mario Rossi'
        //             }
        //         ]
            // },{
            //     title: 'New Post',
            //     boby: 'Lorem Ipsum',
            //     date: '19/05/2026'
            // }
        // ]
        posts: [1,3]
    },
    {
        _id: 3,
        firstname: 'Giuseppe',
        lastname: 'Verdi',
        age: 21,
        // address: {
        //     city: 'Roma',
        //     state: 'Italy'
        // },
        address_id: 1,
        posts: []
    }
]

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
        boby: 'Lorem Ipsum',
        date: '17/05/2026',
        comments: []
    },
    {
        _id: 2,
        title: 'Second Post',
        boby: 'Lorem Ipsum',
        date: '18/05/2026',
        comments: [
            {
                comment: 'First Comment',
                date: '18/05/2026',
                author: 'Mario Rossi'
            }
        ]
    },{
        _id: 3,
        title: 'New Post',
        boby: 'Lorem Ipsum',
        date: '19/05/2026'
    }
]