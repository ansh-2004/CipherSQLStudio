import { Assignment } from "../model/model.js";
import { pool } from "../config/pg.js";


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

        res.status(200).json({success : true , rowCount : result.rowCount, data : result.rows})

    } catch (error) {
        console.log(error)
        res.status(500).json({success : false,error : error.message})
    }
}


export const createTables = async(sampleTables)=> {
  for (const table of sampleTables) {
    const { tableName, columns, rows } = table;

    await pool.query(`DROP TABLE IF EXISTS ${tableName} CASCADE`);

    const column = columns
      .map(col => `${col.columnName} ${col.dataType}`)
      .join(", ");

    await pool.query(
      `CREATE TABLE ${tableName} (${column})`
    );

 
    for (const row of rows) {
      const values = columns.map(col => row[col.columnName]);

      const placeholders = values
        .map((_, i) => `$${i + 1}`)
        .join(", ");

      await pool.query(
        `INSERT INTO ${tableName} VALUES (${placeholders})`,
        values
      );
    }
  }
}