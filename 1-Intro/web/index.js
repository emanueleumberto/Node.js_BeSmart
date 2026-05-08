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
        const success = true;   
        if (success) {
            resolve('Operazione completata con successo!');
        }     else {    
            reject('Si è verificato un errore durante l\'operazione.');
        }
    }, 2000);
});


console.log(promise);

promise.then(result => {
    console.log('Successo:', result);
})
.catch(error => {
    console.error('Errore:', error);
});


const ajaxPromise = new Promise((resolve, reject) => {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', 'https://jsonplaceholder.typicode.com/users');      
    xmlhttp.onload = function() {
        if (this.status === 200 && this.readyState === 4) {
            const users = JSON.parse(this.responseText);
            resolve(users);
        } else {
            reject(new Error(`Errore nella richiesta: ${this.status}`));
        }
    };
    xmlhttp.onerror = function() {
        reject(new Error('Errore di rete durante la richiesta'));
    };
    xmlhttp.send();
});


ajaxPromise.then(users => {
    console.log('Utenti ricevuti:', users);
})
.catch(error => {
    console.error('Errore:', error);
}); 

