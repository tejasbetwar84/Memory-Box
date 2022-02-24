console.log('jdnkn');
{
 let createpost=function(){
     let newpostform=$('#new-post-form');
     newpostform.submit(function(e){
         e.preventDefault();

         $.ajax({
             type :'post',
             url :'/posts/create-post',
             data : newpostform.serialize(),
             success : function(data){
                 let newpost=newpostDOM(data.data.post);
                 $('#previous-posts-container>ul').prepend(newpost);
                 deletepost($(' .delete-post-button',newpost));
             },error :function(err) {
                console.log(error,responseText)
             }
         })
     })
 }





// method to create post in DOM

let newpostDOM = function(post){
    return $(`<li id="post-${post._id}">
    <div class="posts-comment">
       
        <a class="delete-post-button" href="/posts/destroy/${post._id}">✖</a>
       
       <p>Content :${post.content } </p>
       <p>User name :${post.User.name} </p>
    
      
            
       <form action="/posts/comment" id="post-comment" method="post"  >
           <textarea name="comment" cols="10" row="2" placeholder="enter"></textarea>
           <input type="hidden" name="post" value="<%= ${post._id}%>" >
           <input type="submit" value="Comment">
    
       </form>
      
       
    </div>
    
    </li>`)
}
//methods to delete the post

let deletepost =function(deletelink){
    $(deletelink).click(function(e){
     e.preventDefault();
       $.ajax({
           type:'get',
           url :  $(deletelink).prop('href'),
           success:function(data){
            $(`#post-${data.data.post_id}`).remove();
           },error:function(error){
            console.log(error.responseText)
           }
       })
    })
}

createpost();

}
