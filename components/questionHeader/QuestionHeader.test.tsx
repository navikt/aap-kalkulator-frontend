import { render, screen } from "@testing-library/react"
import React from "react"
import QuestionHeader from "./QuestionHeader"
import { TeddyIcon } from "../icons/TeddyIcon"

describe("QuestionHeader component", () => {
    it("should render", () => {
        render(
            <QuestionHeader image={<TeddyIcon />} tittel={"QuestionHeader"} />
        )
        expect(screen.getByText("QuestionHeader")).toBeDefined()
    })
})
