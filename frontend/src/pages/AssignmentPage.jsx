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
  <div className="assignment-container">
    <div className="top-section">
      
      <div className="question-panel">
        <h2>{assignment.title}</h2>
        <p className="difficulty">
          Difficulty: {assignment.difficulty}
        </p>
        <p className="question-text">
          {assignment.question}
        </p>
      </div>

      <div className="editor-panel">
        <textarea
          className="sql-editor"
          placeholder="Write your SQL query here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          className="execute-btn"
          onClick={handleExecute}
          disabled={executing}
        >
          {executing ? "Executing..." : "Execute Query"}
        </button>
      </div>

    </div>

    <div className="result-panel">
      {error && (
        <div className="error-box">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && result.success && (
        <>
          <p className="rows-info">
            Rows Returned: {result.rowCount}
          </p>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {result.data.length > 0 &&
                    Object.keys(result.data[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {result.data.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  </div>
)
}