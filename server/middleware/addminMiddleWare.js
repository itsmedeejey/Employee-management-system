import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY;

const adminMiddleWare =  (req,res,next)=>{
    const token =  req.headers.authorization?.split(' ')[1];

    if (!token){
        return res.status(403).json({error:"access denied"})
    }
    
    try {
        const decoded =  jwt.verify(token, SECRET_KEY);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Admins only!' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

export default adminMiddleWare;