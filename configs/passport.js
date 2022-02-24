const flash = require('connect-flash/lib/flash');
const passport = require('passport');

const User= require('../models/user');
const Localstrategy= require('passport-local').Strategy;

passport.use(new Localstrategy({
    usernameField:'email',
    passReqToCallback:true,
},
    
    function(req,email,password,done){
        User.findOne({email:email},function(err,user){
           req.flash('error','User not found !');

            if(!user || user.password!=password){
                return done(null,false);
            }

            return done(null,user);
        })
    }
));
passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
       

        done(null,user);
    })
});

passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
};

passport.SetAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;