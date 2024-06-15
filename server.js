const express=require('express');
const app=express();
const env=require('dotenv');
const router=require('./routes/router');
const {db}=require('./helper/connection');

db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("mysql connection success");
    }
})
app.use(express.urlencoded({extended:true}));
env.config();
app.use(router);

app.listen(8000,()=>console.log(`app is runing in ${process.env.PORT} PORT`));