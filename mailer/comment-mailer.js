const nodemailer=require('../configs/nodemailer');



exports.NewComment =(comment)=>{
   
    let htmlString =nodemailer.renderTemplate({comment : comment},'/comments/new-comment.ejs');

    nodemailer.transporter.sendMail({
        from:'tejasbetwar84@gmail.com',
        to:comment.User.email,
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

