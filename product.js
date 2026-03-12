const fs = require('fs');
const http = require('http');
const server = http.createServer((req, res) => {
    if (req.url === '/product') {
        fs.readFile('product.json', 'utf-8', (err, data) => {
            if (err) {
                res.write('reading product file');
            } else {
                res.write(data);
            }
            res.end();
        });
    }
    else if (req.url === '/create'){
        fs.readFile('product.json','utf-8',(err, data) => {
            let products = JSON.parse(data);

            const newProduct = {
                id:products.length + 1,
                name: 'samsung',
                price:50000
            };         
            products.push(newProduct);
            fs.writeFile('product.json', JSON.stringify(products,null,2), (err) => { 
             res.write(JSON.stringify(products,null,2));
            res.end();
        });

    });
}
else if (req.url === '/update'){
        fs.readFile('product.json','utf-8',(err, data) => {
            let products = JSON.parse(data);

            products = products.map(product => {
                if (product.id === 1) {
                   product.name='redmi';
                   product.price=11000;
                }
                return product;
            });
            fs.writeFile('product.json', JSON.stringify(products,null,2), (err) => { 
             res.write(JSON.stringify(products,null,2));
            res.end();
        });

    });
}
else if (req.url === '/delete'){
        fs.readFile('product.json','utf-8',(err, data) => {
            let products = JSON.parse(data);

            products = products.filter(product => product.id !== 6);
            fs.writeFile('product.json', JSON.stringify(products,null,2), (err) => { 
             res.write(JSON.stringify(products,null,2));
            res.end();
        });

    });
}
else if (req.url === '/search'){
        fs.readFile('product.json','utf-8',(err, data) => {
            let products = JSON.parse(data);
            const searchProduct = products.filter(product => product.name === 'vivo');
            res.write(JSON.stringify(searchProduct,null,2));
            res.end();
        });
}
else if (req.url === '/sort'){
        fs.readFile('product.json','utf-8',(err, data) => {
            let products = JSON.parse(data);
            products.sort((a,b) => a.name.localeCompare(b.name));
            res.write(JSON.stringify(products,null,2));
            res.end();
        });
}
else{
    res.write('welcome to product page');
    res.end();
}
    
});

server.listen(5000, () => {
    console.log('Server running on port 5000');
});