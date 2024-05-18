const User = require ('./../models/user-model')
const bcrypt = require("bcryptjs")





const  home = async(req,res)=>{
try {
    res.send("MERN Rounter is Activated Now Changing")
    
} catch (error) {
    console.log(error)
}
} 


const register = async(req,res)=>{
    try {
        const {username,email,phone,password} = req.body;
        const userExist = await User.findOne({email});
    if(userExist){

            return res.status(400).json({message:"Email is Already Exist"});
        }


        // const salt = await bcrypt.genSalt(10);
        // const hash_pass = await bcrypt.hash(password,salt);
        const response = await User.create({username, email, phone, password})
        res.status(201).json({msg:"Your Registraion Successful", token: await response.generateToken(),
            userId: response._id.toString()});
        
    } catch (error) {
        // res.status(500).send({msg:"Not Found"});
        next(error);
    }
}


const login = async (req,res) =>{
try {
    const {email,password}= req.body;
    const userExist = await User.findOne({email})
    if(!userExist){
      return  res.status(400).json({msg:"Invalid Credentials"})

    }

    // const passValid = await bcrypt.compare(password,userExist.password)
    const passValid = await userExist.comparePassword(password);


    if(passValid){
        res.status(201).json({msg:"You Login Successfully", token: await userExist.generateToken(),
            userId: userExist._id.toString()});
    }else{
        res.status(401).json({msg:"Invalid Email or Password"})
    }
} catch (error) {
    res.status(500).json('Something is worng or Internal Server Error')
}
}



const user = async(req,res)=>{
    try {
        const userData  = req.user;
        console.log(userData)
        return res.status(200).json({userData})
        // res.status(200).json({msg:'Hello Nazir U are te good boy men'})
    } catch (error) {
        console.log(`Error from ths user ${error}`)
    }

}
module.exports = {home, register , login, user};