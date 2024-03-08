import { useSelector } from "react-redux"
import Blog from "./Blog"

const BlogList = ({ user }) => {
	const blogs = useSelector((state) => state.blogs)

	return (
		<div>
			{blogs
				.slice()
				.sort((a, b) => b.likes - a.likes) 
				.map(blog => (
					<Blog
						key={blog.id}
						blog={blog}
						like={() => like(blog)}
						canRemove={user && blog.user.username === user.username}
						remove={() => remove(blog)}
					/>
				))}
		</div>
	);
}

export default BlogList