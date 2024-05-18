const validate =  (schema)=> async(req,res,next) =>{
try {
    const parsBody = await schema.parseAsync(req.body);
    req.body = parsBody
    next();
} catch (err) {
    const status = 422;
    
    const message = "Fill the input Properly";
    const extraDetails = err.errors[0].message;
        
    // res.status(400).json({msg:message})
    const error ={
        status,
        message,
        extraDetails,
        
    }
    console.log(error)
    next(error);
}
} 

module.exports = validate;