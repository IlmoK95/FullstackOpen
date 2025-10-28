import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'

  

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState(null) 
  const [password, setPassword] = useState(null) 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState('')

  let timer  = 3000

  useEffect(() => {

    handleGetAll()


  }, [])


  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
      setUser(user)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

     try {
      const user = await loginService.login({ username, password })

      

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername(null)
      setPassword(null)
      setErrorMessage(null)

    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage('')
      }, timer)
    }
  }

  const logOut = () => {

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)

  }


  const handleGetAll =()=>{

    blogService.getAll().then(blogs => {
      blogs.sort((a, b)=>a.likes - b.likes)
      blogs.reverse()
      setBlogs( blogs )}

    ) 


  }



  const handleNewLike = async (post, id) => {

    console.log(post)
    
    blogService
              .addLike(post, id)
              .then(response => {
                handleGetAll()
                setMessage('new like added!') 
                setTimeout(()=> {           
                  setMessage('')
                }, timer)
                
              }).catch(error =>{
 
                setErrorMessage('adding new like failed!') 
                setTimeout(()=> {           
                  setErrorMessage('')
                }, timer)
              })

  }


  const removeBlog = async (blog) => {
    
   if(!window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)){
      return
    }
    
    blogService
              .removeBlog(blog.id)
              .then(response => {
                handleGetAll()
                setMessage('blog removed!') 
                setTimeout(()=> {           
                  setMessage('')
                }, timer)
                
              }).catch(error =>{
 
                setErrorMessage('removing blog failed failed!') 
                setTimeout(()=> {           
                  setErrorMessage('')
                }, timer)
              })

  }


  const handlePost = async (post) => {

    console.log(post)
    blogService.setToken(user.token)

    blogService
              .create(post)
              .then(response => {

                handleGetAll()        
                setMessage('new blog added!') 
                setTimeout(()=> {           
                  setMessage('')
                }, timer)


              }
              

              ).catch(error =>{
                
                console.log(error)
                setErrorMessage('adding new blog failed!') 
                setTimeout(()=> {           
                  setErrorMessage('')
                }, timer)
                

              })
  }




  if (user === null){
    return (
      <div>
        <Notification

          message={message}
          errorMessage={errorMessage}>

        </Notification>
        <Login

          handleUsernameChange = {({target}) => setUsername(target.value)}
          handlePasswordChange = {({target}) => setPassword(target.value)}
          handleLogin = {handleLogin}>

        </Login>
      </div>
      

    )

  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification

        message={message}
        errorMessage={errorMessage}>

      </Notification>
      <label>{user.name} logged in

        <button onClick={logOut}>logout</button>

      </label>
      <br></br>
      <br></br>
      <Togglable>
          <NewBlog

            handlePost = {handlePost}

          ></NewBlog>
      </Togglable>
      <br></br>
      <br></br>
      {blogs.map( (blog, index) =>
        <Blog handleNewLike={handleNewLike} i={index} removeBlog={removeBlog} currentUser={user.username} key={blog.id} blog={blog}/>
      )}

    </div>
    
  )
 
}

export default App