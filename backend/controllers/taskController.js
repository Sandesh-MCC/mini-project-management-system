import { taskModel } from '../models/task.js';

const createTask = async (req, res) => {
    try {
        const { project_id } = req.params;
        const { title, description, status, priority, due_date } = req.body;

        const newTask = await taskModel.create({
            project_id,
            title,
            description,
            status,
            priority,
            due_date
        });

        res.status(201).json({ success: true, data: newTask });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getTasksByProject = async (req, res) => {
    try {
        const { project_id } = req.params;
        const { status, sortBy } = req.query; 

        let query = { project_id };

        if (status) {
            query.status = status;
        }

        let apiQuery = taskModel.find(query);


        if (sortBy === 'due_date') {
            apiQuery = apiQuery.sort('due_date'); 
        } else {
            apiQuery = apiQuery.sort('-created_at'); // Default: Latest first
        }

        const tasks = await apiQuery;
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
 
const updateTask = async (req, res) => {
    try {
        const updatedTask = await taskModel.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { returnDocument: 'after', runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        res.status(200).json({ success: true, data: updatedTask });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
 
const deleteTask = async (req, res) => {
    try {
        const task = await taskModel.findByIdAndDelete(req.params.id);
        
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        res.status(200).json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export {getTasksByProject,createTask,updateTask,deleteTask}