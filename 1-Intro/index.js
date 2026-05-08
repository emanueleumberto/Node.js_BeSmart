console.log(globalThis);

console.log(__dirname);
console.log(__filename);

// console.log(module);

console.log("-----------------------")
// ID univoco del processo corrente
console.log(process.pid)
// Sistema operativo ('darwin', 'linux', 'win32')
console.log(process.platform)
// Architettura della CPU ('x64', 'arm', ecc)
console.log(process.arch)
// Versione di Node.js in uso
console.log(process.version)
// Directory di lavoro corrente
console.log(process.cwd())
// Variabile d'ambiente
console.log(process.env.NODE_ENV)

// Gestione degli eventi di processo
process.on('exit', (code) => {
    console.log(`Processo terminato con codice ${code}`)
}) 

process.on('SIGINT', () => {
    console.log(`CTRL + C. Terminazione sicura`)
}) 

process.on('uncaughtException', (error) => {
    console.log(`Eccezione non catturata: ${error.message}`)
})

process.on('unhandledRejection', (reason, promise) => {
    console.log(`Promise rifiutata senza gestione: ${reason}`)
})

const mod = require('./moduli/utilsCJS'); // CommonJS
console.log(mod);


console.log(mod.sum(25,5));

const {sum} = require('./moduli/utilsCJS'); // CommonJS
console.log(sum(25,5));

//import {sum} from './moduli/utilsESM.mjs' // ES Module 
//console.log(sum(25,5));

const path = require('path')

// Modulo PATH
// console.log(path);
const absolutePath = path.resolve('nomeCartella', 'nomeFile.txt');
console.log("Percorso assoluto: ", absolutePath);
const extension = path.extname('documento.pdf');
console.log("Estensione del file: ", extension);
const filePath = path.join(__dirname, 'public', 'index.html');
console.log("Percorso file: ", filePath);
const parsed = path.parse(filePath);
// console.log(parsed);
console.log("Nome del file: ", parsed.base);

const os = require('os')

// Modulo OS
// console.log(os)
console.log("Sistema operativo: ", os.type());
console.log("Piattaforma: ", os.platform());
console.log("Architettura: ", os.arch());
console.log("Versione: ", os.release());
console.log("CPU: ", os.cpus()[0].model);
console.log("Numero di core: ", os.cpus().length);
console.log("Memoria totale: ", os.totalmem());
console.log("Memoria libera: ", os.freemem());
console.log("Uptime del sistema (secondi): ", os.uptime());
console.log("Carico medio: ", os.loadavg());
console.log("Directory home: ", os.homedir());
console.log("Directory temporanea: ", os.tmpdir());

const crypto = require('crypto')

const password = 'MaiaPassword'
const hash = crypto.createHash('sha256').update(password).digest('hex')
console.log(hash);
const token = crypto.randomBytes(32).toString('hex')
console.log(token);


const fs = require('fs');
// console.log(fs);

// Modulo fs
// fs.readFile()
// fs.readFileSync()
// fs.writeFile()
// fs.writeFileSync()
// fs.appendFile()
// fs.appendFileSync()

fs.readFile('text.txt', 'utf8', (error, data) => {
    if(error){
        console.error('Errore durante la lettura del file', error.message);
        return
    }

    console.log('Contenuto del file: ', data);
})

// Metodi sincroni (bloccanti) di un file di testo, da usare con cautela, 
// poichè blocca l'intero thread fino al completamento dell'operazione
try {
    const data = fs.readFileSync('text.txt', 'utf8');
    console.log("Contenuto del file: ", data)
    
} catch (error) {
    console.error("Errore durante la lettura del file: ", error.message);
}


// fs.writeFile()
const content = "Questo è un nuovo contenuto da scrivere nel file."
fs.writeFile('output.txt', content, 'utf8', (error) => {
    if(error){
        console.error("Errore durante la scrittura del file: ", error.message);
        return
    }
    console.log("File scritto con successo")
})


// Scrittura sincrona (bloccante) di un file di testo
try {
    fs.writeFileSync('output.txt', content, 'utf8');
    console.log("Contenuto scritto nel file con successo")
} catch (error) {
    console.error("Errore durante la lettura del file: ", error.message);
}



// Per aggiungere dati senza sovrascrivere il contenuto esistente
const contentToAdd = '\nNuova riga aggiunta al file.'

// Aggiunta asincrona di un file di testo
fs.appendFile('output.txt', contentToAdd, 'utf8', (error) => {
    if(error) {
        console.error("Errore durante l'aggiunta al file: ", error.message);
        return;
    }
    console.log("Contenuto aggiunto nel file con successo")
})

// Aggiunta sincrona (bloccante) di un file di testo
try {
    fs.appendFileSync('output.txt', contentToAdd, 'utf8');
    console.log("Contenuto aggiunto nel file con successo")
} catch (error) {
    console.error("Errore durante l'aggiunta al file: ", error.message);
}



// In contesti in cui è necessario trattare dati binari come immagini, file compressi, 
// archivi o contenuti trasmessi tramite socket, Node.js mette a disposizione l'oggetto Buffer,
// progettato per gestire dati binari grezzi in modo efficiente
// Buffer è un oggetto globale che rappresenta una sequenza di byte fissi e consente la manipolazione 
// a basso livello dei dati.
// Il modulo fs supporta la lettura di file in modalità binaria semplicemente omettendo l'opzione di codifica.
// In questo caso il secondo parametro della callback sarà un oggetto di tipo Buffer.
fs.readFile('user.jpg', (error, buffer) => {
    if(error){
        if(error.code === 'ENOENT') {
            console.error("File non trovato: ", error.message);
        } else {
            console.error("Errore durante la lettura del file: ", error.message);
        }
        return
    }
    if(Buffer.isBuffer(buffer)){
        console.log("Dati binari letti correttamente, dimensione in byte: ", buffer.length);
        console.log("Prime 20 byte del buffer: ", buffer.slice(0, 20));
    }
})


