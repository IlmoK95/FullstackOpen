import axios from 'axios'
const baseURL = '/api/persons'


const getAll =()=> {
    return axios.get(baseURL)
}

const AddNew =( newObj )=> {
    return axios.post(baseURL, newObj)
}

const Del =( id ) => {
    return axios.delete(`${baseURL}/${id}`)
}

const upDate=(id, obj)=>{
    return axios.put(`${baseURL}/${id}`, obj)
}

export default {getAll, AddNew, Del, upDate}