const User=require('../models/user');
const fs=require('fs');
const path=require('path');
const commentMailer=require('../mailer/comment-mailer');
const forgotpassword=require('../mailer/forgotpassword-mailer');
const flash=require('connect-flash');

module.exports.editpassword=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('edit-password',{
            title : "edit info",
            user : user ,
        })
    })
}

module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    
    return res.render('sign-up',{
        title : 'sign-up',
    })
};

module.exports.signIn=function(req,res){
       

        
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    req.flash('success','Sign-in Successfully!')
    return res.render('sign-in',{
        title :'sign-in',
    })


};

module.exports.profile= async function(req,res){
    try{
    let user=await User.findById(req.params.id);
    
    

        return res.render('profile',{
            title : 'profile',
            profile_user : user,
        })
        
    
}catch(error){
  console.log('error!');
}
};

module.exports.setpassword= async function(req,res){
   let user=await User.findOne({email : req.body.email});

   forgotpassword.NewPassword(user);
   req.flash('success','password reset mail sent on you registered email');
   res.redirect('back');
}

module.exports.update=async function(req,res){
    if(req.user.id==req.params.id){
    try{
       let user=await User.findById(req.params.id);
       User.uploadedAvatar(req,res,function(err){
        if(err){
            console.log('multerError',err);

        } 
        // console.log(req.file);
        // console.log(req.body); 

        user.name=req.body.name;
        user.email=req.body.email;

        if(req.file){
          
            if(user.avatar){
                
                fs.unlinkSync(path.join(__dirname,'..',user.avatar));
            }
            user.avatar=User.avatarpath+'/'+req.file.filename;
        }
       
        user.save();
        return res.redirect('back');
    })
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
    }else{
        req.flash('error','Unauthorised');
        return res.status(401).send('unauthorised');

    }
    
};
module.exports.signout=function(req,res){
    req.logout();
    req.flash('success','Logged out Succesfully !')
    return res.redirect('/');
}

module.exports.createSession=function(req,res){
    req.flash('success','Logged in Successfully !')
    
    return res.redirect('/');
}
    



module.exports.create=function(req,res){
     if(req.body.password!=req.body.confirm_password){
         req.flash('error','password didnt match')
         return res.redirect('back');
     }
     
     User.findOne({email : req.body.email},function(err,user){
         if(err){
             console.log('Error');
         }
         if(!user){
             User.create(req.body,function(err,user){
                 if (err) console.log('error');
                req.flash('success','User created successfully!')
                 return res.redirect('/');
             })
         }else{
             req.flash('error','User already exist!')
            return res.redirect('back');

         }
     })
}