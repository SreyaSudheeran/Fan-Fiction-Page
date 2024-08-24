const jwt = require('jsonwebtoken');

const fetchUser =(req,res,next) =>{
    //Get the user from the jwt token and append and add id to req object
    try{
    const token = req.header('authtoken');
    if(!token){
        res.status(401).send({error:"Please autheticate the user"});
    }
    const data = jwt.verify(token,'shhhhh');
    req.user = data.user;
    next();
    }catch(err){
        console.log(err);
        res.status(500).send("internal error");
    }
}
module.exports=fetchUser;
