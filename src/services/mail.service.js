require('dotenv').config()
const nodemailer = require("nodemailer")
class MailService{
    transport;
    constructor(){
        try{
            this.transport = nodemailer.createTransport({
                host:process.env.SMTP_HOST,
                port : process.env.SMTP_PORT,
                auth :{
                    user :process.env.SMTP_USER,
                    pass :process.env.SMTP_PASSWORD
                }
            })

        }catch(exception){
            console.log(exception);
            throw new Error("Error connecting email service")
        }
    }
    
    sendEmail = async(to, subject, message, attachements=null) =>{
        try{
            const mailStatus = await this.transport.sendMail({
                to : to,
                from: process.env.SMTP_FROM,
                subject:subject,
                // text: 
                html : message,
                attachments : attachements
            })
            console.log(mailStatus)
            return mailStatus
        }catch(exception){
            console.log(exception)
            throw new Error("Error sending emails...")
        }
    }
}
const mailSvc = new MailService()
module.exports = mailSvc