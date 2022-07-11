import React, { useContext, useState } from "react"
import { State } from "../../pages/_app"
import { Button, Heading, ReadMore, TextField } from "@navikt/ds-react"
import { useRouter } from "next/router"
import Image from "next/image"
import { BreadcrumbsInterface } from "../breadcrumbs/breadcrumbsInterface"
import Breadcrumbs from "../breadcrumbs/Breadcrumbs"
import { SuccessColored } from "@navikt/ds-icons"

interface InntektsForm extends HTMLFormElement {
    readonly inntekt1: HTMLInputElement
    readonly inntekt2: HTMLInputElement
    readonly inntekt3: HTMLInputElement
}

const crumbs: BreadcrumbsInterface[] = [
    {
        tittel: "Inntekt",
        sti: "/steg/1",
        erKlikkbar: true,
        steg: 1,
        isCompleted: false,
        isCurrentPage: true,
    },
    {
        tittel: "Arbeid",
        sti: "/steg/2",
        erKlikkbar: false,
        steg: 2,
        isCompleted: false,
        isCurrentPage: false,
    },
    {
        tittel: "Barn",
        sti: "/steg/3",
        erKlikkbar: false,
        steg: 3,
        isCompleted: false,
        isCurrentPage: false,
    },
    {
        tittel: "Resultat",
        sti: "/steg/4",
        erKlikkbar: false,
        steg: 4,
        isCompleted: false,
        isCurrentPage: false,
    },
]

const Inntekt = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const [error, setError] = useState<string[]>(["", "", ""])
    const handleSubmit = async (event: React.FormEvent<InntektsForm>) => {
        event.preventDefault()

        const error_message = "ugyldig verdi"
        const inntekt1 = parseFloat(event.currentTarget.inntekt1.value)
        const inntekt2 = parseFloat(event.currentTarget.inntekt2.value)
        const inntekt3 = parseFloat(event.currentTarget.inntekt3.value)

        const errors = [
            !isNaN(inntekt1) ? "" : error_message,
            !isNaN(inntekt2) ? "" : error_message,
            !isNaN(inntekt3) ? "" : error_message,
        ]
        setError(errors)
        if (errors.some((v) => v.length > 0)) {
            return
        }
        setState({
            inntekt1,
            inntekt2,
            inntekt3,
            antallBarn: state.antallBarn,
            arbeidsgrad: state.arbeidsgrad,
        })
        await router.push("/steg/2")
    }
    const currentYear = new Date().getFullYear()
    const years = [currentYear - 1, currentYear - 2, currentYear - 3]

    return (
        <>
            <Breadcrumbs crumbs={crumbs} />
            <div className="items flex flex-col pt-4">
                <Image
                    src="/ikoner/wallet_circle.svg"
                    height="100"
                    width="100"
                    alt="lommebok ikon"
                    className={" flex items-center"}
                ></Image>
                <Heading size="large" level="2" spacing>
                    Inntekt
                </Heading>
            </div>
            <form onSubmit={handleSubmit}>
                <Heading size="small">
                    Inntekt de siste tre årene før du ble sykemeldt
                </Heading>
                <ReadMore
                    size="small"
                    header="Hvorfor spør vi om inntekten din de siste tre årene før du ble syk?"
                >
                    {" "}
                    Fordi vi lurer ;)
                </ReadMore>
                <div className="flex flex-row space-x-8 mt-8">
                    {years.map((year, index) => (
                        <TextField
                            className="mb-4 w-40 "
                            key={index}
                            id={`inntekt${index + 1}`}
                            label={`Inntekt ${year}`}
                            size="medium"
                            error={error[index]}
                        />
                    ))}
                </div>

                <Button variant="primary">Neste</Button>
            </form>
        </>
    )
}

export default Inntekt
