const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.url === '/read') {
        fs.readFile('data.txt', 'utf-8', (err, data) => {
            if (err) {
                res.write(' reading  file');
            } else {
                res.write(data);
            }
           res.end();
        });
    } 
    else {
        res.write('welcome filesystem');
        res.end();
    }
    
});

server.listen(4000, () => {
    console.log('Server running on port 4000');
});