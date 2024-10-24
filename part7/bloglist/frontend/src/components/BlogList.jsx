import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import Blog from "./Blog";

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: 'solid'
  }

  return (
    <div>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id} style={style}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </div>
        ))}
    </div>
  );
}

export default BlogList