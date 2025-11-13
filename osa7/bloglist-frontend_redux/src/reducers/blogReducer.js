import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import { newNotification } from "./notificationReducer"

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            const blogs = action.payload
            blogs.sort((a, b) => b.likes - a.likes)
            return blogs
        },
    },
})

const { setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        try {
            const blogs = await blogService.getAll()
            dispatch(setBlogs(blogs))
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const voteBlog = (blog) => {
    return (dispatch) => {
        blogService
            .addLike(blog, blog.id)
            .then(() => {
                dispatch(
                    newNotification({ content: "new like!", isError: false })
                )
                dispatch(initializeBlogs())
            })
            .catch(() => {
                dispatch(
                    newNotification({ content: "liking failed", isError: true })
                )
            })
    }
}

export const removeBlog = (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
        return
    }
    return (dispatch) => {
        blogService
            .removeBlog(blog.id)
            .then(() => {
                dispatch(
                    newNotification({
                        content: "blog removed!",
                        isError: false,
                    })
                )
                dispatch(initializeBlogs())
            })
            .catch(() =>
                dispatch(
                    newNotification({
                        content: "removing blog failed",
                        isError: true,
                    })
                )
            )
    }
}

export const createBlog = (blog) => {
    return (dispatch) => {
        blogService
            .create(blog)
            .then(() => {
                dispatch(
                    newNotification({
                        content: "new blog added!",
                        isError: false,
                    })
                )
                dispatch(initializeBlogs())
            })
            .catch(() => {
                dispatch(
                    newNotification({
                        content: "cannot add new blog",
                        isError: true,
                    })
                )
            })
    }
}

export default blogSlice.reducer
