const Posts=require('../models/posts');
const User = require('../models/user');


module.exports.home= async function(req,res){
  
    try{
   let post = await Posts.find({}).populate("User")
    .populate({
        path : "Comment",
        populate :{
            path: "User",
        }
    })
    

   let user= await User.find({}).populate({
       path : "Friends",
       populate :{
           path : "to_user"
       }
   })
   
    
     return res.render('home',{
         title : 'post',
         post : post,
         all_user: user

        })
    }catch(err){
         console.log('Error in fetching Data ;')
    }

}
     


        

//     Posts.find({}).populate('User').exec(function(err,post){

//         return res.render('home',{
//             title : 'Posts',
//             post : post
//         })
//     })
// }

    

 
