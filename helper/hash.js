const bcrypt=require('bcrypt');
const salt=10;

exports.hashGenerator=async(plainPassword)=>{
    var genSalt=await bcrypt.genSalt(salt);
    var hashpassword=await bcrypt.hash(plainPassword,genSalt);
    return hashpassword;

}
exports.hashvalidator=async(plainpassword,hashpassword)=>{
    try{
        var result=await bcrypt.compare(plainpassword,hashpassword);
        if(result==true){
            return result
        }else{
            return result
        }
    }
    catch(e){
        return e;
    }
}