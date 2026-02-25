import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    question : {
        type : String,
        required : true
    },
    sampleTables : [{
        tableName : String,
        columns : [
            {
                columnName : String,
                dataType : String
            }
        ],
        rows : [mongoose.Schema.Types.Mixed]
    }],
    expectedOutput : {
        type : String,
        value : mongoose.Schema.Types.Mixed
    }
},{timestamps : true})

export const Assignment = mongoose.model("Assignment",schema)