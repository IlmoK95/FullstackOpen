import { useState } from "react"
import { createBlog } from "../reducers/blogReducer"
import { useDispatch } from "react-redux"

const NewBlog = () => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const dispatch = useDispatch()

    const addBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url,
        }
        dispatch(createBlog(newBlog))
        setTitle("")
        setAuthor("")
        setUrl("")
    }

    return (
        <div>
            <form onSubmit={addBlog}>
                <div>
                    <label>
                        title:
                        <input
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        ></input>
                    </label>
                </div>
                <div>
                    <label>
                        author:
                        <input
                            type="text"
                            value={author}
                            onChange={(event) => setAuthor(event.target.value)}
                        ></input>
                    </label>
                </div>
                <div>
                    <label>
                        url:
                        <input
                            type="text"
                            value={url}
                            onChange={(event) => setUrl(event.target.value)}
                        ></input>
                    </label>
                </div>
                <button id="submit_button" type="submit">
                    create
                </button>
            </form>
        </div>
    )
}
export default NewBlog
