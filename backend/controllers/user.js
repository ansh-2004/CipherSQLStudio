import {User} from "../model/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const signup = async (req,res) =>{
    try {
    const { name, email, password } = req.body

    const isExist = await User.findOne({ email })
    if (isExist) {
      return res.status(400).json({ sucess : false, error: "user already exists" })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hash
    })

    res.status(201).json({ success: true })

  } catch (error) {
    res.status(500).json({ success : false,error: "Error in signing up" })
  }
}


export const login = async (req,res)=>{
    try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ success : false , error: "user not exist" })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success : false , error: "Wrong Password" })
    }

    const token = jwt.sign( { userId: user._id },process.env.secretkey)

    res.json({ success: true, data : token })

  } catch (error) {
    res.status(500).json({ success : false,error: "Error in log in" })
  }
}

