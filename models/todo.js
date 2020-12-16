const mongoose=require('mongoose');
const todoSchema=new mongoose.Schema({
    Description:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Due_Date:{
        type:String,
        required:true
    }
    
})
const todo_list = mongoose.model('todo_list',todoSchema);
module.exports=todo_list;