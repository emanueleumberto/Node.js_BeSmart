console.log('Ciao a tutti');


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('text').innerHTML = 'abc'
})


console.log(window);

miaVar = 'Ciao'

function abc(){
    return 'Sono la funzione abc'
}


let f = abc



obj = {
    nome: 'Mario',
    cognome: 'Rossi',
}

json = JSON.stringify(obj)
console.log(json)

ogg = JSON.parse(json)
console.log(ogg)    


xmlhttp = new XMLHttpRequest()
xmlhttp.open('GET', 'https://jsonplaceholder.typicode.com/users') 
xmlhttp.send()
xmlhttp.onload = function() {
    if (this.status === 200 && this.readyState === 4) {
        const users = JSON.parse(this.responseText);        
        console.log(users);
    } else {    
        console.error('Errore nella richiesta:', this.status);
    }
}


const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true; // Simula un'operazione riuscita o fallita    
        if (success) {
            resolve('Operazione completata con successo!');
        } else {
            reject('Si è verificato un errore durante l\'operazione.');
        }       
    }, 2000); // Simula un'operazione asincrona che richiede 2 secondi
});

console.log(promise);

promise.then(result => {
    console.log('Successo:', result);
})
.catch(error => {
    console.error('Errore:', error);
});


