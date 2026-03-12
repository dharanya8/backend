let backend = require ('http');

let app = backend.createServer((req,res) => {
    if (req.url == "/") {
        res.write("Hello, World!")
        res.end()
    }
    else if(req.url == "/about"){
        res.write("this is the About page")
        res.end()
    }
    else{
        res.write("error")
        res.end();
    }
})
 
app.listen(3000, () => {console.log("server running on port 3000")});