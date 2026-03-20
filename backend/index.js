import express from 'express'
import { connectDB } from './config/db.js';
import { projectRouter } from "./routes/project.route.js";
import { taskRouter } from './routes/task_route.js';
import cors from 'cors'


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/projects', projectRouter)
app.use('/',taskRouter)



const port = 4000

const start = async () => {
    await connectDB()
    app.listen(port, () => {
        console.log(`server listening on port ${port}`)
    })
}
start()
