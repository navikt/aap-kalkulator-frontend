import { Collapse, Success, SuccessColored } from "@navikt/ds-icons"
import { BodyShort, Link } from "@navikt/ds-react"
import React, { useEffect, useRef, useState } from "react"
import Divider from "../divider/Divider"
import { useRouter } from "next/router"

const Steg = ({ tittel, steg }: { tittel: string; steg: number }) => {
    const router = useRouter()
    const path = router.asPath
    const current_steg = parseInt(path.split("/").at(-1)!!)
    const isCurrentPage = steg === current_steg
    const circleStyling =
        "flex rounded-full w-8 h-8 md:w-8 md:h-8  items-center justify-center mb-2"

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

    const link = (
        <Link href={`/steg/${steg}`}>
            <div className="flex flex-col items-center">
                {circle}
                <BodyShort as="span" size="small">
                    {tittel}
                </BodyShort>
            </div>
        </Link>
    )

    if (!isCompleted) {
        return (
            <div className="flex flex-col items-center">
                {circle}
                <BodyShort as="span" size="small" className="smule">
                    <span>{tittel}</span>
                </BodyShort>
            </div>
        )
    }
    return (
        <BodyShort as="span" size="small" className="smule">
            {link}
        </BodyShort>
    )
}

const Sti = () => {
    const stiRef = useRef<HTMLElement>(null)
    const sti = ["Sykmelding", "Inntekt", "Arbeid", "Barn", "Resultat"]
    return (
        <nav ref={stiRef}>
                <ul className="flex flex-row space-x-4 justify-center pt-4 pb-4 items-center">
                    {sti.map((steg, index) => {
                        return (
                            <>
                                {index > 0 && <Divider />}
                                <Steg
                                    key={index}
                                    tittel={steg}
                                    steg={index + 1}
                                />
                            </>
                        )
                    })}
                </ul>
        </nav>
    )
}

export default Sti
