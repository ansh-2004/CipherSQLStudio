export function Assignment({assignment}){
    return (
        <div className="assignment-card">
            <div className="assignment-card__title">{assignment.title}</div>
            <div className="assignment-card__difficulty">{assignment.difficulty}</div>
            <div className="assignment-card__description">{assignment.description}</div>
             
            
        </div>
    )
}