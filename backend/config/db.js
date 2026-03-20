import mongoose from 'mongoose'

const connectDB=async()=>{
    try {
       await mongoose.connect('mongodb+srv://sandeshmali:sandeshmali@cluster0.hlbdyji.mongodb.net/mini_project_management_system')
       console.log("DB Connected")
    } catch (error) {
        console.log(`Failed to connect db:-${error}`)
    }
}

export  {connectDB}