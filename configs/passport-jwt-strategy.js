const passport=require('passport');
const jwtstrategy=require('passport-jwt').Strategy;
const Extractjwt=require('passport-jwt').ExtractJwt;
const User=require('../models/user');
const Env=require('./enviroment');

let opts = {
   jwtFromRequest : Extractjwt.fromAuthHeaderAsBearerToken(),
   secretOrKey : Env.jwt_secret,

}


passport.use(new jwtstrategy(opts,function(jwtpayload,done){
    User.findById(jwtpayload._id,function(err,user){
        if(err){
            console.log('Error in jwt fetchinng !');
            return;
        }
        if(user){
            return done(null,user);
        }else{
            return done(null.false);
        }

    })
}));

module.exports=passport;
