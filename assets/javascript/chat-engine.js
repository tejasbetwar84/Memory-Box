

const socket = io();
let name;
let textarea=document.querySelector("#textarea");
let messagearea=document.querySelector(".message__area");


   name="tejas";

textarea.addEventListener('keyup',function(e){
    if(e.key=="Enter"){
      return sendMessage(e.target.value);
    }
})

function sendMessage(message){
   let msg ={
       user : name,
       message:message.trim(),
   }

   appendMessage(msg,"outgoing");
   textarea.value=" ";

   //sent to server
   socket.emit('message',msg);
   
}


function appendMessage(msg,type){

   let maindiv=document.createElement('div');
   let classname=type;
   maindiv.classList.add(classname,"message");

   let markup = `
   <h4>${msg.user}</h4>
   <p>${msg.message}</p>
`
   
      maindiv.innerHTML=markup;
      messagearea.appendChild(maindiv)
      scrolltobottom();
   
}

//revceive 
socket.on('user__joined',(msg)=>{
   console.log(msg);
appendMessage(msg,'incoming')
scrolltobottom();
}
)

function scrolltobottom(){
   messagearea.scrollTop=messagearea.scrollHeight;
}




// class chatengine{
//     constructor(chatboxId,userEmail){
//         this.chatboxId=$(`#${chatboxId}`);
//         this.userEmail=userEmail;
//         this.socket = io.connect('http://localhost:5000');

        
//         this.connectHandler();
        
    
//     }
   
    
//     connectHandler(){
//         this.socket.on('connect',function(){
//             console.log('connection established using socket..');
//         })
//     }

// }
const up_down_btn=document.querySelector('#show_button');
up_down_btn.addEventListener('click',function(){
   document.querySelector('.chat__section').classList.toggle('hidden');
})