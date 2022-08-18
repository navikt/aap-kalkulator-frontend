import Divider from "./Divider"
import { render, screen } from "@testing-library/react"

describe("Divider component", () => {
    it("should render", () => {
        const divider = render(<Divider isTitle={true} />)
        expect(divider).toMatchSnapshot()
    })
})
