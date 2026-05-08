/*
    Grazie alla sua architettura basata su eventi e alla natura asincrona, 
    Node.js è particolarmente adatto per costruire server scalabili, performanti e 
    in grado di gestire un numero elevato di connessioni simultanee.

    Un Web Server è un'applicazione che ascolta richiesta in ingresso, le elabora e invia risposte al client.
    In Node.js il modulo 'http' offre tutti gli strumenti necessari 
    per creare server web personalizzati senza dipendere da librerie esterne.

    A differenza di altri linguaggi di programmazione che richiedono server web esterni 
    come Apache o Nginix per gestire richieste HTTP, Node.js integra direttamente il server nell'applicazione.

    Il metodo 'createServer()' del modulo http core accetta una funzione di callback come argomenti, 
    che viene eseguita ogni volta che il server riceve una richiesta.
    L'oggetto request contiene dettagli importanti sulla richiesta HTTP, come il metodo della richiesta, 
    gli header e l'url richiesto. 
    E' possibile accedere a queste informazioni per personalizzare il comportamento del server.
*/

/*
    L'oggetto request, che rappresenta la richiesta HTTP inviata dal client, 
    fornisce numerose informazioni utili per personalizzare la logica del server.
    -> url      - contiene il persorso della richiesta, 
                  se l'URL contiene parametri nella query-string(Query Parameters) è possibile analizzarli
    -> method   - indica il metodo HTTP utilizzato (GET|POST|PUT|PATCH|DELETE)
    -> headers  - raccoglie tutti gli header HTTP della richiesta (Contenuto inviato, informazioni del client, token)
    -> httpVersion  - indica la versione del protocollo HTTP utilizzata
    -> soket    - fornisce informazioni a basso livello sulla connessione TCP (request.socket.remoteAddress)
    -> request.on('data')   - metodi usati per leggere il corpo della richiesta nei metodi POST o PUT, 
                              dove i dati sono inclusi nel payload
*/

/*
    L'oggetto 'response' offre metodi per configurare ogni aspetto della risposta HTTP.
    Questi metodi permettono di personalizzare completamente la risposta HTTP, rendendo l'oggetto response 
    un elemento centrale nella progettazione di API, pagine dinamiche e servizi RESTfull.

    -> writeHead(statusCode, headers)  - imposta il codice di stato e gli header della risposta
    -> statusCode   - può essere impostato per definire il codice di stato della risposta (statusCode = 400)
    -> setHeader(name, value)   - aggiunge o sovrascrive un header HTTP specifico
    -> getHeader(name)  - recupera il valore di un header precedentemente impostato
    -> hasHeader(name)  - verifica se un header è stato impostato
    -> removeHeader(name)   - rimuove un header precedentemente aggiunto
    -> write(data[,encoding]) - scrive una parte del corpo della risposta. Può essere chiamato più volte prima di end()  
    -> end(data[,encoding]) - chiude la risposta ed invia i dati rimanenti, Se usato con un argomento, 
                              scrive direttamente il corpo finale
    -> setTimeout(ms,callback) - imposta un timeout per la risposta. Se il tempo scade prima di end(), 
                                 viene invocato il callback
    -> flushHeaders()   - forza l'invio immediato degli header al client, anche se la risposta non è ancora terminata
*/

/* 
    Gestione delle rotte e middleware
    Le rotte definiscono i percorsi e i metodi HTTP che un server può gestire, mentre i middleware 
    sono funzioni che intervengono nel flusso di elaborazione diuna richiesta per aggiungere logica,
    modificare dati o eseguire controlli.

    Ogni rotta è associata ad una funzione di callback, che riceve come parametri l'oggetto request e 
    l'oggetto response, e che definisce la logica da eseguire per quel particolare tipo di richiesta.
    Quando si utilizza il modulo 'http' nativo, la gestione delle route avviene manualmente,
    attraverso il controllo dei valori request.url e request.method.
    Questa tecnica è fondamentale per comprendere il funzionamento interno del server HTTP 
    ma presenta dei limiti evidenti in termini di scalabilità e leggibilità del codice.
    
    Potremmo raffinare questa strategia costruendo un sistema di routing personalizzato, tuttavia, 
    per progetti più complessi, con URL con paramentri dinamici o Query-string è opportuno utilizzare 
    framework come Express.js
*/
