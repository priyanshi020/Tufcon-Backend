const mongoose=require('mongoose');
const departmentSchema = new mongoose.Schema({
    departmentName:{
        type:String,
        required:true,
        trim:true,
    }
})
module.exports=mongoose.model('department',departmentSchema)