import  Router  from 'express';
import {pool} from '../db.js'
const router  = Router();

router.post("/signup",async (req,res)=>
{
    const { username,password,role} =req.body;

 try{

     const admin = await  pool.query(`insert into maintainer(username, password, role)
     values(?,?,?)`,[username , password,role]);

     return res.status(201).json({msg: "admin created successfully",adminId: admin.insertId})   
    } catch(error){
        console.error(error);
        return res.status(500).json({error:"something went wrong"})
        
    }
    
})

export default router;

