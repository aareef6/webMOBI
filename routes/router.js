const router=require('express').Router();
const controler=require('../controler/controler');
const tokenValidate=require('../helper/jwt');

router.post('/register',controler.Register);

router.post('/login',controler.Login);

router.get('/profile',tokenValidate.authToken,controler.Profile);

module.exports=router;