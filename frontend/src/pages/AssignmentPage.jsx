import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Editor from "@monaco-editor/react"

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
            const res = await api.post('/assignments/execute',{query,id})
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
          Difficulty: {assignment.description}
        </p>
        <p className="question-text">
          {assignment.question}
        </p>

        <div className="sample-data">
            <h3>Sample Tables</h3>

             {assignment.sampleTables?.map((table, index) => (
                <div key={index} className="sample-table">

                <h4>{table.tableName}</h4>

            <p className="schema-title">Schema:</p>
            <ul className="schema-list">
                {table.columns.map((col, i) => (
                <li key={i}>
                    {col.columnName} ({col.dataType})
                </li>
                ))}
            </ul>

            <p className="schema-title">Sample Data:</p>

            <div className="table-wrapper">
                <table>
                <thead>
                    <tr>
                    {table.columns.map((col, i) => (
                        <th key={i}>{col.columnName}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {table.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {table.columns.map((col, colIndex) => (
                        <td key={colIndex}>
                            {row[col.columnName]}
                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>

            </div>
        ))}
        </div>


      </div>

      <div className="editor-panel">
        <div className="editor-wrapper">
            <Editor
                height="250px"
                language="sql"
                theme="vs-dark"
                value={query}
                onChange={(value) => setQuery(value || "")}
                options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: "on",
                scrollBeyondLastLine: false
                }}
            />
        </div>

        <button
          className="execute-btn"
          onClick={handleExecute}
          disabled={executing}
        >
          {executing ? "Executing..." : "Execute Query"}
        </button>

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

    </div>

   
  </div>
)
}