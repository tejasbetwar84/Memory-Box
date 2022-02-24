
const express=require('express');
const passport = require('passport');
const router=express.Router();
const usercontroller=require('../controllers/user');
const localpassport=require('../configs/passport');

router.get('/sign-up',usercontroller.signUp);

router.get('/sign-in',usercontroller.signIn);



router.post('/create-session',passport.authenticate(
    'local',
    
    

    
    {failureRedirect:"/user/sign-in"},
),usercontroller.createSession);


router.post('/create',usercontroller.create);
router.post('/setpassword',usercontroller.setpassword);
router.get('/edit-password/:id',usercontroller.editpassword);
router.get('/profile/:id',localpassport.checkAuthentication,usercontroller.profile);
router.post('/update/:id',localpassport.checkAuthentication,usercontroller.update);

router.get('/sign-out',usercontroller.signout);

router.get('/auth/google',passport.authenticate('google',{scope :['profile','email']}));

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect :'/users/sign-in'}),usercontroller.createSession);





module.exports=router;





