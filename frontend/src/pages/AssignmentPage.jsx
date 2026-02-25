import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export function AssignmentPage(){
    const {id} = useParams()
    const [assignment,setAssignment] = useState(null)
    const [loading,setLoading] = useState(true)

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

    if(loading) return <p>Loading...</p>
    
    return (
        <div className="app-container">
            <h2>{assignment.title}</h2>
            <p><strong>Difficulty:</strong> {assignment.difficulty}</p>
            <p>{assignment.question}</p>

        </div>
    )
}