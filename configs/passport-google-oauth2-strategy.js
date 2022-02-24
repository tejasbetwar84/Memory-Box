const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');
const Env=require('./enviroment');

//tell passport to use a new strategy for google login

passport.use(new googleStrategy({
    clientID :Env.google_clientID,
    clientSecret:Env.google_clientSecret,
    callbackURL :Env.google_callbackURL,
},function(accessToken,refreshToken,profile,done){
  User.findOne({email : profile.emails[0].value}).exec(function(err,user){
      if(err){
          console.log('Error in google Authentication');
          return ;
      }
    //   console.log(profile);
    //   console.log(accessToken);
      if(user){
          return done(null,user);
      }

    

      else{
          //if user not found create the user and set it req.user
          User.create({
              name :profile.displayName,
              email : profile.emails[0].value,
              password : crypto.randomBytes(20).toString('hex'),
          } ,function(err,user){
              if(err){
                  console.log('Error **********');
              }
              return done(null,user);
          })
      }
  })
}
));

module.exports=passport;
