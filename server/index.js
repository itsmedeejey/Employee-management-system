import express from "express";
import { getAllEmp,getEmp,putEmp } from "./db.js";
const app = express();

app.get("/employees",async (req,res)=>{
    const rows = await getAllEmp()
    res.json({
        rows
    })
})
app.get("/employee/:id",async (req,res)=>{
    const id =  req.params.id;
    const rows = await getEmp(id)
    res.json({
        rows
    })  
})


const  port =3000;
app.listen(port,()=>{console.log(`server is running on ${port}`)});