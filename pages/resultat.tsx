// noinspection JSNonASCIINames

import { useContext, useEffect, useState } from "react"
import { State } from "./_app"
import { NextPage } from "next"
import {
    Accordion,
    Alert,
    BodyShort,
    Heading,
    Label,
    Link,
} from "@navikt/ds-react"
import Image from "next/image"
import { Result, ResultInterface } from "../components/result/Result"
import BackLink from "../components/backlink/BackLink"
import { useRouter } from "next/router"
import { logAmplitudeEvent } from "../lib/utils/amplitude"
import { kalkuler } from "../lib/logic/Kalkuler"
import { grunnbeloep, GrunnbeloepHistorikk } from "../lib/utils/types"
import { useFeatureToggleIntl } from "../hooks/useFeatureToggleIntl"
import { useIntl } from "react-intl"
import Stepper from "../components/stepper/Stepper";

export const getStaticProps = async () => {
    const res = await fetch("https://g.nav.no/api/v1/grunnbeloep")
    const resHistorikk = await fetch("https://g.nav.no/api/v1/historikk")
    const data = await res.json()
    // @ts-ignore
    const dataHistorikk: GrunnbeloepHistorikk[] = await resHistorikk
        .json()
        .then((res) =>
            res.map(
                (item: {
                    grunnbeløp: any
                    dato: string | number | Date
                    gjennomsnittPerÅr: any
                }) => {
                    // noinspection NonAsciiCharacters
                    return {
                        grunnbeloep: item.grunnbeløp,
                        dato: new Date(item.dato).getFullYear(),
                        gjennomsnittPerAar: item.gjennomsnittPerÅr
                            ? item.gjennomsnittPerÅr
                            : null,
                    }
                }
            )
        )
    return { props: { G: data, Historikk: dataHistorikk }, revalidate: 7200 }
}

// @ts-ignore
const Resultat: NextPage = ({
    G,
    Historikk,
}: {
    G: grunnbeloep
    Historikk: GrunnbeloepHistorikk[]
}) => {
    const { formatMessage } = useFeatureToggleIntl()
    const [result, setResult] = useState<ResultInterface | null>(null)
    const [open, setOpen] = useState(false)
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

    const handleAccordion = () => {
        setOpen((current) => {
            if (!current) {
                logAmplitudeEvent("accordion åpnet", {
                    tekst: "Hvorfor får jeg denne summen?",
                })
            } else {
                logAmplitudeEvent("accordion lukket", {
                    tekst: "Hvorfor får jeg denne summen?",
                })
            }
            return !current
        })
    }

    const dagsats = Math.ceil(result == null ? 0 : result.resultat / 260)
    return (
        <>
            <Stepper />
            <BackLink target="/steg/1" tekst="Endre svar" />
            <div className="grid gap-8">
                <div
                    className="flex flex-col items-center pt-4 mb-4"
                    aria-hidden="true"
                >
                    <img
                        src="/aap/kalkulator/ikoner/money_circle.svg"
                        height="100"
                        width="100"
                        alt=""
                        aria-hidden
                    />
                </div>
                <div className="text-left -mb-5">
                    <Heading level="2" size="large">
                        {formatMessage("result.title")}
                    </Heading>
                </div>
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 my-4 gap-4 justify-self-start">
                        <div className="bg-green-100 p-4 rounded p-7">
                            <span className="text-3xl md:text-3xl text-green-900">
                                {(dagsats * 10).toLocaleString("nb-NO")}&nbsp;kr
                            </span>
                            <Label className="text-green-800">
                                {formatMessage("result.per14")}
                            </Label>
                        </div>
                        <div className="bg-green-100 p-4 rounded p-7">
                            <span className="text-3xl md:text-3xl text-green-900">
                                {Math.ceil(
                                    result == null ? 0 : result.resultat
                                ).toLocaleString("nb-NO")}
                                &nbsp;kr
                            </span>
                            <Label className="text-green-800">
                                {formatMessage("result.perAar")}
                            </Label>
                        </div>
                    </div>
                    <div className="space-y-7">
                        <BodyShort >
                            {formatMessage("result.preDisclaimer")}
                        </BodyShort>
                        <Alert variant="info">
                            <div>
                                <BodyShort spacing>
                                    {formatMessage("result.disclamer")}
                                </BodyShort>
                            </div>
                        </Alert>
                        <Link
                            target="_blank"
                            href="https://www.nav.no/aap"
                            as="a"
                            color="link-color-text"
                        >
                            {formatMessage("result.link")}
                        </Link>
                    </div>
                </div>
                {result != null && (
                    <div>
                        <Heading size="medium" level="2" spacing>
                            {formatMessage("result.description")}
                        </Heading>

                        <ul className=" space-y-4 list-disc">
                            {result?.logs.map((text, index) => (
                                <li key={index}>
                                    <div>
                                        {formatMessage(text.id, {
                                            ...text.values,
                                            strong: (...chunks: any) => (
                                                <strong>{chunks}</strong>
                                            ),
                                        })}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default Resultat