/*
    Uno degli aspetti più critici nelle operazioni di lettura e scrittura con fs 
    è la corretta gestione degli errori che possono verificarsi per motivi diversi.
    - Nei metodi asincroni Node.js adotta la convenzione di specificare l'oggetto error 
      come primo argomento della callback nel caso in cui l'operazione fallisca.
    - Nei metodi sincroni l'errore viene sollevato come eccezione ed è necessario 
      intercettarlo tramite un try/catch
    Node.js adotta codici standardizzati per identificare gli errori comuni del file system
    -> ENOENT   File o directory non esistente
    -> EACCES   Permesso negato
    -> EISDIR   Il percorso è una directory, non un file
    -> EEXIST   Il file esiste già
    -> ENOSPC   Spazio su disco insufficiente

*/ 

/* 
    A partire da Node.js 10 il modulo fs include una versione moderna di API basata su Promise.
    Questo approccio rappresenta oggi lo standard raccomandato per scrivere codice asincrono scalabile,
    evitando la complessità delle callback tradizionali annidate
    Utilizzare le Promise consente di sfruttare appieno la sintassi async/await migliorando la chiarezza dell'implementazione 
    e semplificando la gestione degli errori attraverso try/catch
*/

/*
    Il modulo fs fornisce anche un insieme completo di strumenti per la gestione e la manipolazione delle directory.
    - fs.mkdir() -> Creare una directory
    - fs.readdir() -> Lettura del contenuto di una directory
    - fs.rename() -> Rinominare e spostare directory
    - fs.rmdir() -> Eliminare una directory vuota
    - fs.rm() -> Eliminare una directory e il suo contenuto
*/

// Crea una directory 
// Se la directory esiste, il metodo restituirà un errore. 
// è possibile utilizzare l'opzione recursive: true che consente di evitare l'errore
fs.mkdir('folder', {recursive: true}, (error) => {
    if(error) {
        return console.error('Errore nella creazione della directory', error.message);
    }
    console.log('Directory creata con successo.');
});


// Per un approccio moderno e basato su Promise si può utilizzare 
// async function createDirectory(dirName) {
//     await fs.promises.mkdir('folder', {recursive: true});
// }
// try{  createDirectory('folder');
// } catch(error) {console.error('Errore durante la creazione della directory', error.message);}


// Lettura del contenuto di una directory
// Questo metodo restituisce un array contenente i nomi di tutti i file e le sottodirectory presenti
fs.readdir('folder', (error, files) => {
    if(error) {
        return console.error('Errore nella lettura della directory', error.message);
    }
    console.log('Contenuto della directory:', files);
    files.forEach(name => {
        fs.stat(name, (error, stats) => {
            if(error) { return console.error('Errore nel recupero di informazioni', error.message); }
            if(stats.isDirectory) {console.log(`${name} è una directory!`)}
            else if(stats.isFile) {console.log(`${name} è un file!`)}

            // Metadati
            console.log(`Dimensione: ${stats.size} byte`)
            console.log(`Ultima modifica: ${stats.mtime}`)
            console.log(`Creazione: ${stats.ctime}`)
            console.log(`Permessi (mode): ${stats.mode.toString(8)}`)
        })
    })
})

// Per un approccio moderno e basato su Promise si può utilizzare 
// const files = await fs.promises.readdir('folder');
// files.forEach(name => {
//         fs.stat(name, (error, stats) => {
//             if(error) { return console.error('Errore nel recupero di informazioni', error.message); }
//             if(stats.isDirectory) {console.log(`${name} è una directory!`)}
//             else if(stats.isFile) {console.log(`${name} è un file!`)}
//            // Metadati
//            console.log(`Dimensione: ${stats.size} byte`)
//            console.log(`Ultima modifica: ${stats.mtime}`)
//            console.log(`Creazione: ${stats.ctime}`)
//            console.log(`Permessi (mode): ${stats.mode.toString(8)}`)
//         })
//     })


// Rinominare e spostare directory
fs.rename('old_folder', 'new_folder', (error) => {
    if(error) {
        return console.error('Errore nel rinominare la directory', error.message);
    }
    console.log('Directory rinominata con successo.');
})

fs.rename('old/folder', 'new/folder', (error) => {
    if(error) {
        return console.error('Errore nello spostare la directory', error.message);
    }
    console.log('Directory spostata con successo.');
})

// Per un approccio moderno e basato su Promise si può utilizzare 
// await fs.promises.rename('old_folder', 'new_folder');

// Eliminare una directory vuota fs.rmdir()
fs.rmdir('folder', (error) => {
    if(error) {
        return console.error('Errore nella rimozione della directory', error.message);
    }
    console.log('Directory eliminata con successo.');
});

// Eliminare una directory e il suo contenuto fs.rm()
// l'opzione recursive: true permette di cancellare directory contenti file o sottodirectory
// l'opzione force: true forza l'eliminazione anche in presenza di file protetti o con permessi ristretti
fs.rm('folder', {recursive: true, force: true}, (error) => {
    if(error) {
        return console.error('Errore nella rimozione della directory', error.message);
    }
    console.log('Directory e contenuto eliminati con successo.');
});

// Per un approccio moderno e basato su Promise si può utilizzare 
// await fs.promises.rm('folder', {recursive: true, force: true});

