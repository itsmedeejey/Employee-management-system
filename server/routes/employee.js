import  Router  from 'express';
import { getAllEmp,getEmp,putEmp } from '../db.js';

const router  = Router();

router.get("/employees",async (req,res)=>{
    const data = await getAllEmp()
    res.json({
       data 
    })
})
router.get("/employee/:id",async (req,res)=>{
    const id =  req.params.id;
    const data = await getEmp(id)
    res.json({
        data
    })  
})

export default router;