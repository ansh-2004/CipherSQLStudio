import 'dotenv/config'
import jwt from "jsonwebtoken";

export const protect = (req, res, next) =>{
  const header = req.headers.authorization

  if (!header) {
    return res.status(401).json({ success : false,error: "Login first to execute query" })
  }

  console.log('header',header)

  const token = header.split(" ")[1]
  
  try {
    const decode = jwt.verify(token, process.env.secretkey)

    console.log("decode",decode)

    req.user = decode

    next()
  } catch (error) {

    return res.status(401).json({ success : false ,error: "invalid token" })
  }
}