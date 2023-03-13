const http = require('http');

const hostname = '127.0.0.1';
const port = '3000';

function logRequest(method, url, headers, body) {
    console.log(`received request;\n method: ${method}\n url: ${url}\n headers: ${JSON.stringify(headers)}\n body: ${body}\n`);
}

function count(text, separator) {
    const words = text.split(separator);
    return words.length;
}

const server = http.createServer((req,res) => {

    // getting body
    let body = [];
    req.on('error', (err) => {
        // This prints the error message and stack trace to `stderr`.
        console.error(err.stack);
        })
        .on('data',(chunk) => {
        body.push(chunk);
        })
        .on('end',() => {
        body = Buffer.concat(body).toString();
        // log the details of the incoming request
        logRequest(req.method,req.url,req.headers,body);

    // Routing request
    if(req.method === 'POST') {
        if(!body) {
            res.statusCode = 400;
            res.setHeader('Content-type', 'text/plain');
            res.end('Body cannot be empty');
        }
        else if(req.headers["content-type"] !== 'text/plain') {
            res.statusCode = 400;
            res.setHeader('Content-type', 'text/plain');
            res.end('content-type must be text/plain');
        }
        else {
            if(req.url === '/words') {
                res.statusCode = 200;
                res.setHeader('Content-type', 'text/plain');
                res.end(`your text contains ${count(body, " ")} words`);
            }
            else if(req.url === '/lines') {
                res.statusCode = 200;
                res.setHeader('Content-type', 'text/plain');
                res.end(`your text contains ${count(body, "\n")} lines`);
            }
            else if(req.url === '/characters') {
                res.statusCode = 200;
                res.setHeader('Content-type', 'text/plain');
                res.end(`your text contains ${count(body, "")} characters`);
            }
            else {
                res.statusCode = 404;
                res.setHeader('Content-type', 'text/plain');
                res.end(`Content not found`);
            }
        }
    }
    else {
        res.statusCode = 405;
        res.setHeader('Content-type', 'text/plain');
        res.end('method not allowed');
    }


    res.on('error', (err) => {
        console.log(err);
    });
    });

});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
