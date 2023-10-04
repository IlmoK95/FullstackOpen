const _= require('lodash')


const reducer = (sum, item) => sum + item.likes

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce(reducer, 0)
  } 


  const mostPopular = (blogs)=>{
    let mostLikes = blogs[0]
    blogs.forEach(blog => {if (blog.likes > mostLikes.likes) { mostLikes = blog}})
    return mostLikes
  }

  const mostBlogs =(blogs)=>{
    const counts = _.countBy(blogs, blog => blog.author)
    let mostWrites = -1
    let mostWritesObj
    _.forOwn(counts, (val, key)=>{
      if (val > mostWrites)
      mostWrites = val
      mostWritesObj = {author : key, blogs : val}
    })
    return mostWritesObj
  }


  const mostLikes =(blogs)=>{
    const grouped = _.groupBy(blogs, blog => blog.author)
    const list = []
    _.forOwn(grouped, (val, key) =>{ 
      let total = val.reduce(reducer, 0)
      list.push({author : key, likes: total})
    })
    const mostPopular = _.sortBy(list, obj => obj.likes).pop()
    return mostPopular


  }


  module.exports = {
    dummy, totalLikes, mostPopular, mostBlogs, mostLikes
  }