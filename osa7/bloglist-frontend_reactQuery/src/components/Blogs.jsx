import { Link } from "react-router-dom"
import NewBlog from "./NewBlog"
import Togglable from "./Togglable"

const Blogs = (props) => {
    return (
        <div>
            <Togglable>
                <NewBlog createBlog={props.createBlogMutation} />
            </Togglable>
            <br></br>
            <br></br>
            <ul>
                {props.blogs.map((blog) => (
                    <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>{`${blog.title}`}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Blogs

/*                 */
