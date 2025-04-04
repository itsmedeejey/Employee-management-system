import { addDept } from "../db.js";
import adminMiddleWare from "../middleware/addminMiddleWare.js";
import Router  from "express";

const router = Router();

router.post("/",  adminMiddleWare  ,async (req,res)=>{
    const dept = req.body;
    console.log(dept)
    try{
        await addDept(dept.dept_number,dept.dept_name,dept.manager_number);
        res.status(201).json({msg:"department created successfully"})
    }catch(error){
        console.log(error);
        return res.status(401).json({msg:"something went wrong ",})
    }

})
export default router;