const { application } = require('express');
const express=require('express');
const router=express.Router();
const passport=require('passport');



const postapicontroller=require('../../../controllers/api/v1/post-api');

router.get('/',postapicontroller.index);


router.delete('/:id',passport.authenticate('jwt',{session:false}),postapicontroller.destroy);

module.exports=router;