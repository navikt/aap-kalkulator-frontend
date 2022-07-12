import {Collapse, Success, SuccessColored} from "@navikt/ds-icons"
import { BodyShort, Link } from "@navikt/ds-react"
import React, { useEffect, useRef, useState } from "react"
import Divider from "../divider/Divider"
import { useRouter } from "next/router"

const BreadcrumbBit = ({ tittel, steg, visDivider }: { tittel: string; steg: number; visDivider: boolean }) => {
    const router = useRouter()
    const path = router.asPath
    const current_steg = parseInt(path.split("/").at(-1)!!)
    const isCurrentPage = steg === current_steg

    const isCompleted = current_steg > steg
    const circleStyling = "flex rounded-full w-8 h-8 md:w-8 md:h-8  items-center justify-center mb-2"
    const crumbStyling = "grid grid-cols-2 grid-rows-2 items-center justify-center"

    const circle = isCompleted ? (
        <div className={`text-feedback-success-icon bg-feedback-success-background ${circleStyling}`}>
            <Success className="w-8 h-8" />
        </div>
    ) : isCurrentPage ? (
        <div className={`bg-feedback-info-background border-feedback-info-border border-2 ${circleStyling}`}>
            {steg}
        </div>
    ) : (
        <div className={`border-2 border-border text-text-muted ${circleStyling}`}>
            {steg}
        </div>
    )

    const link = (
        <Link href={`/steg/${steg}`}>
            <div className={`${crumbStyling}`}>
                <div className="flex items-center justify-center">{circle}</div>
               {visDivider && <Divider />}
                <BodyShort as="span" size="small" className="row-start-2">
                    <div className="flex items-center justify-center">{tittel}</div>
                </BodyShort>
            </div>
        </Link>
    )

    if (!isCompleted) {
        return (
            <div className={`${crumbStyling}`}>
                <div className="flex items-center justify-center">{circle}</div>
                {visDivider && <Divider />}
                <BodyShort as="span" size="small" className={`smule row-start-2  ${!isCurrentPage && "text-text-muted"}`}>
                    <div className="flex items-center justify-center">{tittel}</div>
                </BodyShort>
            </div>
        )
    }

    return (
        <BodyShort as="span" size="small" className="smule">
            <div className="flex items-center justify-center">{link}</div>
        </BodyShort>
    )
}

const Crumb = () => {
    const smulesti = useRef<HTMLElement>(null)
    const crumbs = ["Inntekt", "Arbeid", "Barn", "Resultat"]
    return (
        <nav className="brodsmuler" ref={smulesti}>
            <div className="limit">
                <ul className="brodsmuler__smuler flex flex-row space-x-4 justify-center pb-8 items-center">
                    {crumbs.map((smule, index) => {
                        return (
                            <>
                                <BreadcrumbBit
                                    key={index}
                                    tittel={smule}
                                    steg={index + 1}
                                    visDivider={index >=0 && index < crumbs.length-1}
                                />
                            </>
                        )
                    })}
                </ul>
            </div>
        </nav>
    )
}

export default Crumb
