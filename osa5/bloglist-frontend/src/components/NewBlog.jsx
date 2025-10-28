import { useState } from "react"

const NewBlog =(props)=>{

  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('')

  const addBlog =(event)=>{

    event.preventDefault()
    props.handlePost({ 
        'title' : title, 
        'author' : author, 
        'url' : url,
   
        })
    setTitle('')
    setAuthor('')
    setUrl('')

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
              onChange={event => setTitle(event.target.value)}></input>
          </label>
        </div>
        <div>
          <label>
            author:
            <input 
              type="text"
              value={author}
              onChange={event => setAuthor(event.target.value)}></input>
          </label>
        </div>
        <div>
          <label>
            url:
            <input 
              type="text"
              value={url}
              onChange={event => setUrl(event.target.value)}></input>
          </label>
        </div>
        <button id='submit_button' type="submit">create</button>

      </form>


    </div>
  )
}
export default NewBlog