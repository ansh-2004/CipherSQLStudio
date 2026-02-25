import 'dotenv/config'; 
import express from 'express'
import connectMongo from './config/mongo.js'
import connectPG from './config/pg.js'
import routes from './routes/route.js'
import cors from 'cors'


const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors())

connectMongo()
connectPG()




app.get('/',(req,res)=>{
    res.send("api running successfuly")
})

app.use('/api/assignments',routes)
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
