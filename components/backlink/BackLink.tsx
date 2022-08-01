import { Link } from "@navikt/ds-react"
import { Back } from "@navikt/ds-icons"
import React from "react"
import { useRouter } from "next/router"

const BackLink = ({ target }: { target: string }) => {
    const router = useRouter()

    const onClick = async (e: React.MouseEvent) => {
        e.preventDefault()
        await router.push(target)
    }
    return (
        <Link href="#" className="mt-4 " onClick={onClick}>
            {" "}
            <Back /> Tilbake
        </Link>
    )
}

export default BackLink
