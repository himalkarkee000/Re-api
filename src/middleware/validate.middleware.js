const bodyValidation =(schema)=>{
    return async(req ,res,next) =>{
        try{
            const data = req.body;
            await schema.validateAsync(data,{aboutEarly :false})
            next()
        }catch(exception){
            next(exception)
        }
    }
}

module.exports = {bodyValidation}