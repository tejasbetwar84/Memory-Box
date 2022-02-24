
const { localsName } = require("ejs");
const Friends = require("../models/friendship");
const User = require("../models/user");

module.exports.friends= async function(req,res){
  
 let user=await User.findById(req.user._id);

   let friends;
    
    let ExistingFriend=await Friends.findOne({
        from_user : req.user._id,
        to_user : req.params.id,
    });

    if(!ExistingFriend){
        friends=await Friends.create({
            from_user : req.user._id,
            to_user : req.params.id,
        });
        user.Friends.push(friends);
    user.save();

    req.flash('success','Friend added in your friendlist');
    return res.redirect('back');
    }
    
    req.flash('success','Already friends');
return res.redirect('back');
};
