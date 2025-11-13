import { Form, Button } from "react-bootstrap"

const Login = (props) => {
    console.log("renderöi...")
    return (
        <div>
            <h2>Login</h2>
            <Form onSubmit={props.handleLogin}>
                <Form.Group>
                    <Form.Label>
                        username:
                        <Form.Control
                            type="text"
                            onChange={props.handleUsernameChange}
                        />
                    </Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        password:
                        <Form.Control
                            type="password"
                            onChange={props.handlePasswordChange}
                        />
                    </Form.Label>
                </Form.Group>
                <Button variant="primary" type="submit">
                    login
                </Button>
            </Form>
        </div>
    )
}
export default Login
