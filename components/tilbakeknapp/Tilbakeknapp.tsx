import { Link } from "@navikt/ds-react"
import { Back } from "@navikt/ds-icons"

const Tilbakeknapp = ({ til }: { til: string }) => {
    return (
        <Link className="mt-4 " href={til}>
            {" "}
            <Back /> Tilbake
        </Link>
    )
}

export default Tilbakeknapp
