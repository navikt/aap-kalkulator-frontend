import { ReactNode } from "react"

const ResultContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div className="py-2 mt-4 border-[1px] rounded-md border-feedback-success-border bg-feedback-success-background">
            {children}
        </div>
    )
}

export default ResultContainer
