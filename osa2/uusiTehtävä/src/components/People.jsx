import Person from "./Person"

const People =(props)=>{
    return (
        props.peopleToShow.map( person =>
            <Person key = {person.id} name = {person.name} number = {person.number} />)

    )

}

export default People