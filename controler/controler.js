const {db}=require('../helper/connection');
const bcrypt=require('../helper/hash');
const auth=require('../helper/jwt');

exports.Register=async(req,res)=>{
    let name=req.body.userName;
    let email=req.body.email;
    let pass=req.body.pass;

    if(name.length<1||email.length<1||pass.length<1){
        console.log("Your name,email and password is required");
        return false;
        //res.status(404).send("Your name,email and password is required");
    }

    const hasedpass=await bcrypt.hashGenerator(pass);

    db.query("insert into users set ?",{
        userName:name,
        email:email,
        password:hasedpass
    },(error,result)=>{
        if(error){
            res.status(401).send("your name or email is already exist");
        }else{
            res.status(200).send("Registered successfully");
        }
    })
    const token=auth.token(email);
    
    console.log(token);
}

exports.Login=(req,res)=>{
    const email=req.body.email;
    const pass=req.body.pass;
    db.query("select password from users where email=?",[email],(error,password)=>{
        if(password.length<1){
            res.status(404).send("your account is not exist");
        }else{
            const hasedPass=password[0].password;
            bcrypt.hashvalidator(pass,hasedPass).then((result)=>{
                if(result==true){
                    const token=auth.token(email);
                    res.status(200).json({token});
                }else{
                    res.status(404).send("your password is wrong");
                }
            }).catch((e)=>{
                console.log(e);
            });
        }
    })
}

exports.Profile=(req,res)=>{
    const email=req.user.id;
    db.query("select * from users where email=?",[email],(error,user)=>{
        if(user){
            res.status(200).send(user);
        }else{
            console.log("error in profile route "+error);
        }
    });
}