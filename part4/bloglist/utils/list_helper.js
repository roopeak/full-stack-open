const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return likes
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const mostLikedBlog = blogs.reduce((max, blog) => {
    return blog.likes > max.likes ? blog : max
  })

  return mostLikedBlog
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorBlogCounts = lodash.countBy(blogs, 'author')
  const topAuthor = lodash.maxBy(lodash.keys(authorBlogCounts), (author) =>
    authorBlogCounts[author])

  return {
    author: topAuthor,
    blogs: authorBlogCounts[topAuthor]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const groupedByAuthor = lodash.groupBy(blogs, 'author')

  const authorLikeCounts = lodash.map(groupedByAuthor, (authorBlogs, author) => {
    return {
      author: author,
      likes: lodash.sumBy(authorBlogs, 'likes')
    }
  })

  const topAuthor = lodash.maxBy(authorLikeCounts, 'likes')

  return topAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}