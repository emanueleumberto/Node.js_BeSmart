// Web Server con modulo http di Node.js
const http = require('http');
// const url = require('url')

// Creazione del server
// const server = http.createServer((req, res) => {
//     // Log della richiesta ricevuta
//     console.log(`Richiesta ricevuta: ${req.method} ${req.url}`);
//     // Impostazione dell'intestazione della risposta
//     res.writeHead(200, { 'Content-Type': 'text/plain' });   
//     res.end("Benvenuto nel server Node.js");
// });

// const server = http.createServer((req, res) => {
//     // Log della richiesta ricevuta
//     console.log(`Richiesta ricevuta: ${req.method} ${req.url}`);
//     if(req.method === 'GET' && req.url === '/') {
//             res.writeHead(200, { 'Content-Type': 'text/html' });
//             res.end("<h1>Benvenuto nel server Node.js</h1>");
//         } else if(req.method === 'GET' && req.url === '/about') {
//             res.writeHead(200, { 'Content-Type': 'text/html' });
//             res.end("<h1>Pagina About</h1><p>Questa è la pagina about del server Node.js</p>");
//         } else {
//             res.writeHead(404, { 'Content-Type': 'text/html' });
//             res.end("<h1>404 Not Found</h1><p>La pagina richiesta non è stata trovata.</p>");
//         }  
// });


// const server = http.createServer((req, res) => {
//     console.log(`Richiesta ricevuta: ${req.url}`);
    
//     // Query Parameters under Node.js 10
//     // const parseUrl = url.parse(req.url, true)   
//     // console.log("Query Parameters:", parseUrl.query);

//     // Query Parameters under Node.js 10+
//     const parseUrl = new URL(req.url, `http://${req.headers.host}`)
//     console.log("Query Parameters:", parseUrl.searchParams);
//     id = parseUrl.searchParams.get('id')

//     header = req.headers;
//     console.log("Header:", header);
//     console.log("User-Agent:", header['user-agent']);
//     console.log("Http Version:", req.httpVersion);
//     console.log("Remote Address:", req.socket.remoteAddress);

//     res.end("Benvenuto nel server Node.js");
// });

// const server = http.createServer((req, res) => {
//     // Log della richiesta ricevuta
//     console.log(`Richiesta ricevuta: ${req.method} ${req.url}`);     
    
//     // Payload di una richiesta di tipo POST, PUT o PATCH
//     if (req.url === '/users' && 
//         req.method === 'POST' || 
//         req.method === 'PUT' || 
//         req.method === 'PATCH') {

//         let body = '';
//         req.on('data', chunk => {
//             body += chunk.toString();
//         });
//         req.on('end', () => {
//             console.log("Payload:", body);
//             try {
//                 const data = JSON.parse(body);
//                 console.log("Dati JSON:", data);
//                 res.writeHead(200, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ message: "Dati ricevuti con successo", receivedData: data }));
//             } catch (error) {
//                 console.error("Errore nella lettura del payload:", error);
//                 res.writeHead(400, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ message: "Errore nella lettura del payload", error: error.message }));
//             }
//         });
//     }
// });


// const routes = { 
//     'GET - /': (req, res) => {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end("<h1>Benvenuto nel server Node.js</h1>");
//     },
//     'POST - /users': (req, res) => {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end("<h1>Dati ricevuti con successo</h1>");
//     }
// };

// const server = http.createServer((req, res) => {
//     const routeKey = `${req.method} - ${req.url}`;
//     const routeHandler = routes[routeKey];

//     if (routeHandler) {
//         routeHandler(req, res);
//     } else {
//         res.writeHead(404, { 'Content-Type': 'text/html' });
//         res.end("<h1>404 Not Found</h1><p>La pagina richiesta non è stata trovata.</p>");
//     }
// });


// Middleware per logging
const loggerMiddleware = (req, res, next) => {
    console.log(`Richiesta ricevuta da middleware: ${req.method} ${req.url}`);
    next();
};

const server = http.createServer((req, res) => {
    loggerMiddleware(req, res, () => {
        if (req.method === 'GET' && req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end("<h1>Benvenuto nel server Node.js</h1>");
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end("<h1>404 Not Found</h1><p>La pagina richiesta non è stata trovata.</p>");
        }
    });
});

server.listen(3000, () => {
    console.log("Server in ascolto sulla porta 3000");
});


//Problema di questo approccio
//Funziona solo per un middleware.
//Con più middleware:

// logger(req, res, () => {
//     auth(req, res, () => {
//         cors(req, res, () => {
//             res.end("OK");
//         });
//     });
// });