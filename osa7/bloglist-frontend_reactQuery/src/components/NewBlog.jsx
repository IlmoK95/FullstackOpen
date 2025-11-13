import { useState } from "react"
import { Form, Button } from "react-bootstrap"

const NewBlog = (props) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const addBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url,
        }
        props.createBlog.mutate(newBlog)
        setTitle("")
        setAuthor("")
        setUrl("")
    }

    return (
        <div>
            <Form onSubmit={addBlog}>
                <Form.Group>
                    <Form.Label>title:</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>author:</Form.Label>
                    <Form.Control
                        type="text"
                        value={author}
                        onChange={(event) => setAuthor(event.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>url:</Form.Label>
                    <Form.Control
                        type="text"
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                    />
                </Form.Group>
                <Button
                    style={{ margin: "10px" }}
                    variant="primary"
                    id="submit_button"
                    type="submit"
                >
                    create
                </Button>
            </Form>
        </div>
    )
}
export default NewBlog
