import Content from "./Content"
import HeaderH1 from "./HeaderH1"
import Total from "./Total"

const Course=({course})=>{
    const header = course.name
    const parts = course.parts
    return(
        <div>
            <HeaderH1 header={header}/>
            <Content parts = {parts}/>
            <Total parts = {parts}/>
        </div>

    )



}





export default Course