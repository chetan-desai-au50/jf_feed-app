const mongoose =require('mongoose');


const postSchema = new mongoose.Schema({
    post:{
        type:String,
        minlength: 1,
    },
    userId:String,
    username:String,
    isapprove:{
        type: String,
        default:"no"
    },
    adminId:{
        type:String,
        default:"1"
    },
    adminName:{
        type:String,
        default:"-"
    },
    public:{
        type:String,
        default:"no"
    }
},{timestamps:true});


module.exports=mongoose.model("posts",postSchema);