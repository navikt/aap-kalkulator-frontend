import { ReactNode } from "react"
import Sidebanner from "../sidebanner/Sidebanner"

const Container = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-container bg-canvas-background">
            <Sidebanner tittel="Beregning av AAP" />
            <div className="md:w-2/3 mx-auto">
                <section className="bg-component-background-light mt-8 pb-4 px-6">
                    {children}
                </section>
            </div>
        </div>
    )
}

export default Container
