import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter =()=>{

    const dispatch = useDispatch()

    const handleChange =(event)=>{

        event.preventDefault()
        const filter = event.target.value
        dispatch(filterChange(filter))

    }


    return (
        <div>
            <label>
                filter
                <input onChange={handleChange} type="text" />
            </label>
            <br/>
            <br/>

        </div>
    )
}
export default Filter