import express from 'express'
import { createTask, deleteTask, getTasksByProject, updateTask } from '../controllers/taskController.js'

const taskRouter = express.Router()

taskRouter.post('/projects/:project_id/tasks',createTask)
taskRouter.get('/projects/:project_id/tasks',getTasksByProject)
taskRouter.put('/tasks/:id',updateTask)
taskRouter.delete('/tasks/:id',deleteTask)

export { taskRouter }