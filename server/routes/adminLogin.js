import authservice from "../authentication/authservice.js";
import  Router  from 'express';
const router  = Router();
const {loginAdmin} = authservice;

router.post("/login",async (req,res)=>
{
    const {username,password} =req.body;

 try{
     const maintainer = await loginAdmin(username,password);
     //remove the admin word if the role work
     console.log(maintainer);
            
     const token = maintainer.token;
     const  maintainer_role = maintainer.role;
     return res.status(201).json({msg: ` ${maintainer_role} login successfully`,token})   

     

    } catch(error){
        console.error(error);
        return res.status(500).json({error:"something went wrong"})
        
    }
    
})

export default router;

