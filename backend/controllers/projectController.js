import { projectModel } from "../models/project.js";

const getProject = async (req, res) => {
    try {
        const record = await projectModel.find()
        res.status(201).json({ success: true, data: record })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getProjectById=async(req,res)=>{
   try {
    let record=await projectModel.findById(req.params.id)
    res.status(201).json({success:true,data:record})
   } catch (error) {
      res.status(500).json({success:false,message:error.message})
   }
}

const createProject = async (req, res) => {
    try {
        const { name, description } = req.body
        let data = new projectModel({ name, description })
        const record = await data.save()
        res.status(201).json({ success: true, data: record })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const deleteProject = async (req, res) => {
    try {
        await projectModel.findByIdAndDelete(req.params.id)
        res.status(201).json({ success: true })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export { getProject, createProject, deleteProject,getProjectById }