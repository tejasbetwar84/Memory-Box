const mongoose=require('mongoose');
const PostSchema=new mongoose.Schema({
    content : {
        type:String,
        required:true,
    },
    User : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    Comment :[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    Like : [{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Like',
    }]
    

},{
    timestamps:true,
});

const Post=mongoose.model('Post',PostSchema);
module.exports=Post;