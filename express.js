const express = require("express");
const fs = require("fs");
const app = express();
let db = require("mongoose");
app.use(express.json());

db.connect("mongodb://localhost:27017/demo")
.then(() => {console.log("db connect")})
.catch((e)=>{console.log("error"+e)})


let myschema=new db.Schema(
    {
        name:{required:true,type:String,unique:false},
        email:{required:true,type:String,unique:false},
        phone:{required:true,type:String,unique:true}
    }
)
let mymod=new db.model("user",myschema)

app.post("/main",async(req,res)=>{
    let {name,email,phone} = req.body

    await mymod.create({name,email,phone})

    res.send({msg:"register succesfull"});
});


app.get("/",(req,res)=>{

    let data = fs.readFileSync("product.json","utf-8");
    let products = JSON.parse(data);

    res.json(products);
});
app.post("/insert",(req,res)=>{

    let data = fs.readFileSync("product.json","utf-8");
    let products = JSON.parse(data);

    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };

    products.push(newProduct);

    fs.writeFileSync("product.json",JSON.stringify(products,null,2));

    res.json(newProduct);

});
app.post("/update",(req,res)=>{

    let data = fs.readFileSync("product.json","utf-8");
    let products = JSON.parse(data);

    let id = req.body.id;

    products = products.map(p=>{
        if(p.id == id){
            p.name = req.body.name;
            p.price = req.body.price;
        }
        return p;
    });

    fs.writeFileSync("product.json",JSON.stringify(products,null,2));

    res.json(products);

});
app.get("/delete",(req,res)=>{

    let data = fs.readFileSync("product.json","utf-8");
    let products = JSON.parse(data);

    let id = parseInt(req.query.id);

    products = products.filter(p=>p.id !== id);

    fs.writeFileSync("product.json",JSON.stringify(products,null,2));

    res.json(products);
});

app.get("/search",(req,res)=>{

    let data = fs.readFileSync("product.json","utf-8");
    let products = JSON.parse(data);

    let name = req.query.name;

    let result = products.filter(p => p.name === name);

    res.json(result);

});

app.get("/sort",(req,res)=>{

    let data = fs.readFileSync("product.json","utf-8");
    let products = JSON.parse(data);

    let field = req.query.field;

    if(field === "price"){
        products.sort((a,b)=>a.price - b.price);
    }
    else if(field === "name"){
        products.sort((a,b)=>a.name.localeCompare(b.name));
    }

    res.json(products);

});





app.listen(5000,()=>{
console.log("Server running on port 5000");
});