import 'dotenv/config'
import pkg from 'pg'
const { Pool } = pkg

export const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.pgport,
})

async function connectPG(){
    try {
        const client = await pool.connect(); 
        console.log('Postgres connected successfully');
        client.release()
    } catch (error) {
        console.log("error in connecting postgres",error)
    }
}

export default connectPG;