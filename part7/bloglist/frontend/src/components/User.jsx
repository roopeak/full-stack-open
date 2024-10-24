import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const User = () => {
  const { id } = useParams();

  const user = useSelector(
    (state) => state.users ? state.users.find((u) => u.id === id) : null);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      {user.blogs && user.blogs.length > 0 ? (
        <div>
          <p>
            <strong>added blogs</strong>
          </p>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>no blogs yet...</p>
      )}
    </div>
  );
};

export default User;