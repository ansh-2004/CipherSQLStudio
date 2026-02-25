import {useEffect,useState} from 'react'
import api from '../services/api' 
import {Assignment} from '../components/Assignment'

export function AssignmentList(){
    const [assignments,setAssignments] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        async function getAssignments(){
            try {
                const res = await api.get("/assignments")
                console.log(res)

                setAssignments(res.data.data)
                console.log(assignments)

            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        getAssignments()
    },[])

    if(loading) return <p>Loading...</p>

    return (
        <div className='app-container'>
            <h2>Assignments</h2>

            {
                assignments.map((assignment)=>{
                    return <Assignment key={assignment._id} assignment={assignment}></Assignment>
                })
            }
        </div>
        
    )
}