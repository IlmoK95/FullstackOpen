const UserBlogs = ({ user }) => {
    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <br />
                <h2>Added blogs</h2>
                <ul>
                    {user.blogs.map((blog, index) => (
                        <li key={index}>{blog.title}</li>
                    ))}
                </ul>
            </div>
        )
    }
    return null
}
export default UserBlogs
