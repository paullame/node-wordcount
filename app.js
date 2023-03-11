const http = require('http');
const { buffer } = require('stream/consumers');

const hostname = '127.0.0.1';
const port = '3000';

function logRequest(req) {
    const reqMethod = req.method;
    const reqHeaders = JSON.stringify(req.headers);
    const reqURL = req.url;

    console.log(`received request;\n method: ${reqMethod}\n url: ${reqURL}\n headers: ${reqHeaders}`);
};

const server = http.createServer((req,res) => {

    // getting body
    let body = [];
    req.on('error', (err) => {
        // This prints the error message and stack trace to `stderr`.
        console.error(err.stack);
      }).on('data',(chunk) => {
        body.push(chunk);
    }).on('end',() => {
        body = Buffer.concat(body).toString();
    });

    logRequest(req); // log the details of the incoming request
    console.log(`body is: ${body}`);

    res.on('error', (err) => {
        console.log(err);
    });

    // setting response
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    res.end('Hello World!\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
