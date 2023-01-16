import { Link } from "@navikt/ds-react"
import { Back } from "@navikt/ds-icons"
import { useRouter } from "next/router"
import NextLink from "next/link"

const BackLink = ({ target, tekst }: { target: string; tekst?: string }) => {
    const router = useRouter()

    return (
        <NextLink passHref href={target}>
            <Link className="mt-4 ">
            {" "}
            <Back aria-hidden onResize={undefined} onResizeCapture={undefined} /> {tekst ? tekst : "Tilbake"}
            </Link>
        </NextLink>
    )
}

export default BackLink
