const Joi = require('joi')
// const { response } = require('../../config/routing.config')
//ruleset
const registerDTO = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password : Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/).required(),
    confirmPassword : Joi.string().valid(Joi.ref('password')).required(),
    role :Joi.string().pattern(/^(seller|customer)$/)
 
    //regular expression
    //[0-9a-zA-Z] the below can be also written
    //[\d\w]      
})
// const response = await rule.validateAsync(payload)
//name, email, password , role, image(skip)

const loginDTO = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
})

module.exports = {registerDTO,loginDTO}