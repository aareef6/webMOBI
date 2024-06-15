const jwt=require('jsonwebtoken');

exports.token=(email)=>{
    const token=jwt.sign(
        {
            id:email
        },
        process.env.JWTPASS
    )
    return token;
}

exports.authToken=(req,res,next)=>{
    const token=req.headers['token'];
    //const token=header.split(' ')[1];

    if(!token)return res.status(401).send("token is not available");

    jwt.verify(token,process.env.JWTPASS,(err,user)=>{
        if(err)return res.status(404).send("token is not valid");

        req.user=user;
        console.log(req.user);
        next();
    })
}
