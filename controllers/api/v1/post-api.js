const Posts=require('../../../models/posts');
const Comment=require('../../../models/comment');
module.exports.index= async function(req,res){

    let post = await Posts.find({}).populate("User")
    .populate({
        path : "Comment",
        populate :{
            path: "User"
        }
    })

    return res.json(200,{
        message : "list of posts",
        posts: post,


    });
}

module.exports.destroy = async function(req,res){
    try{
       
      let post= await Posts.findById(req.params.id)

      if(post.User==req.user.id){
       
             post.remove();
   
               await Comment.deleteMany({post :req.params.id});
   
               // if(req.xhr){
               //     return res.status(200).json({
   
                       
               //         data:{
               //             post_id : req.params.id
               //         },
               //         message: "post deleted successfully"
               //     });
               // }
   
            //    req.flash('success','Post deleted successfully');
   
               return res.json(200,{
                   message : 'Post and associated comments deleted successfully'
               })
            }
   
         
       }catch(err){
           
           return res.json(404,{
               message : 'Something went wrong'
           })
       }
       
       
   }
                   
            