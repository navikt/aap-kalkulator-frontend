import { Link } from "@navikt/ds-react"
import { Back } from "@navikt/ds-icons"
import { useRouter } from "next/router"
import NextLink from "next/link"

const BackLink = ({ target, tekst }: { target: string; tekst?: string }) => {
    return (
        <NextLink passHref href={target} legacyBehavior>
            <Link className="mt-4 ">
                <Back aria-hidden /> {tekst ? tekst : "Tilbake"}
            </Link>
        </NextLink>
    )
}

export default BackLink
