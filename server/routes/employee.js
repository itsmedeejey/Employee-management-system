import  Router  from 'express';
import { getAllEmp,getEmp,putEmp } from '../db.js';

const router  = Router();

router.get("/employees",async (req,res)=>{
    const rows = await getAllEmp()
    res.json({
        rows
    })
})
router.get("/employee/:id",async (req,res)=>{
    const id =  req.params.id;
    const rows = await getEmp(id)
    res.json({
        rows
    })  
})

export default router;