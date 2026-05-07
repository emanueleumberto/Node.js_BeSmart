// node --version -> verifica la versione di node installata
// npm --version -> verifica la versione di npm installata
// node [file_name.js] -> viene utilizzato per eseguire un file js tramite Node.js

/*
    npm (Node Package Manager) è uno degli strumenti fondamentali per lo sviluppo con Node.js
    La sua funzione pricipale è gestire package e librerie
    Ogni pacchetto può essere installato globalmente o localmente all'interno di una directory di progetto
    Per installare un pacchetto globalmente si utilizza il flag -g
    -> npm install -g nodemon
    L'approccio locale è considerato una best practice nello sviluppo moderno con Node.js
    Installare le dipendenze localmente evita di contaminare l'ambiente globale e garantisce 
    che ogni progetto resti indipendente dagli altri 
*/

console.log("log") // stampa un messaggio informativo standard
console.info("info") // come .log() ma semanticamente orientato alle info
console.warn("warn") // stampa un messaggio di avviso (evidenziato in giallo)
console.error("error") // stampa un messaggio di errore critico
console.table([]) // organizza un array o oggetti complessi in forma tabellare
console.time() // misurano la durata di un'operazione
console.timeEnd() // misurano la durata di un'operazione
// console.trace() // stampa una traccia dello stack a partire dal punto in cui è stato invocato


/* 
    Nodemon è un utility che monitora i file del progetto e riavvia automaticamente 
    l'esecuzione di Node ogni volta che uno di essi viene modificato
    Si installa in un progetto Node come dipendenza di sviluppo
    -> npm install --save-dev nodemon
    -> nodemon app.js

    Dalla versione 18+ Node.js ha introdotto "watch mode"
    Questo strumento consente di ottenere un comportamente simile a "nodemon",
    ma senza dipendenze esterne.
    -> node --watch app.js
    anche in questo caso, ogni volta che il app.js viene modificato 
    il processo Node si riavvia automaticamente
*/

/*
    Creazione di un progetto Node.js con npm
    
    Per inizializzare un progetto Node e generare il file package.json
    -> npm init oppure npm init -y

    Viene creata o aggiornata la directory node_modules che contiene fisicamente i pacchetti installati
    Viene creato o aggiornato il file package.json che descrive le dipendenze principali del progetto 
        e altre informazioni come nome, versione e script
    Viene creato o aggiornato il file package-lock.json che registra con precisione 
        le versioni esatte dei pacchetti e delle loro dipendenze per garantire installazioni identiche

    Questa struttura modulare consente di lavorare su progetti diversi senza rischiare conflitti 
        tra versioni di librerie, poichè ogni progetto mantiene il proprio spazio isolato.

    Nel file package.json possiamo definire script personalizzati che possono eseguire comandi predefiniti
        o complessi in mod osemplice ed efficiente. uno script per avviare la nostra applicazione Node.js 
        in modo semplificato
        -> "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1",
                "start": "node --watch app.js"
                "dev": "nodemon intro.js"
            }
        -> npm run dev - esegue uno script
        -> npm start - "start" o "test" possono essere eseguiti anche senza il prefisso run

    Attraverso queste semplici istruzioni abbiamo creato una base solida per un'applicazione Node.js
        con una gestione ordinata delle dipendenze e l'utilizzo corretto di npm.
    Grazie al file package.json possiamo ricreare lo stesso ambiente di sviluppo su macchine diverse,
        installando automaticamente tutte le dipendenze e le versioni corrette eseguendo
        -> npm install
    La rimozione di un modulo è altrettanto semplice, utilizzando "uninstall" 
    è possibile eliminare un pacchetto dal progetto, eliminandolo dalla cartella node_modules 
    e dalla sezione dependencies del package.json
        -> npm uninstall [package_name]

    In fase di deployment o configurazione in ambienti di produzione, 
        può essere necessario installare solo le dipendenze necessarie all'esecuzione dell'applicazione,
        escludendo le librerie utilizzate esclusivamente per lo sviluppo
        -> npm install --production
        Questo installa solo i pacchetti dicharati nella sezione "dependencies" ed ignora 
            completamente la sezione "devDependencies".
            Riducendo il peso dell'applicazione e aumentando la sicurezza evitando 
            di installare strumenti di sviluppo inutili
    
    Con il progredire dello sviluppo, le librerie indicate nel package.json possono 
        pubblicare nuove versioni contenenti correzioni di sicurezza, miglioramenti e funzionalità aggiuntive.
        Per aggiornare tutte le dipendenze eseguire
        -> npm update
        Nota: il comando npm update non aggiorna mai a versioni incopatibili

    In un progetto Node.js le dipendenze possono essere catalogate in due categorie principali:
        -> dependecies - elenca tutti i package necessari per il funzionamento dell'applicazione
            - npm install [package_name] oppure npm install --save [package_name]
        -> devDependencies - contiene i package necessari solo durante lo sviluppo
            per installare un pacchetto come dipendenza di sviluppo si utilizza il flag --save-dev
            - npm install --save-dev [package_name]
*/

