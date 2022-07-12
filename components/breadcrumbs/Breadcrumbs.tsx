import { Collapse, SuccessColored } from "@navikt/ds-icons"
import { BodyShort, Link } from "@navikt/ds-react"
import React, { useEffect, useRef, useState } from "react"
import Divider from "../divider/Divider"
import { useRouter } from "next/router"

const BreadcrumbBit = ({ tittel, steg }: { tittel: string; steg: number }) => {
    const router = useRouter()
    const path = router.asPath
    const current_steg = parseInt(path.split("/").at(-1)!!)
    const isCurrentPage = steg === current_steg

    const isCompleted = current_steg > steg

    const circle = isCompleted ? (
        <div className="flex rounded-full bg-green-200 w-7 h-7 md:w-10 md:h-10  items-center justify-center">
            <SuccessColored className="w-10 h-10" />
        </div>
    ) : isCurrentPage ? (
        <div className="flex rounded-full bg-blue-200 w-7 h-7 md:w-10 md:h-10 items-center justify-center">
            {steg}
        </div>
    ) : (
        <div className="flex rounded-full border w-7 h-7 md:w-10 md:h-10 items-center justify-center">
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

const Crumb = () => {
    const smulesti = useRef<HTMLElement>(null)
    const crumbs = ["Inntekt", "Arbeid", "Barn", "Resultat"]
    return (
        <nav className="brodsmuler" ref={smulesti}>
            <div className="limit">
                <ul className="brodsmuler__smuler flex flex-row space-x-4 justify-center pt-4 pb-4 items-center">
                    {crumbs.map((smule, index) => {
                        return (
                            <>
                                {index > 0 && <Divider />}
                                <BreadcrumbBit
                                    key={index}
                                    tittel={smule}
                                    steg={index + 1}
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
