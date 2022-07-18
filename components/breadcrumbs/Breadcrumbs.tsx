import { BodyShort } from "@navikt/ds-react"
import React, { useRef } from "react"
import { Next } from "@navikt/ds-icons"

interface Brodsmule {
    sti: string
    tittel: string
    erKlikkbar: boolean
}

const BrodsmuleBit = ({ sti, tittel, erKlikkbar }: Brodsmule) => {
    const link = (
        <a href={sti} className="navds-link">
            {tittel}
        </a>
    )

    if (!erKlikkbar) {
        return (
            <BodyShort as="li" size="small" className="smule">
                <span>{tittel}</span>
            </BodyShort>
        )
    }
    return (
        <BodyShort as="li" size="small" className="smule">
            {link}
        </BodyShort>
    )
}

const Brodsmuler = () => {
    const smulesti = useRef<HTMLElement>(null)

    return (
        <nav ref={smulesti} aria-label="Du er her: ">
            <ul className="flex flex-row gap-1 my-4 items-center">
                <BrodsmuleBit
                    sti="https://www.nav.no/aap"
                    tittel="Arbeidsavklaringspenger"
                    erKlikkbar={true}
                />
                <Next />
                <BrodsmuleBit
                    sti="https://aap-kalkulator-frontend.dev.nav.no"
                    tittel="Hvor mye kan du få?"
                    erKlikkbar={false}
                />
            </ul>
        </nav>
    )
}

export default Brodsmuler
