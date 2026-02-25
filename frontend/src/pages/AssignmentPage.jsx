import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export function AssignmentPage(){
    const {id} = useParams()
    const [assignment,setAssignment] = useState(null)
    const [loading,setLoading] = useState(true)

    const [query,setQuery] = useState("")
    const [result,setResult] = useState(null)
    const [error,setError] = useState(null)
    const [executing,setExecuting] = useState(false)

    useEffect(()=>{
        async function getAssignment(){
            try {
                const res = await api.get(`/assignments/${id}`)
                setAssignment(res.data.data)
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        getAssignment()
    },[id])

    async function handleExecute(){
        if(!query.trim()) return;

        setExecuting(true)
        setError(null)
        setResult(null)

        try {
            const res = await api.post('/assignments/execute',{query})
            console.log('res of post query',res)
            setResult(res.data)
        } catch (error) {
            console.log(error)
            setError(error.response?.data?.error)
        }finally{
            setExecuting(false)
        }
    }

    if(loading) return <p>Loading...</p>
    
    return (
        <div className="app-container">
            <h2>{assignment.title}</h2>
            <p><strong>Difficulty:</strong> {assignment.difficulty}</p>
            <p>{assignment.question}</p>
            <div>
                <textarea
                rows="6"
                style={{width:"100%",padding:"0.5rem"}}
                placeholder="Write your query here"
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                ></textarea>
            </div>

            <button onClick={handleExecute} disabled ={executing} style = {{marginTop : "1rem",padding : "0.5rem 1rem",cursor: "pointer"}}>
                {executing ? "Executing": "Execute Query"}
            </button>

            {
                error && (
                    <div style= {{marginTop: "1rem",color:"red"}}>
                        <strong>Error :</strong> {error}
                    </div>
                )
            }

            {
                result && result.success && (
                    <div style={{marginTop: "1rem"}}>
                        <p>
                            <strong>Rows Returned : </strong> {result.rowCount}
                        </p>

                        <table border="1" cellPadding = "6">
                            <thead>
                                <tr>
                                    {/* result.data is an array of objects  
                                        [{…}, {…}, {…}, {…}]
                                    */}
                                    {/* object.keys will return an array  */}
                                    {result.data.length > 0 && Object.keys(result.data[0]).map((key)=>(<th key = {key}>{key}</th>))}
                                </tr>
                            </thead>
                            <tbody>
                                {result.data.map((row,index)=>(
                                    <tr key = {index}> {Object.values(row).map((value,i)=>(
                                        <td key = {i}> {value}</td>
                                    ))}</tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    )
}