/*
    Oltre ai comandi standard "npm install" e "npm update" l'ecosistema Node.js 
    mette a disposizione strumenti avanzati per mantenere progetti aggiornati, sicuri ed efficienti
    
    -> npm audit - analizza le dipendenze alla ricerca di vulnerabilità note.
                    restituisce un report sulla tipologia della vulnerabilità (critical, high, moderate, low)
                    il pacchetto interessato, la versione e la soluzione raccomandata.
    -> npm audit fix - tenta una correzione immediata se sono disponibili soluzioni,
                    in caso di vulnerabilità critiche potrebbe essere necessario aggiornare manualmente
    -> npm outdated - controlla quali pacchetti sono obsoleti rispetto alle versioni più recenti pubblicate
*/

/*
    Oggetti Globali di Node.js
    Gli oggetti globali, sono quelle entità accessibili ovunque nell'applicazione senza importazioni esplicite
    -> "global o globalThis" (ES Module) è un oggetto globale in Node.js, è l'equivalente di "windows" nel browser. 
                Ma a differenza di Vanilla js dove un dato dichiarato come var nel contesto globale 
                diventa una proprietà di window, in Node non è così. 
    -> "__dirname" (CommonJS) restituisce il percorso assoluto della directory corrente 
                del modulo in cui il codice è eseguito
    -> "__filename" (CommonJS) restituisce il percorso assoluto del file attualmente in esecuzione
    -> "module" (CommonJS) rappresenta l'oggetto che incapsula il modulo corrente e contiente tutti i metadati del modulo,
                è fondamentale per la gestione dei moduli CommonJS. 
                L'equivalente ESM sono le dichiarazioni statiche import ed export
    -> "exports o module.exports" (CommonJS) serve per esportare funzioni, oggetti, classi da un modulo
                exports.greet = () => console.log("Hello World!")
                In un modulo ESM utilizziamo la keyword export per esportare dati
                export default { func() {console.log("Hello World!") } }
    -> "require" (CommonJS) funzione che consente di importare altri moduli CommonJS, 
                siano essi built-in, esterni o file locali.
                const fs = require('fs')
                In un modulo ESM utilizziamo la keyword import per importare dati
                import fs from 'fs'
    -> "import" (CommonJS/ES Module) la funzione import consente di caricare moduli 
                in modo asincrono e dinamico durante l'esecuzione del programma, 
                restituendo un Promise che si risolve con l'oggetto del modulo importato.
                E' utile quando si desidera caricare un modulo solo al verificarsi di una determinata condizione 
                o ridurre i temoi di avvio
                // Caricamento dinamico basato su una condizione
                if (userIsLoggedIn) {
                    const { dashboard } = await import('./dashboard.js');
                    dashboard.render();
                }
    -> "process" (CommonJS/ES Module) fornisce un'interfaccia diretta con il processo di Node in esecuzione,
                consentendo di accedere a informazioni di sistema ecc
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
                // Variabile d'ambiente definite nel file .env per leggerle tramite il modulo dotenv
                console.log(process.env.NODE_ENV)

        Uno degli aspetti più avanzati e sottovalutati dell'oggetto process è la capacità di ascoltare eventi 
        legati al ciclo di vita dell'applicazione.
        -> exit - viene emesso quando il processo Node sta per terminare, sia in modo naturale, 
                  sia in seguito ad una chiamata process.exit()
                  // Gestione degli eventi di processo
                    process.on('exit', (code) => {
                        console.log(`Processo terminato con codice ${code}`)
                    }) 
        -> SIGINT - viene emesso quando vi è una fine forzata con la cominazione di tasti CTRL + C
                    process.on('SIGINT', () => {
                        console.log(`CTRL + C. Terminazione sicura`)
                    })
        -> uncaughtException - viene emesso quando un errore viene sollevato in modo sincrono 
                    e non è racchiuso in un blocco try/catch
                    process.on('uncaughtException', (error) => {
                        console.log(`Eccezione non catturata: ${error.message}`)
                    })
        -> unhandledRejection - viene emesso quando una promise viene rifiutata(reject) 
                    ma non viene intercettata da un blocco try/catch asincorono 
                    process.on('unhandledRejection', (reason, promise) => {
                        console.log(`Promise rifiutata senza gestione: ${reason}`)
                    })
*/

