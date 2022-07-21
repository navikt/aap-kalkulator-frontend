import { Link } from "@navikt/ds-react"
import { Back } from "@navikt/ds-icons"
import React from "react"

const BackLink = ({ target }: { target: string }) => {
    return (
        <Link className="mt-4 " href={target}>
            {" "}
            <Back /> Tilbake
        </Link>
    )
}

export default BackLink
