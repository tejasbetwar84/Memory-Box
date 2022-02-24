const express=require('express');
const Router=express.Router();

const LIkecontroller = require('../controllers/like-controller');

Router.post('/toggle',LIkecontroller.Togglelike)




module.exports=Router;