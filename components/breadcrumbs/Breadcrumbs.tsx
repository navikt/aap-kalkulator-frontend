import { Collapse } from '@navikt/ds-icons'
import { BodyShort, Link } from '@navikt/ds-react'
import React, { useEffect, useRef, useState } from 'react'
import {BreadcrumbsInterface} from "./breadcrumbsInterface";
import Vis from "./vis";

const faste: BreadcrumbsInterface[] = [
    { tittel: 'Start', sti: "/", erKlikkbar: true },
]

const BreadcrumbBit = ({ sti, tittel, erKlikkbar }: BreadcrumbsInterface) => {

    const link = (
        <Link
            href={sti}
        >
            <BodyShort as="span" size="small">
                {tittel}
            </BodyShort>
        </Link>
    )

    if (!erKlikkbar) {
        return (
            <BodyShort as="li" size="small" className="smule">
                <span>{tittel}</span>
            </BodyShort>
        )
    } else if (erKlikkbar) {
        return (
            <BodyShort as="li" size="small" className="smule">
                {link}
            </BodyShort>
        )
    }

    return (
        <BodyShort as="li" size="small" className="smule">
            <span>{tittel}</span>
        </BodyShort>
    )
}

interface BreadcrumbProps {
    crumbs: BreadcrumbsInterface[]
}

const Crumb = ({ crumbs }: BreadcrumbProps) => {
    const [synlige, setSynlige] = useState<BreadcrumbsInterface[]>([])
    const smulesti = useRef<HTMLElement>(null)

    crumbs = faste.concat(crumbs)

    useEffect(() => {
        setSynlige(
            crumbs
        )
        // eslint-disable-next-line
    }, [])

    const toggleSynlige = () => {
        if (synlige.length === crumbs.length) {
            setSynlige([crumbs[crumbs.length - 1]])
            smulesti.current!.classList.remove('apen')
        } else {
            setSynlige(crumbs)
            smulesti.current!.classList.add('apen')
        }
    }

    return (
        <nav className="brodsmuler" ref={smulesti}>
            <div className="limit">
                <ul className="brodsmuler__smuler flex flex-row space-x-4 justify-center pt-4 pb-4">
                    <Vis
                        hvis=""
                        render={() => (
                            <li className="smule">
                                <button
                                    aria-label={
                                        synlige.length === crumbs.length
                                            ? 'Vis redusert brødsmulesti'
                                            : 'Vis hele brødsmulestien'
                                    }
                                    className="js-toggle"
                                    onClick={toggleSynlige}
                                >
                                    ...
                                </button>
                            </li>
                        )}
                     />

                    {synlige.map((smule, index) => {
                        return (
                            <BreadcrumbBit
                                key={index}
                                sti={smule.sti}
                                tittel={
                                    smule.tittel
                                }
                                erKlikkbar={smule.erKlikkbar}
                            />
                        )
                    })}
                </ul>

            </div>
        </nav>
    )
}

export default Crumb
