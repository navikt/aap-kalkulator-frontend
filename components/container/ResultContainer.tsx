import { ReactNode } from "react"

const ResultContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div className="bg-canvas-background md:w-1/2 md:h-64 mx-auto">
            {children}
        </div>
    )
}

export default ResultContainer
