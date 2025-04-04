import authservice from "../authentication/authservice.js";
import  Router  from 'express';
const router  = Router();
const {registerAdmin} = authservice;

router.post("/signup",async (req,res)=>
{
    const { username,password,role} =req.body;

 try{
     const maintainer = await registerAdmin(username,password,role);
     //remove the admin word if the role work
     const  maintainer_role = maintainer.role;
     return res.status(201).json({msg: ` ${maintainer_role} created successfully`,maintainerId: maintainer.insertId})   
    } catch(error){
        console.error(error);
        return res.status(500).json({error:"something went wrong"})
        
    }
    
})

export default router;

