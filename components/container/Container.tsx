import { ReactNode } from "react"
import Sidebanner from "../sidebanner/Sidebanner"

const Container = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-container bg-canvas-background">
            <Sidebanner tittel="Beregning av AAP" />
            <div className="md:w-3/5 lg:w-2/5 mx-auto pb-8">
                <section className="bg-component-background-light mt-8 py-12 px-12">
                    {children}
                </section>
            </div>
        </div>
    )
}

export default Container