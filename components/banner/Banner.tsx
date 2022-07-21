import { Heading } from "@navikt/ds-react"
import React from "react"

const Banner = ({ title }: { title: string }) => {
    return (
        <header className="flex flex-col items-center justify-center h-16 md:h-14 bg-[#CCF1D6] border-b-[#06893A] border-solid border-b-4 text-center ">
            <Heading size="medium" level="1" aria-label={title}>
                {title}
            </Heading>
        </header>
    )
}

export default Banner
