console.log(globalThis);

// console.log(__dirname);
// console.log(__filename);

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
console.log(mod.sum(25,5));

const {sum} = require('./moduli/utilsCJS'); // CommonJS
console.log(sum(25,5));

// import {sum} from './moduli/utilsESM.mjs' // ES Module 

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

// Lettura sincrona (bloccante) di un file di testo, da usare con cautela, 
// poichè blocca l'intero thread fino al completamento dell'operazione
try {
    const data = fs.readFileSync('text.txt', 'utf8');
    console.log("Contenuto del file: ", data)
    
} catch (error) {
    console.error("Errore durante la lettura del file: ", error.message);
}
