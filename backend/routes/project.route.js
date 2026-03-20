import express from 'express'
import { createProject, deleteProject, getProject, getProjectById } from '../controllers/projectController.js'

const projectRouter = express.Router()

projectRouter.post('/', createProject)
projectRouter.get('/', getProject)
projectRouter.get('/:id',getProjectById)
projectRouter.delete('/:id', deleteProject)

export { projectRouter }