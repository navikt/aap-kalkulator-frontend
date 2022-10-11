import { BodyShort, Heading } from "@navikt/ds-react"
import React from "react"

const Banner = ({ title }: { title: string }) => {
    return (
        <header className="flex flex-col items-center justify-center h-16 md:h-24 bg-[#ffffff] border-b-[#0084aa] border-solid border-b-4 text-center ">
            <Heading size="large" level="1" aria-label={title} spacing>
                {title}
            </Heading>
            <BodyShort spacing>
                KALKULATOR | Oppdatert 11.oktober 2022
            </BodyShort>
        </header>
    )
}

export default Banner