/*
    Gestione dei Moduli
    Node.js si basa su un sistema modulare che permette di organizzare codice in unità riutilizzabili ed indipendenti.
    Un modulo in Node.js non è altro che un file Javascript che esporta una o più funzionalità utilizzabili da altri file



    Node.js supporta due sistemi principali per la gestione dei moduli: CommonJS(CJS) e ES Module(ESM)
        CommonJS è il sistema di moduli nativo di Node.js sin dalle prime versioni, 
        mentre ES Module è stato introdotto in conformità allo standard ECMAScript 
        per allinearsi con il comportamento dei moduli nel browser.

        CommonJS -> Si basa sulla funzione require() per importare i moduli e 
                    sull'oggetto module.exports per esportarli. 
                    E' il metodo di default per la gestione dei moduli in Node.js
                    Se specificato "type": "module" nel package.json richiede l'estensione .cjs
        ES Module -> Utilizza la sintassi "import" ed "export" simile a quella di Javascript per il browser.
                    Questo sistema consente di scrive codice più leggibile, modulare e aderente agli standard ECMAScript.
                    Nel file app si richiede l'estensione .mjs o specificare "type": "module" nel package.json

        La separazione tra .mjs e .cjs e la dichiarazione del type nel package.json è quindi fondamentale 
        per evitare conflitti tra i due sistemi di moduli.
        Nei progetti moderni è preferibile adottare ESM in modo coerente utilizzando "type": "module" nel package.json e
        file .js riservando .cjs per codice legacy o moduli di terze parti non convertite a ESM

*/

// Moduli CommonJS e ES Module
// Nel file app si richiede l'estensione .mjs o specificare "type": "module" nel package.json
// import {sum} from './moduli/utilsESM.mjs' // ES Module
// console.log(sum(5,3))

// Gestione dei moduli di default di Node.js
// const sum = require('./moduli/utilsCJS'); // CommonJS
// console.log(sum(5,3))

/*
    Moduli Core

    Node.js mette a disposizione una vasta collezione di moduli core, 
    fondamentali per la sviluppo di applicazioni lato server e per la gestione di operazioni a basso livello.
    Per utilizzare un modulo core, è sufficiente importarlo tramite la funzione require() per CommonJS 
    e import per EcmaScript Modules.
    Node.js offre numerosi moduli core, ognuno con una specifica area di competenza.
    - fs            -> Gestisce il file system consentendo operazioni di lettura, scrittura e manipolazione di file 
                       e directory.
    - http          -> Permette di creare server HTTP, gestire richieste e risposte e costruire API REST
    - path          -> Fornisce strumenti per lavorare con i percorsi dei file, unificando le differenze 
                       tra sistemi operativi.
    - os            -> Offre informazioni e strumenti per interagire con il sistema operativo, come l'accesso 
                       alla memoria disponibile, ai core della CPU e alle directory temporanee
    - crypto        -> Implementa algoritmi di crittografia e hashing, consentendo di generare chiavi sicure 
                       e cifrare i dati.
    - events        -> Permette di creare e gestire eventi personalizzati, utilizzando il design pattern Observer.
    - child_process -> Consente di eseguire comandi di sistema o script in processi figli, 
                       facilitando l'interazione con la shell
    - stream        -> Gestisce flussi di dati, fondamentali per operazioni su file di grandi dimensioni o 
                       per la trasmissione di dati in rete.

    -> vedere file exampleCoreModules.js
*/