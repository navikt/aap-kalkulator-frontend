import Banner from "./Banner"
import { render, screen } from "@testing-library/react"

describe("Banner component", () => {
    it("should render", () => {
        render(<Banner title="Banner" />)
        expect(screen.getByText("Banner")).toBeDefined()
    })
})
