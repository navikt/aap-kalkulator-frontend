import { ReactNode } from "react"
import Banner from "../banner/Banner"
import Breadcrumbs from "../breadcrumbs/Breadcrumbs"
import React from "react"
import { useFeatureToggleIntl } from "../../hooks/useFeatureToggleIntl"
import WarningBanner from "../warningBanner/WarningBanner";

const Container = ({ children }: { children: ReactNode }) => {
    const { formatMessage } = useFeatureToggleIntl()
    return (
        <div className="min-h-container bg-bg-subtle">
            <Banner />
            <WarningBanner text={"Kalkulatoren er oppdatert i henhold til endring av barnetilegg til 35kr som inntreffer fra 1.Februar 2022."} />
            <div className="px-4 md:px-12">
                <main className="max-w-[900px] mx-auto pb-8">
                <div className="max-w-[600px]">
                <Breadcrumbs />
                <div
                    className="bg-surface-default p-6 md:p-10"
                    id="maincontent"
                    tabIndex={-1}
                >
                    {children}
                </div>
                </div>
            </main>
            </div>
        </div>
    )
}

export default Container
