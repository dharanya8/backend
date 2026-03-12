const fs = require('fs');

fs.writeFile('data.txt', 'Hello, this is data file.', (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('File written successfully');
    }
});
fs.readFile('data.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
});
fs.appendFile('data.txt', '\nThis is appended data.', (err) => {
    if (err) {
        console.error(err);    } else {
        console.log('Data appended successfully');
    }
});