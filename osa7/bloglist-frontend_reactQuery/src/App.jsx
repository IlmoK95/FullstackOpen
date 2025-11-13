import { useState, useEffect, useContext } from "react"
import { Routes, Route, Link, useMatch } from "react-router-dom"
import { Navbar, Nav, Button } from "react-bootstrap"

import Blog from "./components/Blog"
import Login from "./components/Login"
import Notification from "./components/Notification"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
    getAll,
    create,
    removeBlog,
    updateBlog,
    setToken,
    getComments,
    addComment,
} from "./services/blogs"
import loginService from "./services/login"
import { getUsers } from "./services/users"

import NewBlog from "./components/NewBlog"
import Togglable from "./components/Togglable"
import NotificationContext from "./reducers/notificationReducer"
import UserContext from "./reducers/userReducer"
import Blogs from "./components/Blogs"
import Users from "./components/Users"
import UserBlogs from "./components/UserBlogs"

const App = () => {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [comment, setComment] = useState(null)

    const queryClient = useQueryClient()
    const { notificationDispatch } = useContext(NotificationContext)
    const { user, userDispatch } = useContext(UserContext)

    const userResult = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
        onSucces: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
        onError: () => {
            notificationDispatch({
                type: "ERROR",
                content: "Failed to get users",
            })
        },
    })

    const result = useQuery({
        queryKey: ["blogs"],
        queryFn: getAll,
        onSucces: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] })
        },
        onError: () => {
            notificationDispatch({
                type: "ERROR",
                content: "Failed to get blogs",
            })
        },
    })

    const commentsResult = useQuery({
        queryKey: ["comments"],
        queryFn: getComments,
        onSucces: () => {
            queryClient.invalidateQueries({ queryKey: ["comments"] })
        },
        onError: () => {
            notificationDispatch({
                type: "ERROR",
                content: "Failed to get comments",
            })
        },
    })

    const addCommentMutation = useMutation({
        mutationFn: addComment,
        onSuccess: () => {
            notificationDispatch({
                type: "SUCCES",
                content: "New comment!",
            })
            queryClient.invalidateQueries({ queryKey: ["comments"] })
        },
        onError: (error) => {
            console.log(error.message)
            notificationDispatch({
                type: "ERROR",
                content: "Failed to add new comment",
            })
        },
    })

    const updateBlogMutation = useMutation({
        mutationFn: updateBlog,
        onSuccess: () => {
            notificationDispatch({
                type: "SUCCES",
                content: "New like!",
            })
            queryClient.invalidateQueries({ queryKey: ["blogs"] })
        },
        onError: (error) => {
            console.log(error.message)
            notificationDispatch({
                type: "ERROR",
                content: "Failed to add new like",
            })
        },
    })

    const createBlogMutation = useMutation({
        mutationFn: create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] })
            queryClient.invalidateQueries({ queryKey: ["users"] })
            notificationDispatch({
                type: "SUCCES",
                content: "new blog!",
            })
        },
        onError: () => {
            notificationDispatch({
                type: "ERROR",
                content: "Failed to add new blog",
            })
        },
    })

    const removeBlogMutation = useMutation({
        mutationFn: removeBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] })
            notificationDispatch({
                type: "SUCCES",
                content: "blog removed!",
            })
        },
        onError: () => {
            notificationDispatch({
                type: "ERROR",
                content: "Failed to remove blog",
            })
        },
    })

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem(
                "loggedBlogappUser",
                JSON.stringify(user)
            )

            setToken(user.token)
            userDispatch({ type: "LOGIN", credentials: user })
            notificationDispatch({
                type: "SUCCES",
                content: "logged in!",
            })
        } catch (error) {
            console.log(error.message)
            notificationDispatch({
                type: "ERROR",
                content: "Failed to log in",
            })
        }
    }

    const handleLogOut = () => {
        userDispatch({ type: "LOGOUT" })
    }

    const users = userResult.data
        ? userResult.data.sort((a, b) => b.blogs.length - a.blogs.length)
        : []

    const blogs = result.data
        ? result.data.sort((a, b) => b.likes - a.likes)
        : []

    const comments = commentsResult.data ? commentsResult.data : []

    const userMatch = useMatch("/users/:id")
    const blogMatch = useMatch("/blogs/:id")

    const currentBlog = blogMatch
        ? blogs.find((blog) => blog.id == blogMatch.params.id)
        : null

    const userData = userMatch
        ? users.find((user) => user.id == userMatch.params.id)
        : null

    const currentComments = blogMatch
        ? comments.filter((comment) => comment.blogID == blogMatch.params.id)
        : []

    if (user === null) {
        return (
            <div className="container">
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

    const padding = { padding: "10px" }

    return (
        <div className="container">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#" as="span">
                            <Link style={padding} to={"/users"}>
                                users
                            </Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <Link style={padding} to={"/"}>
                                blogs
                            </Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            <label style={padding}>
                                {user.name} logged in
                                <Button
                                    style={{ margin: "10px" }}
                                    onClick={handleLogOut}
                                >
                                    logout
                                </Button>
                            </label>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <br></br>
            <br></br>
            <Notification />
            <Routes>
                <Route
                    path="/users/:id"
                    element={<UserBlogs user={userData} />}
                />
                <Route
                    path="/blogs/:id"
                    element={
                        <Blog
                            currentUser={user}
                            blog={currentBlog}
                            updateBlog={updateBlogMutation}
                            createBlog={createBlogMutation}
                            removeBlog={removeBlogMutation}
                            comments={currentComments}
                            addComment={addCommentMutation}
                        />
                    }
                />
                <Route path="/users" element={<Users users={users} />} />
                <Route
                    path="/"
                    element={
                        <Blogs
                            blogs={blogs}
                            user={user}
                            updateBlogMutation={updateBlogMutation}
                            createBlogMutation={createBlogMutation}
                            removeBlogMutation={removeBlogMutation}
                            padding={padding}
                        />
                    }
                />
            </Routes>
        </div>
    )
}

export default App
