import { BodyShort } from "@navikt/ds-react"
import React, { useRef } from "react"
import { Next } from "@navikt/ds-icons"

interface CrumbInterface {
    path: string
    title: string
    isClickable: boolean
}

const Crumb = ({ path, title, isClickable }: CrumbInterface) => {
    const link = (
        <a href={path} className="navds-link">
            {title}
        </a>
    )

    if (!isClickable) {
        return (
            <BodyShort as="li" size="small" className="smule">
                <span>{title}</span>
            </BodyShort>
        )
    }
    return (
        <BodyShort as="li" size="small" className="smule">
            {link}
        </BodyShort>
    )
}

const Breadcrumbs = () => {
    const breadcrumbRef = useRef<HTMLElement>(null)

    return (
        <nav ref={breadcrumbRef} aria-label="Du er her: ">
            <ul className="flex flex-row gap-1 my-4 items-center ml-2">
                <Crumb
                    path="https://www.nav.no/aap"
                    title="Arbeidsavklaringspenger"
                    isClickable={true}
                />
                <Next aria-hidden="true" />
                <Crumb
                    path="https://aap-kalkulator-frontend.dev.nav.no"
                    title="Hvor mye kan du få?"
                    isClickable={false}
                />
            </ul>
        </nav>
    )
}

export default Breadcrumbs
