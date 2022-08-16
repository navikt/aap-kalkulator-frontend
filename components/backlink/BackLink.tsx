import { Link } from "@navikt/ds-react"
import NextLink from "next/link"
import { Back } from "@navikt/ds-icons"

const BackLink = ({ target, tekst }: { target: string; tekst?: string }) => {
    return (
        <NextLink href={target} className="mt-4 " passHref>
            {" "}
            <Link href={target} as={"a"}>
                <Back /> {tekst ? tekst : "Tilbake"}
            </Link>
        </NextLink>
    )
}

export default BackLink
