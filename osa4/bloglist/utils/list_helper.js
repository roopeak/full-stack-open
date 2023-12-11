const lodash = require("lodash")

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

const mostBlogs = (blogs) => {
    const counter = lodash.countBy(blogs, "author")

    const mostBlogsAuthor = Object.keys(counter).reduce((a, b) => {
        if (counter[a] > counter[b])
        {
            return a
        }
        else
        {
            return b
        }
    })

    return {
        author: mostBlogsAuthor,
        blogs: counter[mostBlogsAuthor],
    }
}




module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}