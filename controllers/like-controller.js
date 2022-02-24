const Like=require('../models/likes');
const Post=require('../models/posts');
const Comment=require('../models/comment');

module.exports.Togglelike=async function (req,res){
    try{
        let Likeable;
        let deleted = false ;
      if(req.query.type=='Post'){
         Likeable= await Post.findById(req.query.id).populate('Like');
      }else {
          Likeable= await Comment.findById(req.query.id).populate('Like');
      }

     

      let ExistingLike=await Like.findOne({
          Likeable : req.query.id,
          onModel : req.query.type,
          User : req.user._id,
      })
      console.log(ExistingLike);

      // if like already exists or not
 
      if(ExistingLike){
          Likeable.Like.pull(ExistingLike._id);
          Likeable.save();
          ExistingLike.remove();
          deleted=true;
      }
      else {
          let NewLike=await Like.create({
              User : req.user._id,
            Likeable: req.query.id,
        onModel : req.query.type,
         });

         Likeable.Like.push(NewLike._id);
         
         Likeable.save();
      }
    //   console.log(Likeable);
      

      return res.json(200,{
          message : "Request successfull",
          Data : {
              deleted: deleted,
          }
      })

    

    }catch(err){
        return res.json(404,{
            message : 'Something went wrong ',
        })
    }
}
