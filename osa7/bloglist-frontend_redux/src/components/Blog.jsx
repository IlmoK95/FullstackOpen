import { useState } from "react"
import { voteBlog, removeBlog } from "../reducers/blogReducer"
import { useDispatch } from "react-redux"

const Blog = (props) => {
    const dispatch = useDispatch()
    const [viewBlog, blogVisible] = useState(false)

    const blogsHidden = { display: viewBlog ? "none" : "", border: "solid" }
    const blogsVisible = { display: viewBlog ? "" : "none", border: "solid" }
    const removeVisible = {
        display:
            props.currentUser === props.blog.user[0].username ? "" : "none",
    }

    const blogVisibility = () => {
        blogVisible(!viewBlog)
    }

    const handleLike = () => {
        var newLikes = props.blog.likes + 1
        const changedBlog = {
            ...props.blog,
            user: props.blog.user[0].id,
            likes: newLikes,
        }
        dispatch(voteBlog(changedBlog))
    }

    const handleRemove = () => {
        dispatch(removeBlog(props.blog))
    }

    return (
        <div>
            <div data-testid={`article ${props.i}`} style={blogsHidden}>
                {props.blog.title} {props.blog.author}
                <button onClick={blogVisibility}>view</button>
                <br></br>
            </div>
            <div id="blogVisible" style={blogsVisible}>
                {props.blog.title} {props.blog.author}
                <button onClick={blogVisibility}>hide</button>
                <br></br>
                {props.blog.url}
                <br></br>
                likes {props.blog.likes}{" "}
                <button onClick={handleLike}>like</button>
                <br></br>
                {props.blog.user[0].name}
                <br></br>
                <button style={removeVisible} onClick={handleRemove}>
                    remove
                </button>
                <br></br>
            </div>
            <br></br>
        </div>
    )
}

export default Blog
