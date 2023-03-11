const http = require('http');
const { buffer } = require('stream/consumers');

const hostname = '127.0.0.1';
const port = '3000';

function logRequest(method, url, headers, body) {
    console.log(`received request;\n method: ${method}\n url: ${url}\n headers: ${JSON.stringify(headers)}\n body: ${body}`);
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
        // log the details of the incoming request
        logRequest(req.method,req.url,req.headers,body);
    });


    // Routing request
    if(req.method === 'POST' && req.url === '/wordcount') {
        if(body && req.headers["content-type"] === 'text/plain') {
            res.statusCode = 200;
            res.setHeader('Content-type', 'text/plain');
            res.end(`your text contains xx words`);
        }
        else {
            res.statusCode = 400;
            res.setHeader('Content-type', 'text/plain');
            res.end('Body cannot be empty');
        }
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-type', 'text/plain');
        res.end('Content not found');
    }



    res.on('error', (err) => {
        console.log(err);
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
