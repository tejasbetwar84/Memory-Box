const express=require('express');
const router=express.Router();
friendscontroller=require('../controllers/friendscontroller.js');

router.get('/friends/:id',friendscontroller.friends);

module.exports=router;