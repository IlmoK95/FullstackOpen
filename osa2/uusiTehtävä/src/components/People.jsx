import Person from "./Person"


const People =(props)=>{

    return (
        props.peopleToShow.map( person =>
            <Person id = {person.id} key = {person.id} name = {person.name} number = {person.number} delFunction = {props.DelFunction}
            />)

    )

}

export default People