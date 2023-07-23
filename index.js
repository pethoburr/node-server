const http = require('http');
const fs = require('fs');
const path = require('path');
const { hostname } = require('os');

const port = 8080;

const server = http.createServer((req, res) => {
    let filepath;
    switch (req.url) {
        case '/':
            filepath = path.join(__dirname, 'index.html');
            break;
        case '/about':
            filepath = path.join(__dirname, 'about.html');
            break;
        case '/contact-me':
            filepath = path.join(__dirname, 'contact-me.html');
            break;
        default: 
            filepath = path.join(__dirname, '404.html');
    }

    fs.readFile(filepath, (err, data) => {
        if (err) {
            if(err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html'});
                res.end('<h1>404 Not Found</h1>');
            }
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    })
})

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}`);
})