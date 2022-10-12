import { ReactNode } from "react"
import Banner from "../banner/Banner"
import Breadcrumbs from "../breadcrumbs/Breadcrumbs"
import React from "react"
import { useFeatureToggleIntl } from "../../hooks/useFeatureToggleIntl"

const Container = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-container bg-canvas-background">
            <Banner updated={"12.october 2022"} />

            <div role="main" className="md:w-3/5 lg:w-2/5 mx-auto pb-8">
                <Breadcrumbs />
                <section
                    className="bg-component-background-light py-8 px-8"
                    id="maincontent"
                    tabIndex={-1}
                >
                    {children}
                </section>
            </div>
        </div>
    )
}

export default Container
