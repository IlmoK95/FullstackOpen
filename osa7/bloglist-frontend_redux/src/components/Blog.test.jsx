import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"
import Togglable from "./Togglable"
import NewBlog from "./NewBlog"
import { expect } from "vitest"

describe("<Blog />", () => {
    let newLike

    const testBlog = {
        title: "kolmas kotini",
        author: "Ilmas",
        url: "www.kotini.fi",
        likes: 0,
        userId: "652e4e462ce5b559a26629a0",
    }

    beforeEach(() => {
        newLike = vi.fn()
        render(<Blog blog={testBlog} handleNewLike={newLike}></Blog>)
    })

    test("by default renders only title & author", () => {
        const likes = screen.getByText("likes ", { exact: false })
        expect(likes).not.toBeVisible()

        const url = screen.getByText("www.kotini.fi", { exact: false })
        expect(url).not.toBeVisible()

        const title = screen.getAllByText("kolmas kotini", { exact: false })

        expect(title[0]).toBeVisible()

        const author = screen.getAllByText("Ilmas", { exact: false })
        expect(author[0]).toBeVisible()
    })

    test("after clicking the view button, rest of the blog info is displayed", async () => {
        const user = userEvent.setup()

        const button = screen.getByText("view")
        await user.click(button)

        const likes = screen.getByText(`likes 0`, { exact: false })
        expect(likes).toBeVisible()

        const url = screen.getByText("www.kotini.fi", { exact: false })
        expect(url).toBeVisible()

        const author = screen.getAllByText("Ilmas", { exact: false })
        expect(author[1]).toBeVisible()
    })

    test("after clicking the like button twice, eventhandler function is called twice", async () => {
        const user = userEvent.setup()

        const button = screen.getByText("view")
        await user.click(button)

        const button2 = screen.getByText("like")
        await user.click(button2)
        await user.click(button2)

        expect(newLike.mock.calls).toHaveLength(2)
    })

    test("check if submitted form has right content", async () => {
        const newBlog = vi.fn()
        const { container } = render(
            <Togglable>
                <NewBlog handlePost={newBlog}></NewBlog>
            </Togglable>
        )

        const user = userEvent.setup()

        const button = screen.getByText("create new blog")
        await user.click(button)

        const input1 = screen.getByLabelText("title:")
        await user.type(input1, "About testing")

        const input2 = screen.getByLabelText("author:")
        await user.type(input2, "Ilmo Kapanen")

        const input3 = screen.getByLabelText("url:")
        await user.type(input3, "www.IlmoK.fi")

        const button2 = container.querySelector("#submit_button")
        await user.click(button2)

        expect(newBlog.mock.calls[0][0].title).toBe("About testing")
        expect(newBlog.mock.calls[0][0].author).toBe("Ilmo Kapanen")
        expect(newBlog.mock.calls[0][0].url).toBe("www.IlmoK.fi")
    })
})
