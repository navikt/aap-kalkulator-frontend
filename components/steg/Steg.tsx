import { Success } from "@navikt/ds-icons"
import { BodyShort, Link } from "@navikt/ds-react"
import React, { useRef } from "react"
import DividerSteg from "../divider/DividerSteg"
import { useRouter } from "next/router"

const Steg = ({
    tittel,
    steg,
    last,
}: {
    tittel: string
    steg: number
    last: boolean
}) => {
    const router = useRouter()
    const path = router.asPath
    const current_steg = parseInt(path.split("/").at(-1)!!)
    const isCurrentPage = steg === current_steg
    const circleStyling =
        "flex rounded-full w-8 h-8 md:w-8 md:h-8  items-center justify-center mb-2"
    const crumbStyling = `flex flex-col items-center justify-center row-span-2 w-20 ${
        last && "col-span-2"
    } gap-0`

    const isCompleted = current_steg > steg

    const circle = isCompleted ? (
        <div
            className={`text-feedback-success-icon bg-feedback-success-background ${circleStyling}`}
        >
            <Success className="w-8 h-8" />
        </div>
    ) : isCurrentPage ? (
        <div
            className={`bg-feedback-info-background border-feedback-info-border border-2 ${circleStyling}`}
        >
            {steg}
        </div>
    ) : (
        <div
            className={`border-2 border-border text-text-muted ${circleStyling}`}
        >
            {steg}
        </div>
    )

    if (!isCompleted) {
        return (
            <div className={`${crumbStyling}`}>
                {circle}
                <BodyShort as="span" size="small">
                    {tittel}
                </BodyShort>
            </div>
        )
    }
    return (
        <Link href={`/steg/${steg}`} className={`${crumbStyling}`}>
            {circle}
            <BodyShort as="span" size="small">
                {tittel}
            </BodyShort>
        </Link>
    )
}

const Sti = () => {
    const stiRef = useRef<HTMLElement>(null)
    const sti = ["Sykmelding", "Inntekt", "Arbeid", "Barn", "Resultat"]
    return (
        <nav ref={stiRef}>
            <ul className="flex flex-row justify-center pb-4 items-center md:px-8 px-0">
                {sti.map((steg, index) => {
                    return (
                        <div
                            className="grid grid-cols-2 grid-rows-2 place-items-center justify-items-center"
                            key={index}
                        >
                            <Steg
                                last={index == sti.length - 1}
                                tittel={steg}
                                steg={index + 1}
                            />
                            {index !== sti.length - 1 && <DividerSteg />}
                        </div>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Sti
