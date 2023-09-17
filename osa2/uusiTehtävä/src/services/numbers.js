import axios from 'axios'
const baseURL = 'http://localhost:3002/persons'


const getAll =()=> {
    return axios.get(baseURL)
}

const AddNew =( newObj )=> {
    return axios.post(baseURL, newObj)
}

const Del =( id ) => {
    return axios.delete(`${baseURL}/${id}`)
}

export default {getAll, AddNew, Del}