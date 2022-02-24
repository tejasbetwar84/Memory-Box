const express=require('express');
const router = express.Router();
const homecontroller=require('../controllers/index');
const usercontroller=require('../controllers/user');

router.get('/',homecontroller.home);
router.use('/user',require('./user'));
router.use('/posts',require('./posts'));
router.use('/api',require('./api'));
router.use('/likes',require('./Likes'));
router.use('/users',require('./friends'))






module.exports=router;


