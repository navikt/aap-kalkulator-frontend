import { Link } from "@navikt/ds-react"
import { Back } from "@navikt/ds-icons"
import { useRouter } from "next/router"

const BackLink = ({ target, tekst }: { target: string; tekst?: string }) => {
    const router = useRouter()

    const onClick = async (e: React.MouseEvent) => {
        e.preventDefault()
        await router.push(target)
    }
    return (
        <Link as={"a"} href="#" className="mt-4 " onClick={onClick}>
            {" "}
            <Back title="arrow-left"/> {tekst ? tekst : "Tilbake"}
        </Link>
    )
}

export default BackLink
