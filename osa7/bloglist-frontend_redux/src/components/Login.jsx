const Login = (props) => {
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={props.handleLogin}>
                <div>
                    <label>
                        username
                        <input
                            type="text"
                            onChange={props.handleUsernameChange}
                        ></input>
                    </label>
                </div>
                <div>
                    <label>
                        password
                        <input
                            type="password"
                            onChange={props.handlePasswordChange}
                        ></input>
                    </label>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}
export default Login
