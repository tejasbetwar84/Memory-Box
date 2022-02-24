
const express=require('express');
const cookieParser = require('cookie-parser');

const app=express();
const port=8000;
const db=require('./configs/mongoose');
const Env=require('./configs/enviroment');
const User=require('./models/user');
const session=require('express-session');
const passport=require('passport');
const passportlocal=require('./configs/passport');
const Mongostore=require('connect-mongo');
const flash=require('connect-flash');
const customMW=require('./configs/middleware');
const passportjwt=require('./configs/passport-jwt-strategy');
const passportgoogle = require('./configs/passport-google-oauth2-strategy');
const http=require('http').createServer(app);



http.listen(5000,function(){
    console.log('listening to server port 5000');
});
const io=require('socket.io')(http);

io.on('connection',function(socket){
        console.log('New connection Received ');

        socket.on('message',function(data){
            console.log('connection request from memory box chatroom !',data);


            // socket.join(data.chatroom);
            
            socket.broadcast.emit('user__joined',data);
        })
        
    });
    





// const sass=require('node-sass');


// sass.render({
//   file: './assets/layout.scss',
  
// }, function(err, result) { /*...*/ });
// // OR


 
app.use(express.static(Env.asset_path));
app.use(express.urlencoded());
app.use(cookieParser());

app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(session({
    name:"parser",
    secret :Env.secretkey,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)

    },
    store : Mongostore.create(
        {
            mongoUrl : 'mongodb://localhost/my_data',
            autoremove : 'diabled'
        },function(err){
            console.log('error');

        }
    )
    
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.SetAuthenticatedUser);
app.use(flash());

app.use(customMW.setflash);

app.set('view engine','ejs');
app.set('views','./views');

app.use('/',require('./routes'))

app.listen(port,function(err){
    if(err){
        console.log('Error !');
    }
    console.log('Passport in running on port :',port);
    
});



