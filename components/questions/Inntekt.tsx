import { ChangeEvent, useContext, useState} from "react"
import {BrowserState, State} from "../../pages/_app"

import {
    BodyShort,
    Button,
    Label,
    ReadMore,
    TextField,
    Link,
} from "@navikt/ds-react"
import {useRouter} from "next/router"
import Stepper from "../stepper/Stepper"
import BackLink from "../backlink/BackLink"
import QuestionHeader from "../questionHeader/QuestionHeader"
import Radio from "../radio/Radio";

interface Inntekt {
    inntekt1: string
    inntekt2: string
    inntekt3: string
}

const Inntekt = () => {
    const router = useRouter()
    const {state, setState} = useContext(State)
    const [error, setError] = useState<string[]>(["", "", ""])
    const {browserState} = useContext(BrowserState)
    const [radioError, setRadioError] = useState<string>("")
    const [inntekt, setInntekt] = useState<Inntekt>({
        inntekt1:
            state.inntekt1 != undefined && !isNaN(state.inntekt1)
                ? state.inntekt1.toLocaleString("nb-NO")
                : "",
        inntekt2:
            state.inntekt2 != undefined && !isNaN(state.inntekt2)
                ? state.inntekt2.toLocaleString("nb-NO")
                : "",
        inntekt3:
            state.inntekt3 != undefined && !isNaN(state.inntekt3)
                ? state.inntekt3.toLocaleString("nb-NO")
                : "",
    })

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const tekst = event.target.value.replace(/[\.,\s]/g, "")
        const verdi = parseFloat(tekst)
        const index =
            parseInt(event.target.name[event.target.name.length - 1]) - 1
        let newErrors = error
        newErrors[index] = ""
        setError(newErrors)
        setInntekt({
            ...inntekt,
            [event.target.name]: !isNaN(verdi)
                ? verdi.toLocaleString("nb-NO")
                : "",
        })
    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        const errorMessage = "Fyll inn inntekt."
        const inntekt1 = parseFloat(inntekt.inntekt1.replace(/\s/g, ""))
        const inntekt2 = parseFloat(inntekt.inntekt2.replace(/\s/g, ""))
        const inntekt3 = parseFloat(inntekt.inntekt3.replace(/\s/g, ""))

        const errors = [
            !isNaN(inntekt1) ? "" : errorMessage,
            !isNaN(inntekt2) ? "" : errorMessage,
            !isNaN(inntekt3) ? "" : errorMessage,
        ]

        setError(errors)
        if (state.harLoenn == undefined) {
            setRadioError("Du må velge enten ja eller nei for å gå videre.")
        }
        if ((errors.some((v) => v.length > 0) && state.harLoenn == true) || state.harLoenn == undefined  ) {
            return
        }

        setState({
            ...state,
            inntekt1,
            inntekt2,
            inntekt3,
        })
        await router.push("/steg/3")
    }

    if (state.sykmeldtAar === undefined) {
        browserState.redirect = true
        router.push("/")
        return <></>
    }

    const inntektsAar = [
        state.sykmeldtAar - 1,
        state.sykmeldtAar - 2,
        state.sykmeldtAar - 3,
    ]


    const onRadioChange = (value: string) => {
        setState({
            ...state,
            harLoenn: value == "Ja",
            inntekt1:
                state.inntekt1 !== undefined && !isNaN(state.inntekt1)
                    ? state.inntekt1.toLocaleString("nb-NO")
                    : "",
            inntekt2:
                state.inntekt2 !== undefined && !isNaN(state.inntekt2)
                    ? state.inntekt2.toLocaleString("nb-NO")
                    : "",
            inntekt3:
                state.inntekt3 !== undefined && !isNaN(state.inntekt3)
                    ? state.inntekt3.toLocaleString("nb-NO")
                    : "",
        })
        setRadioError("")
    }

    const readMoreText = <div>
        <BodyShort spacing>
            Vi bruker inntekten din til å regne ut hva du kan få
            i arbeidsavklaringspenger.
        </BodyShort>
        <BodyShort>
            Dette bestemmes av inntekten din de tre siste årene
            eller minstesatsen (to ganger{" "}
            <Link
                href="https://www.nav.no/no/nav-og-samfunn/kontakt-nav/utbetalinger/grunnbelopet-i-folketrygden"
                target="_blank"
                rel="noreferrer"
                as={"a"}
            >
                grunnbeløpet
            </Link>
            ).
        </BodyShort>
    </div>
    return (
        <>
            <Stepper />
            <BackLink target="/steg/1" />
            <QuestionHeader
                image="/ikoner/wallet_circle.svg"
                alt="lommebok ikon"
                tittel="Inntekt"
            />
            <form onSubmit={handleSubmit}>
                <Radio
                    isError={radioError != ""}
                    errorId="error1"
                    title={`Hadde du inntekt i årene fra ${state.sykmeldtAar-3} til ${state.sykmeldtAar-1}?`}
                    state={state.harLoenn}
                    onChange={onRadioChange}
                    readMoreTitle="Hvorfor spør vi om inntekt?"
                    readMore={readMoreText}
                />
                {radioError != "" && (
                    <ul id="error1" aria-live="assertive" className="list-disc">
                        <li className="ml-5 font-bold text-red-500 mb-4">
                            {radioError}
                        </li>
                    </ul>
                )}

                {state.harLoenn &&

                    <>
                        <Label className="text-xl" >Hvor mye tjente du?</Label>
                        <BodyShort spacing>Fyll inn inntekt før skatt.</BodyShort>
                        <div className="flex md:flex-row flex-col md:space-x-8 my-4">
                            {inntektsAar.reverse().map((aar, index) => (
                                <div key={index} className="flex flex-col">
                                    <TextField
                                        aria-errormessage={`e${index}`}
                                        inputMode="numeric"
                                        className={`shrink md:mb-2 max-w-[160px] h-20`}
                                        key={index}
                                        id={`inntekt${3 - index}`}
                                        name={`inntekt${3 - index}`}
                                        label={`Inntekt ${aar}`}
                                        size="medium"
                                        error={error[2 - index]}
                                        value={Object.values(inntekt)[2 - index]}
                                        onChange={onChange}/>

                                    {error[2 - index] && (
                                        <ul
                                            id={`e${index}`}
                                            aria-live="assertive"
                                            className="list-disc ml-5 font-bold text-red-500"
                                        >
                                            <li>{error[2 - index]}</li>
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                }

                <Button variant="primary">Gå videre</Button>
            </form>
        </>
    )
}

export default Inntekt
