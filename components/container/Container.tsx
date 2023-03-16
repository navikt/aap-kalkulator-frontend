import { ReactNode } from "react"
import Banner from "../banner/Banner"
import Breadcrumbs from "../breadcrumbs/Breadcrumbs"
import React from "react"
import { useFeatureToggleIntl } from "../../hooks/useFeatureToggleIntl"
import WarningBanner from "../warningBanner/WarningBanner"

const Container = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-container bg-bg-subtle">
            <Banner />
            <div className="px-4 md:px-12">
                <main className="max-w-[900px] mx-auto pb-8">
                    <div className="max-w-[600px]">
                        <Breadcrumbs />
                        <div
                            className="bg-surface-default p-6 md:p-10 "
                            id="maincontent"
                            tabIndex={-1}
                        >
                            {/* TODO: Dobbelsjekk bredden på kalkulator text o.l */}
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Container
