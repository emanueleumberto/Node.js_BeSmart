console.log("Web Server Node.js");

// Web Server con modulo http di Node.js
const http = require('http');
const url = require('url')

/////////////////////////////////////////////////////////////////////////////////
// Creazione del server
// const server = http.createServer((req, res) => {
//     // Impostazione dell'intestazione della risposta
//     res.writeHead(200, { 'Content-Type': 'text/plain' });   
//     res.end("Benvenuto nel server Node.js");
// });
/////////////////////////////////////////////////////////////////////////////////
// const server = http.createServer((req, res) => {
//     const { method, url } = req;
//     // Log della richiesta ricevuta
//     console.log(`Richiesta ricevuta: ${method} ${url}`);
//     if(method === 'GET' && url === '/') {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end("<h1>Benvenuto nel server Node.js</h1>");
//     } else if(method === 'GET' && url === '/about') {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end("<h1>Pagina About</h1><p>Questa è la pagina about del server Node.js</p>");
//     } else {
//         res.writeHead(404, { 'Content-Type': 'text/html' });
//         res.end("<h1>404 Not Found</h1><p>La pagina richiesta non è stata trovata.</p>");
//     }   
// });
/////////////////////////////////////////////////////////////////////////////////
// const server = http.createServer((req, res) => {

//     // Log della richiesta ricevuta
//     console.log(`Richiesta ricevuta: ${req.method} ${req.url}`);

//     // Query Parameters under Node.js 10
//     // const parseUrl = url.parse(req.url, true)   
//     // console.log("Query Parameters:", parseUrl.query);

//     // Query Parameters under Node.js 10+
//     const parseUrl2 = new URL(req.url, `http://${req.headers.host}`)
//     console.log("Query Parameters:", parseUrl2.searchParams);
//     id = parseUrl2.searchParams.get('id')

//     header = req.headers;
//     console.log("Header:", header);
//     console.log("User-Agent:", header['user-agent']);
//     console.log("Http Version:", req.httpVersion);
//     console.log("Remote Address:", req.socket.remoteAddress);

// });
/////////////////////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////////////

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
//     if (routes[routeKey]) {
//         routes[routeKey](req, res);
//     } else {
//         res.writeHead(404, { 'Content-Type': 'text/html' });
//         res.end("<h1>404 Not Found</h1><p>La pagina richiesta non è stata trovata.</p>");
//     }
// });

// // Avvio del server sulla porta 3000
// server.listen(3000, () => {
//     console.log("Server in ascolto sulla porta 3000");
// });