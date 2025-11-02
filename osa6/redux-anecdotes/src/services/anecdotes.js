const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async ()=>{
    const response = await fetch(baseUrl)

    if (!response.ok){
        throw new Error('Failed to fetch notifications')
    }
    const data = await response.json()
    return data
}

const createNew = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0, id: getId() }),
  }
  
  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw new Error('Failed to create note')
  }
  
  return await response.json()
}

const addVote = async (content) => {
  const PUTurl = baseUrl+'/'+content.id
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content)
  }
  const response = await fetch(PUTurl, options)
  console.log(response)

    if (!response.ok) {
    throw new Error('Failed to create note')
  }
  
  return await response.json()
}

export default {getAll, createNew, addVote}