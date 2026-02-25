export const validation = (req,res,next)=>{
    const {query} = req.body 
    if(!query){
        return res.status(400).json({success : false ,error : "Query not found" })
    }

    const trim = query.trim() 
    const upper = trim.toUpperCase() 
    console.log('upper',upper)
    
    // query must start with select to avoid any changes to the preinserted data 
    if(!upper.startsWith("SELECT")){
        return res.status(400).json({success : false, error : "Query must start with select"})
    }

    // query should not contain these words to avoid any changes to the preinserted data 
    const words = [ "DROP","DELETE","UPDATE","INSERT","ALTER","TRUNCATE","CREATE" ]

    for (let word of words){
        if(upper.includes(word)){
            return res.status(400).json({success : false, error : `${word} not allowed`})
        }
    }

    // to avoid user using multiple statement
    if(upper.includes(';')){
        return res.status(400).json({success : false, error : "Write only one statement"})
    }

    next()
}