

const Total =({parts})=>{

    const partsExercises = parts.map(part=>{
        return part.exercises
    } )
    const initialVal = 0
    const total = partsExercises.reduce((totalVal, currentVal) => totalVal + currentVal, initialVal)
    return(
        <div>
            <h3>total of {total} exercises</h3>
        </div>
    )  
}

export default Total