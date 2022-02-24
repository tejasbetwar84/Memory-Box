const nodemailer= require('nodemailer');
const ejs = require('ejs');
const path=require('path');
const Env=require('./enviroment');



let transporter=nodemailer.createTransport(Env.mailservice)


let renderTemplate =(data,relativepath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativepath),
        data,
        function(err,template){
            if(err){
                console.log('error in rendering templates');
                return;
            }
            mailHTML=template;
        }
    )

    return mailHTML;


}

module.exports={
   transporter :transporter,
   renderTemplate : renderTemplate,
}
