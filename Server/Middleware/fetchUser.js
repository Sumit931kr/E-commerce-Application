// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';

const fetchUser = (req,res,next) =>{
    //  GET the user from the jwt token and add id to req Object
    const token = req.header('auth-token');
    if(!token){
        res.sendStatus(401).json({error : "Please authenticate using a valid Token "})
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user
        next();
        
    } catch (error) {
        res.sendStatus(401).json({error : "Please authenticate using a valid Token "})
    }


}

export default fetchUser;