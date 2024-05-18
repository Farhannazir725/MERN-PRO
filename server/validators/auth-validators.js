const {z} = require('zod');

const loginSchema = z.object({
    email : z
    .string({required_error:"Email  is Required"}).trim().email({message:"Invalid Email Address"}).min(3,{message:"Email Must Be 3 Characters"}).max(50,{message:"Email Must  Not Be More than 50 Characters"}),
    password : z
    .string({required_error:"Phone Number   is Required"}).trim().min(8,{message:"Password Must Be 8 Characters"}).max(20,{message:"Password not be must 20 Characters"}),
})

//  crating object schema
const signUpSchema = loginSchema.extend({
    username : z
    .string({required_error:"Name  is Required"}).trim().min(3,{message:"Name Must Be 3 Characters"}).max(20,{message:"Name Must  Not Be More than 20 Characters"}),
  
    phone : z
    .string({required_error:"Phone Number   is Required"}).trim().min(10,{message:"Phone Number Must Be 10 Characters"}).max(14,{message:"Phone Number is must be 14 Characters"}),
 

})

module.exports = {signUpSchema,loginSchema};
