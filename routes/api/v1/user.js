const express=require('express');
const router=express.Router();

const userApi=require('../../../controllers/api/v1/user-api');

router.post('/create',userApi.create);

module.exports=router;