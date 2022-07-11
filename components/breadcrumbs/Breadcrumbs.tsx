import { Collapse, SuccessColored } from "@navikt/ds-icons"
import { BodyShort, Link } from "@navikt/ds-react"
import React, { useEffect, useRef, useState } from "react"
import { BreadcrumbsInterface } from "./breadcrumbsInterface"
import Vis from "./vis"
import Divider from "../divider/Divider"
import {useRouter} from "next/router";


const BreadcrumbBit = ({
    sti,
    tittel,
    erKlikkbar,
    steg,
    isCompleted,
}: BreadcrumbsInterface) => {
    const router = useRouter()
    const isCurrentPage = router.asPath === sti
    console.log(router.asPath)
    console.log(isCurrentPage)
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
        <Link href={sti}>
            <div className="flex flex-col items-center">
                {circle}
                <BodyShort as="span" size="small">
                    {tittel}
                </BodyShort>
            </div>
        </Link>
    )

    if (!erKlikkbar) {
        return (
            <div className="flex flex-col items-center">
                {circle}
                <BodyShort as="span" size="small" className="smule">
                    <span>{tittel}</span>
                </BodyShort>
            </div>
        )
    } else if (erKlikkbar) {
        return (
            <BodyShort as="span" size="small" className="smule">
                {link}
            </BodyShort>
        )
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex rounded-full bg-red-200 w-10 h-10 items-center justify-center">
                <p>{steg}</p>
            </div>
            <BodyShort as="span" size="small" className="smule">
                <span>{tittel}</span>
            </BodyShort>
        </div>
    )
}

interface BreadcrumbProps {
    crumbs: BreadcrumbsInterface[]
}

const Crumb = ({ crumbs }: BreadcrumbProps) => {
    const [synlige, setSynlige] = useState<BreadcrumbsInterface[]>([])
    const smulesti = useRef<HTMLElement>(null)


    useEffect(() => {
        setSynlige(crumbs)
        // eslint-disable-next-line
    }, [])

    const toggleSynlige = () => {
        if (synlige.length === crumbs.length) {
            setSynlige([crumbs[crumbs.length - 1]])
            smulesti.current!.classList.remove("apen")
        } else {
            setSynlige(crumbs)
            smulesti.current!.classList.add("apen")
        }
    }

    return (
        <nav className="brodsmuler" ref={smulesti}>
            <div className="limit">
                <ul className="brodsmuler__smuler flex flex-row space-x-4 justify-center pt-4 pb-4 items-center">
                    {synlige.map((smule, index) => {
                        return (
                            <>
                                {index > 0 && <Divider />}
                                <BreadcrumbBit
                                    key={index}
                                    sti={smule.sti}
                                    tittel={smule.tittel}
                                    erKlikkbar={smule.erKlikkbar}
                                    isCompleted={smule.isCompleted}
                                    steg={smule.steg}
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
