const mongoose=require('mongoose');
const commentSchema= new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    User : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    Post : {
      type : mongoose.Schema.Types.ObjectId,
      ref:'Post'
    },
    Like : [{
        type : mongoose.Schema.Types.ObjectId,
        ref :'Like'
    }]
},{
    timestamps : true
});
 const Comment = mongoose.model('Comment',commentSchema);
 module.exports=Comment;