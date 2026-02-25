import { useNavigate } from "react-router-dom"

export function Assignment({assignment}){
    const navigate = useNavigate()

    return (
        <div className="assignment-card" onClick={()=>navigate(`/assignment/${assignment._id}`)} style={{cursor : "pointer"}}>
            <div className="assignment-card__title">{assignment.title}</div>
            <div className="assignment-card__difficulty">{assignment.description}</div>
            <div className="assignment-card__description">{assignment.question}</div>
             
            
        </div>
    )
}