import { Assignment } from "../model/model.js"
import { pool } from "../config/pg.js"
import { model } from "../config/gemini.js"
import {Progress} from "../model/userProgress.js"

export const getAllAssignments = async (req,res)=>{
    try {
        const assignments = await Assignment.find();
        console.log("assignments",assignments)

        res.status(200).json({success : true,data : assignments})

    } catch (error) {
        console.log(error)
        res.status(500).json({success : false,error : "Error in getting Assignments"})
    }

}

export const getAssignment = async (req,res)=>{
    try {
        const {id} = req.params
        const assignment = await Assignment.findById(id)
        console.log('assignment',assignment)
        
        if(!assignment){
            return res.status(404).json({success : false ,error : "Assignment not found" })
        }

        res.status(200).json({success : true,data : assignment})

    } catch (error) {
        console.log(error)
        res.status(500).json({success : false,error : "Error in getting Assignment"})
    }

}

export const executeQuery = async(req,res)=>{
    try {
        const {query,id} = req.body;

        if(!query){
            return res.status(400).json({success : false ,error : "Query not found" })
        }

        const assignment = await Assignment.findById(id);

        if (!assignment) {
            return res.status(404).json({ error: "Assignment not found" });
        }

        await createTables(assignment.sampleTables);

        const result = await pool.query(query)
        console.log('result',result)

        // now we store progress 

        if(req.user){
          const {userId} = req.user
          console.log('req.user', req.user)
          let progress = await Progress.findOne({userId,assignmentId : id})
          
          if(!progress){
            progress = await Progress.create({
              userId : userId,
              assignmentId: id,
              sqlQuery: query,
              attemptCount: 1,
              isCompleted: result.rowCount > 0
            })
          }else{
            progress.sqlQuery = query;

            progress.lastAttempt = new Date();

            progress.attemptCount += 1;

            if(result.rowCount > 0){
              progress.isCompleted = true
            }
            
            await progress.save();
          }

          

        }
        res.status(200).json({success : true , rowCount : result.rowCount, data : result.rows})

    } catch (error) {
        console.log(error)
        res.status(500).json({success : false,error : error.message})
    }
}


export const createTables = async(sampleTables)=> {
  for (const table of sampleTables) {
    const { tableName, columns, rows } = table

    await pool.query(`DROP TABLE IF EXISTS ${tableName} CASCADE`)

    const column = columns
      .map(col => `${col.columnName} ${col.dataType}`)
      .join(", ")

    console.log('column',column) // column id INTEGER, name TEXT, salary INTEGER, department TEXT

    await pool.query(
      `CREATE TABLE ${tableName} (${column})`
    );

 
    for (const row of rows) {
      const values = columns.map(col => row[col.columnName])

      const placeholders = values
        .map((_, i) => `$${i + 1}`)
        .join(", ");
      console.log('placeholder',placeholders) 
      
        // placeholder $1, $2, $3, $4
        // placeholder $1, $2, $3, $4
        // placeholder $1, $2, $3, $4
        // placeholder $1, $2, $3, $4
      await pool.query(
        `INSERT INTO ${tableName} VALUES (${placeholders})`,
        values
      )
    }
  }
}

export const getHint=async (req,res)=>{
  try {
    const {question,sampleTables,userQuery} = req.body
    const schemaToText = sampleTables.map((st)=>{
      const columns = st.columns.map(col => `${col.columnName} (${col.dataType})`).join(", ")
      console.log("columns",columns)

      return `Table : ${st.tableName}\nColumns: ${columns}`
    }).join("\n\n")

    console.log("schemaToText",schemaToText)
    
    const prompt = `You are a SQL tutor. Rules:
                    - Do NOT provide the user final SQL query.
                    - Do NOT provide the user exact solution of the question.
                    - Only give the user hint and guidance to solve this question .
                    - If user query is close to solution, guide him . 
                    Question : ${question} Database Schema : ${schemaToText} user query : ${userQuery}. Your response should be short but helpful hint `

    const result = await model.generateContent(prompt)
    console.log('result',result)
    const response = await result.response
    console.log('response',response)
    const hint = response.text()
    console.log('hint',hint)

  
    res.status(200).json({success : true,data : hint})

  } catch (error) {
    console.log(error)
    res.status(500).json({success : false,error : error.message})
  }
}