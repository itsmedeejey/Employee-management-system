import Router from 'express';
import adminMiddleWare from '../middleware/addminMiddleWare.js';
import { putEmp } from '../db.js';

const router = Router();

router.post("/", adminMiddleWare, async (req , res)=>{
    const emp_details = req.body;
    try{
        const result = await putEmp(emp_details.fname,emp_details.lname,emp_details.emp_no,emp_details.address, emp_details.salary,emp_details.dept_number )
       
        return res.status(201).json({msg:"employee added successfuly"})
        
    }catch(error){
     return res.status(401).json({msg:"something went wrong",error})   
    }
})
export default router;