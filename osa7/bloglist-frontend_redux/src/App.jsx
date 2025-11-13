import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import Blog from "./components/Blog"
import Login from "./components/Login"
import Notification from "./components/Notification"
import { initializeBlogs } from "./reducers/blogReducer"
import { login, logOut, isLoggedIn } from "./reducers/userReducer"

import NewBlog from "./components/NewBlog"
import Togglable from "./components/Togglable"

const App = () => {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const dispatch = useDispatch()

    const blogs = useSelector((state) => state.blogs)
    const user = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(isLoggedIn())
    }, [])

    const handleLogin = (event) => {
        event.preventDefault()
        dispatch(login({ username, password }))
    }

    const handleLogOut = () => {
        dispatch(logOut())
    }

    if (user === null) {
        return (
            <div>
                <Notification />
                <Login
                    handleUsernameChange={({ target }) =>
                        setUsername(target.value)
                    }
                    handlePasswordChange={({ target }) =>
                        setPassword(target.value)
                    }
                    handleLogin={handleLogin}
                />
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <label>
                {user.name} logged in
                <button onClick={handleLogOut}>logout</button>
            </label>
            <br></br>
            <br></br>
            <Togglable>
                <NewBlog />
            </Togglable>
            <br></br>
            <br></br>
            {blogs.map((blog, index) => (
                <Blog
                    i={index}
                    currentUser={user.username}
                    key={blog.id}
                    blog={blog}
                />
            ))}
        </div>
    )
}

export default App
