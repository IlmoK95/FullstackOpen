import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

export const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

export const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

export const create = async (newObject) => {
    const config = { headers: { Authorization: token } }

    const response = await axios.post(baseUrl, newObject, config)

    return response.data
}

export const updateBlog = async (newObject) => {
    var url = baseUrl + "/" + newObject.id
    const response = await axios.put(url, newObject)
    return response.data
}

export const removeBlog = async (id) => {
    var url = baseUrl + "/" + id
    const response = await axios.delete(url)
    return response.data
}

export const getComments = () => {
    const request = axios.get(baseUrl + "/comments")
    return request.then((response) => response.data)
}

export const addComment = async (newComment) => {
    const config = { headers: { Authorization: token } }
    var url = baseUrl + "/" + newComment.blogID + "/comments"
    const response = await axios.post(url, newComment, config)

    return response.data
}
