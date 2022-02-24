const mongoose=require('mongoose');
const Env=require('./enviroment');
mongoose.connect(`mongodb://localhost/${Env.db}`);
const my_data=mongoose.connection;

//if error
my_data.on('error',console.error.bind(console,'error connecting to DataBASE'));

//if connection sucesfull
my_data.once('open',function(){
    console.log("Successfully connected to DataBase");
})

