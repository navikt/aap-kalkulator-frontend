import { ReactNode } from "react"
import Banner from "../banner/Banner"
import Breadcrumbs from "../breadcrumbs/Breadcrumbs"
import React from "react"

const Container = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-container bg-canvas-background">
            <Banner title="Beregning av arbeidsavklaringspenger" />

            <div className="md:w-3/5 lg:w-2/5 mx-auto pb-8">
                <Breadcrumbs />
                <section className="bg-component-background-light py-8 px-8">
                    {children}
                </section>
            </div>
        </div>
    )
}

export default Container
