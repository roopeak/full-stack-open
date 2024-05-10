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

const mostLikes = (blogs) => {
    const counter = lodash(blogs).groupBy("author").map((objects, key) => ({
        author: key,
        likes: lodash.sumBy(objects, "likes"),
    })).value()

    return counter.reduce((a, b) => {
        if (a.likes > b.likes)
        {
            return a
        }
        else
        {
            return b
        }
    })

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}