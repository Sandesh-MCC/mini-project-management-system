import mongoose from 'mongoose'

const taskSchema=new mongoose.Schema({
    project_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project',
        required:[true,"Project ID is required"]
    },
    title:{
        type:String,
        required:[true,"Title is required"],
        trim:true
    },
    description:{
       type:String,
       required:[true,"Description is required"]
    },
    status:{
        type:String,
        enum:["todo","in-progress","done"],
        default:"todo"
    },
    priority:{
        type:String,
        enum:["low","medium","high"],
        default:"medium"
    },
    due_date:{
        type:Date,
        required:[true,"Due date is required"]
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})

let taskModel=mongoose.model('Task',taskSchema)

export {taskModel}