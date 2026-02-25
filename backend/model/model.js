import mongoose from 'mongoose'
const schema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    difficulty : {
        type : String,
        enum : ["Easy","Medium","Hard"],
        required : true
    },
    description : {
        type : String,
        required : true
    },
    question : {
        type : String,
        required : true
    }
},{timestamps : true})

export const Assignment = mongoose.model("Assignment",schema)