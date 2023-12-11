const dummy = (blogs) => {
    return 1
}
  
const totalLikes = (blogs) => {
    if (blogs.length === 0)
    {
        return 0
    }
    else
    {
        return blogs.reduce((sum, post) => sum + post.likes, 0)
    }
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) 
    {
        return null
    }
  
    const mostLiked = blogs.reduce((previous, current) => {
      if (previous.likes > current.likes)
      {
        return previous
      }
      else
      {
        return current
      }
    })
  
    return {
      title: mostLiked.title,
      author: mostLiked.author,
      likes: mostLiked.likes,
    }
  }

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}