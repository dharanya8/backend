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
        id:{required:true,type:String,unique:true},
        name:{required:true,type:String,unique:false},
        email:{required:true,type:String,unique:false},
        phone:{required:true,type:String,unique:true}
    }
)
let mymod=new db.model("user",myschema)

app.get("/",async(req,res)=>{
   let data=await mymod.find();
   res.send(data);
});

app.post("/main",async(req,res)=>{
    let {id,name,email,phone} = req.body

    await mymod.create({id,name,email,phone})

    res.send({msg:"register succesfull"});
});

app.post("/update", async(req,res)=>{

 let {id,name,email,phone} = req.body;

 let data = await mymod.findByIdAndUpdate(
   {id:id},
   {$set:{name:name,email:email,phone:phone}}
 );
 res.json(data);

});

app.get("/delete",async(req,res)=>{
    let id=req.params.id;
    await mymod.findByIdAndDelete(id);
    res.json(data);
})

app.get("/search",async(req,res)=>{
    let  name=req.query.name;
    let data=await mymod.find({name:name});
    res.json(data);
})

app.get("/sort",async(req,res)=>{
    let field=req.query.field;
    let data=await mymod.find().sort({[field]:1});
    res.json(data);
})
app.listen(6000,()=>{
console.log("Server running on port 6000");
});