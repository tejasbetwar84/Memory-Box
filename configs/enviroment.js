const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');

const logDirectory= path.join(__dirname,'../productionlogs');
fs.existsSync(logDirectory)|| fs.mkdirSync(logDirectory);

const accesslogstream= rfs.createStream('access.log',{
    interval :'1d',
    path : logDirectory
});
const development={
    name : "development",
    asset_path :'assets',
    secretkey :'blahsomething',
    db:"my_data",
    mailservice : {
        service :'gmail',
        host:'smtp.gmail.com',
        port :587,
        secure:false,
        auth:{
            user:'betwartejas3@gmail.com',
            pass : 'Tej@2020'
        },
    },
    google_clientID :"390038817206-d90b5hjodd30u4bvdm9denckqhkofqt8.apps.googleusercontent.com",
    google_clientSecret:"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",
    google_callbackURL :"http://localhost:8000/user/auth/google/callback",
    jwt_secret : 'secret',
    morgon : {
        mode :'dev',
        options : {stream : accesslogstream},
    }

}

const production={
    name : " production",
    asset_path :process.env.memorybox_asset_path,
    secretkey : process.env.memorybox_secretkey,
    db: process.env.memorybox_db,
    mailservice : {
        service :process.env.memorybox_service,
        host : process.env.memorybox_host,
        port :587,
        secure:false,
        auth:{
            user:process.env.memorybox_user,
            pass :process.env.memorybox_pass,
        },
    },
    google_clientID :process.env.memorybox_google_clientID,
    google_clientSecret:process.env.memorybox_clientsecret,
    google_callbackURL :process.env.memorybox_callbackURL,
    jwt_secret : process.env.memorybox_jwt_secret,
    morgan : {
        mode : 'combined',
        options :{stream : accesslogstream},
    }
    
}

module.exports=eval(process.env.ENVIROMENT)==undefined ? development : eval(process.env.ENVIROMENT);