
const Comment=require('../models/comment');
const Post = require('../models/posts');
const flash = require('connect-flash/lib/flash');
const commentMailer=require('../mailer/comment-mailer');
// const commentEmailWorker=require('../workers/comment-email-workers');
// const queue=require('../configs/kue');
module.exports.createPosts=  function(req,res){
    
   Post.create({
        content : req.body.content,
        User : req.user._id,
    });
// converting into Json file
    // if(req.xhr){
    //     return res.status(200).json({
    //         data:{
    //             post: post,
    //         },
    //         message :"post created !"
            
    //   });
    
       req.flash('success','New post posted succesfully !')
        return res.redirect('back');

}
    


module.exports.comment= async function(req,res){

let post= await Post.findById(req.body.post);
    if(post){  
 let comment=  await Comment.create({
       content : req.body.comment,
       User : req.user._id,
       Post : req.body.post,

   });

       post.Comment.push(comment);
       post.save();
      let comment1=await comment.populate('User','name email');
      commentMailer.NewComment(comment1);
    // let job=queue.create('emails',comment1).save(function(err){
    //     if(err){
    //         console.log('error in creating queue');
    //     }
    //     console.log('job queued',job.id);
    // })
     req.flash('success','you commented on post');
       return res.redirect('back');
   }




};

module.exports.destroy = async function(req,res){
 try{
     console.log('inspection')
   let post= await Post.findById(req.params.id)
    
     if(post.user!=req.user.id){

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

            req.flash('success','Post deleted successfully');

            return res.redirect('back');

        }else{
            req.flash('error','you camnnot delete');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}
                
module.exports.forgotpassword=function(req,res){
    return res.render('asking-email',{
        title : "Enter email",
    })
}     