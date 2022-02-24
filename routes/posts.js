const express=require('express');
const router=express.Router();
const passport=require('../configs/passport');

const postcontroller=require('../controllers/post-controller');

router.post('/create-post',passport.checkAuthentication,postcontroller.createPosts);

router.post('/comment',passport.checkAuthentication,postcontroller.comment);

router.get('/forgotpassword',postcontroller.forgotpassword);

router.get('/destroy/:id',passport.checkAuthentication,postcontroller.destroy);

module.exports=router;