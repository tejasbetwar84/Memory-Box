const mongoose=require ('mongoose');
const likeSchema=new mongoose.Schema({
    User : {
        type:mongoose.Schema.ObjectId,
    },
    Likable : {
        type : mongoose.Schema.ObjectId,
        require :true,
        refpath : 'onModel',
    },
    onModel : {
        type : String,
        required: true,
        enum : ['Post','User'],
    }

},{
    timestamps : true
});

const Like=mongoose.model('Like',likeSchema);

module.exports=Like;
