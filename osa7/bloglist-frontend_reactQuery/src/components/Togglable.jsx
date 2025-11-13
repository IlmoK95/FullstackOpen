import { useState } from "react"
import { Button } from "react-bootstrap"

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? "none" : "" }
    const showWhenVisible = { display: visible ? "" : "none" }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button style={{ margin: "10px" }} onClick={toggleVisibility}>
                    create new blog
                </Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button
                    variant="secondary"
                    style={{ margin: "10px" }}
                    onClick={toggleVisibility}
                >
                    cancel
                </Button>
            </div>
        </div>
    )
}
export default Togglable
