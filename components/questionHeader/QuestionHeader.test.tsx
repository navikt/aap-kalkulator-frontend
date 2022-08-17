import { render, screen } from "@testing-library/react"
import QuestionHeader from "./QuestionHeader";

describe("QuestionHeader component", () => {
    it("should render", () => {
        render(<QuestionHeader alt={"test"} image="/ikoner/briefcase_circle.svg" tittel={"QuestionHeader"} />)
        expect(screen.getByText("QuestionHeader")).toBeDefined()
    })
})