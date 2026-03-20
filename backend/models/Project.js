import mongoose from "mongoose";

const projectSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Project name is required"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Description is required"]
    },
    created_at:{
        type:Date,
        default:Date.now
    },
})

let projectModel=mongoose.model('Project',projectSchema)

export {projectModel}