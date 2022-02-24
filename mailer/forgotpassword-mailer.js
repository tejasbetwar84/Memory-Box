const nodemailer=require('../configs/nodemailer');

exports.NewPassword=(passpord)=>{
     
    let htmlString =nodemailer.renderTemplate({passpord : passpord},'/comments/set-password.ejs');
    
        nodemailer.transporter.sendMail({
            from:'tejasbetwar84@gmail.com',
            to:passpord.email,
            subject :'Memory Box : Do not reply to this mail !',
            html : htmlString,
        },(err,info)=>{
            if(err){
                console.log(err);
                console.log('error in sending mail!');
                
                return;
            }
            console.log('Mail sent ',info);
            return;
        }
        )
    }
    
