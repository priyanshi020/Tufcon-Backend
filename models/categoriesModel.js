const mongoose=require('mongoose');
const CategoriesSchema = new mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
        trim:true,
    }
})
module.exports=mongoose.model('categories',CategoriesSchema)