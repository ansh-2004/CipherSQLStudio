import 'dotenv/config'; 
import express from 'express'
import connectMongo from './config/mongo.js'
import connectPG from './config/pg.js'
import assignmentRoutes from './routes/assignmentRoutes.js'
const app = express()
const port = process.env.PORT

app.use(express.json())
connectMongo()
connectPG()

app.get('/',(req,res)=>{
    res.send("api running successfuly")
})

app.use('/api/assignments',assignmentRoutes)
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
