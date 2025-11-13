import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Form, Button } from "react-bootstrap"

const Blog = (props) => {
    const navigate = useNavigate()
    const [comment, setComment] = useState(null)

    const handleLike = () => {
        var newLikes = props.blog.likes + 1
        const changedBlog = {
            ...props.blog,
            user: props.blog.user[0].id,
            likes: newLikes,
        }
        props.updateBlog.mutate(changedBlog)
    }

    const handleRemove = () => {
        if (
            !window.confirm(
                `Remove blog ${props.blog.title} by ${props.blog.author} ?`
            )
        ) {
            return
        }
        navigate("/blogs/")
        props.removeBlog.mutate(props.blog.id)
    }

    const submitComment = (event) => {
        event.preventDefault()
        props.addComment.mutate({ blogID: props.blog.id, content: comment })
    }

    return (
        <div>
            <h1>
                {props.blog.title} {props.blog.author}
            </h1>
            <br></br>
            {props.blog.url}
            <br></br>
            likes {props.blog.likes}
            <Button
                style={{ marginLeft: "20%", padding: "10px" }}
                variant="secondary"
                onClick={handleLike}
            >
                like
            </Button>
            <br></br>
            {props.blog.user[0].name}
            <br></br>
            <Button onClick={handleRemove}>remove</Button>
            <br />
            <br />
            <h2>comments</h2>
            <Form onSubmit={submitComment}>
                <Form.Control
                    onChange={({ target }) => setComment(target.value)}
                ></Form.Control>
                <Button variant="primary" type="submit">
                    add comment
                </Button>
            </Form>
            <br />
            <br />
            <ul>
                {props.comments.map((comment) => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
            </ul>
        </div>
    )
}

export default Blog
