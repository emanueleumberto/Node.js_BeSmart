const fs = require('fs');

// Un Readable stream rappresenta una sorgente da cui è possibile leggere dati. 
// I dati vengono letti in 'chunk' (blocchi) e resi disponibili gradualmente, riducendo l'impatto sulla memoria
// Un Readable stream emette eventi come "data", "end" e "error" 
// oppure può essere consumato tramite il metodo asincrono .pipe()


// Uno degli scenari più classici è la lettura di un file di grandi dimensioni. 
// A differenza del metodo fs.readFile() che carica tutto il contenuto in memoria prima di restituirlo
// fs.createReadStream() consente di suddividere il file in blocchi (chunk) leggendoli in modo progressivo


const readableStream = fs.createReadStream('bigfile.txt', {encoding: 'utf8'});
readableStream.on('data', (chunk) => {
    // console.log('Nuovo chunk di dati ricevuto: ', chunk);
});
readableStream.on('end', () => {
    console.log('Fine del file raggiunta');
});
readableStream.on('error', (error) => {
    console.error('Errore durante la lettura del file: ', error.message);
});

// Un Writable stream permette di inviare dati in modo incrementale, frammentandoli in blocchi
// Un Writable stream espone metodi come .write() e end() oltre al eventi come "drain" e "finish"

const writableStream = fs.createWriteStream('output.txt', {encoding: 'utf8'});
writableStream.write("mioContenuto")
writableStream.write("altroContenuto")

writableStream.end(); // Indica che non ci sono più dati da scrivere e chiude il flusso
// writableStream.write("Nuova riga aggiunta al file.\n") // Questo write non avrà effetto perché il flusso è già stato chiuso con end()

writableStream.on('finish', () => {
    console.log('Tutti i dati sono stati scritti su output.txt');
});

writableStream.on('error', (error) => {
    console.error('Errore durante la scrittura del file: ', error.message);
});


// Nel caso in cui il Writable stream sia temporaneamente sovraccarico il metodo write restituisce false.
// In tal caso, è possibile ascoltare l'evento 'drain' per saper quando poter riprendere a scrivere
if(!writableStream.write('mioContenuto')) {
    writableStream.once('drain', () => {
        writableStream.write('mioContenuto');
    })
}


// L'utilizzo di pipe() è particolarmente adatto per operazioni di copia file, trasferimento di contenuti
// o manipolazione di flussi di dati in tempo reale.
// Questo metodo consente di collegare direttamente un Readable a un Writable stream 
// creando una pipeline di trasferimento dati efficiente, non bloccante e automatica

const readablePipe = fs.createReadStream('origin.txt');
const writablePipe = fs.createWriteStream('destination.txt');

// In questo esempio ogni chunk letto da origin viene immediatamente scritto in destinatione
// senza gestire manualmente gli eventi
readablePipe.pipe(writablePipe);

writablePipe.on('finish', () => {
    console.log('Copia del file completata con successo');
}   );
writablePipe.on('error', (error) => {
    console.error('Errore durante la copia del file: ', error.message);
});
readablePipe.on('error', (error) => {
    console.error('Errore durante la lettura del file: ', error.message);
});


// In un server HTTP creato con il modulo http l'oggetto 'req' ricevuto all'interno della callback 
// è anch'esso un Readable stream e l'oggetto 'res' rappresenta un Writable stream 
// const http = require('http')
// const server = http.createServer((req, res) => {/*... */})

/* 
    Un Duplex stream è una particolare categoria di stream che unisce le funzionalità di Readable e Writable
    all'interno dello stesso oggetto. Questo significa che può ricevere dati in ingresso e inviare dati in uscita
    in modo indipendente e se necessario, anche in parallelo.
    Un Duplex stream gestisce due flussi separati ma coordinati, uno per la lettura e uno per la scrittura.
    Questa architettura lo rende particolarmente adatto per tutti quei contesti 
    in cui è richiesta comunicazione bidirezionale. Sono esempi comuni di Duplex stream
    -> I socket TCP con net.Socket
    -> Le connessioni WebSocket
    -> Gli stream personalizzati creati con la classe stream.Duplex

    Un socket TCP è un endpoint di comunicazione bidirezionale tra due dispositivi in rete.
    Si basa sul protocollo Transmission Control Protocol, che garantisce una trasmissione affidabile dei dati.
    Viene utilizzato per stabilire connessioni stabili tra client e server (es. browser ↔ server web).

    Anche i WebSocket, utilizzati per applicazioni in tempo reale come chat, giochi o dashboard live,
    si basano su un Duplex stream. Attraverso librerie come ws ogni webSocket è in grado di ricevere
    ed emettere messaggi mantenendo  una comunicazione aperta
*/


// Socket con net.Socket
const net = require('net')
const server = net.createServer((socket) => {
    console.log('Nuova connessione stabilita');
    socket.on('data', (chunk) => {
        console.log('Dati ricevuti dal client: ', chunk.toString());
        socket.write('Dati ricevuti correttamente');
    });
    socket.on('end', () => {
        console.log('Connessione chiusa dal client');
    }); 

});
// server.listen(4000, () => {
//     console.log('Server in ascolto sulla porta 4000');
// });

// Connessione WebSocket
// npm install ws
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', (ws) => {
    console.log('Nuova connessione WebSocket stabilita');
    ws.on('message', (message) => {
        console.log('Messaggio ricevuto dal client: ', message);
        ws.send('Messaggio ricevuto correttamente');
    }   );
    ws.on('close', () => {
        console.log('Connessione WebSocket chiusa dal client');
    });
});

/*
    Un Trasform stream rappresenta una specializzazione del concetto di Duplex stream, 
    in cui i dati non vengono semplicementi letti e scritti, ma trasformati lungo il percorso.
    Questo tipo di stream è dotato di lettura e scrittura, ma si distingue perchè ogni blocco 
    in ingresso viene elaborato, modificato o convertito prima di essere messo a disposizione in uscita.
    I Trasform stream sono particolarmente efficaci in scenari come 
    compressione, cifratura, codifica, parsing e streaming di contenuti 
*/

// Compressione con zlib.createGzip()
// const fs = require('fs');
// const zlib = require('zlib');
// const source = fs.createReadStream('text.txt');
// const destination = fs.createWriteStream('text.txt.gz');
// // i dati originali vengono letti a blocchi, compressi e scritti su disco nel formato .gz
// source.pipe(zlib.createGzip()).pipe(destination);

// Crittografia con crypto.createCipheriv()
// Anche la crittografia e la decifratura dei dati è possibile con Trasform stream
// Il modulo crypto offre metodi per creare flussi che cifrano o decifrano dati in tempo reale
// const fs = require('fs');
// const crypto = require('crypto');
// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);

// const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
// fs.createReadStream('text.txt')
//     .pipe(cipher)
//     .pipe(fs.createWriteStream('text_crittografato.txt'));