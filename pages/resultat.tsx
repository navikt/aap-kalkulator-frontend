// noinspection JSNonASCIINames

import { useContext, useEffect, useState } from "react"
import { State } from "./_app"
import { NextPage } from "next"
import { Accordion, Alert, Heading, Label, Link } from "@navikt/ds-react"
import Image from "next/image"
import { Result, ResultInterface } from "../components/result/Result"
import BackLink from "../components/backlink/BackLink"
import { useRouter } from "next/router"
import { logAmplitudeEvent } from "../lib/utils/amplitude"
import { kalkuler } from "../lib/logic/Kalkuler"
import { grunnbeloep, GrunnbeloepHistorikk } from "../lib/utils/types"

export const getStaticProps = async () => {
    const res = await fetch("https://g.nav.no/api/v1/grunnbeloep")
    const resHistorikk = await fetch("https://g.nav.no/api/v1/historikk")
    const data = await res.json()
    // @ts-ignore
    const dataHistorikk: GrunnbeloepHistorikk[] = await resHistorikk
        .json()
        .then((res) =>
            res.map((item) => {
                // noinspection NonAsciiCharacters
                return {
                    grunnbeloep: item.grunnbeløp,
                    dato: new Date(item.dato).getFullYear(),
                    gjennomsnittPerAar: item.gjennomsnittPerÅr
                        ? item.gjennomsnittPerÅr
                        : null,
                }
            })
        )
    return { props: { G: data, Historikk: dataHistorikk } }
}

// @ts-ignore
const Resultat: NextPage = ({
    G,
    Historikk,
}: {
    G: grunnbeloep
    Historikk: GrunnbeloepHistorikk[]
}) => {
    const [result, setResult] = useState<ResultInterface | null>(null)
    const { state } = useContext(State)
    const router = useRouter()

    useEffect(() => {
        if (state.sykmeldtAar === undefined) {
            state.lengsteSteg = 1
            router.push("/")
            return
        }

        logAmplitudeEvent("skjema fullført", {
            skjemanavn: "aap-kalkulator",
            skjemaId: "aap-kalkulator",
        })
        const res: Result = kalkuler(state, G, Historikk)
        setResult({
            resultat: res.resultat,
            personInfo: res.personInfo!!,
            logs: res.logs,
        })
    }, [])
    const dagsats = Math.ceil(result == null ? 0 : result.resultat / 260)
    // @ts-ignore
    return (
        <>
            <BackLink target="/steg/1" tekst="Endre svar" />
            <div className="flex flex-col items-center">
                <div className="flex flex-col pt-4 mb-4" aria-hidden="true">
                    <Image
                        src="/ikoner/money_circle.svg"
                        height="100"
                        width="100"
                        alt="penger ikon"
                        className={" flex items-center"}
                    ></Image>
                </div>
                <div className="place-items-start md:w-5/6">
                    <Heading
                        level="2"
                        size="large"
                        spacing
                        aria-label="Hvor mye kan jeg få?"
                    >
                        Dette kan du få
                    </Heading>
                </div>
                <div className="rounded-2xl bg-feedback-success-background p-6 w-full md:w-5/6">
                    <div className="grid grid-cols-2 md:grid-cols-3 my-4 gap-4 justify-center items-baseline">
                        <span className="text-4xl md:text-5xl  md:col-start-2 justify-self-end">
                            {(dagsats * 10).toLocaleString("nb-NO")}&nbsp;kr
                        </span>
                        <Label>hver&nbsp;14.&nbsp;dag</Label>

                        <span className="text-2xl md:text-3xl md:col-start-2 justify-self-end">
                            {Math.ceil(
                                result == null ? 0 : result.resultat
                            ).toLocaleString("nb-NO")}
                            &nbsp;kr
                        </span>
                        <Label>i året</Label>
                    </div>
                </div>
                {result != null && (
                    <div className="py-4 md:w-5/6">
                        <Accordion
                            onClick={() =>
                                logAmplitudeEvent("accordion åpnet", {
                                    tekst: "Hvorfor får jeg denne summen?",
                                })
                            }
                        >
                            <Accordion.Item>
                                <Accordion.Header>
                                    Hvorfor får jeg denne summen?
                                </Accordion.Header>
                                <Accordion.Content>
                                    <ul className=" space-y-4 list-disc">
                                        {result?.logs.map((text, index) => (
                                            <li key={index}>{text}</li>
                                        ))}
                                    </ul>
                                </Accordion.Content>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                )}
                <div className="pt-4">
                    <Alert variant="info" size="small">
                        <p>
                            Dette er en foreløpig beregning på hva du kan få i
                            AAP før skatt. Hvis du sender en søknad og får den
                            godkjent, vil du få vite hva du får utbetalt.
                        </p>

                        <Link
                            className="pt-4"
                            href="https://www.nav.no/aap"
                            as={"a"}
                        >
                            Les mer om hva du kan få i AAP her.
                        </Link>
                    </Alert>
                </div>
            </div>
        </>
    )
}

export default Resultat
