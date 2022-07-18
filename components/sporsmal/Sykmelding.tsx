import React, { useContext, useState } from "react";
import { State } from "../../pages/_app";
import {BodyShort, Button, Heading, TextField} from "@navikt/ds-react";
import { useRouter } from "next/router";
import Image from "next/image";
import Breadcrumbs from "../steg/Steg";
import JaNeiRadio from "../jaNeiRadio/JaNeiRadio";
import row from "@navikt/ds-react/src/table/Row";

interface InntektsForm extends HTMLFormElement {
    readonly inntekt1: HTMLInputElement;
    readonly inntekt2: HTMLInputElement;
    readonly inntekt3: HTMLInputElement;
}

const Sykmelding = () => {
    const router = useRouter();
    const { state, setState } = useContext(State);
    const [error, setError] = useState("");
    const [open, setOpen] = useState("");
    const handleSubmit = async (event: React.FormEvent<InntektsForm>) => {
        event.preventDefault();
        const currentAar = new Date().getFullYear();
        let sykmeldtAar = currentAar;
        if (open == "Ja") {
            sykmeldtAar = parseInt(event.currentTarget.sykmelding.value);
        }
        const aapGrense = 10;

        const errors = isNaN(sykmeldtAar) ? "Sykmeldingsår må være et tall" :
            sykmeldtAar > currentAar ? "Sykmeldingsår må være året vi er i nå eller tidligere" :
                sykmeldtAar < currentAar - aapGrense ? `Du får ikke arbeidsavklaringspenger dersom du ble sykmeldt for mer enn ${aapGrense} år siden.` : "";

        setError(errors);
        if ((isNaN(sykmeldtAar) || sykmeldtAar > currentAar || sykmeldtAar < currentAar - aapGrense) && open ) {
            return;
        }
        setState({
            inntekt1: state.inntekt1,
            inntekt2: state.inntekt2,
            inntekt3: state.inntekt3,
            antallBarn: state.antallBarn,
            arbeidsgrad: state.arbeidsgrad,
            sykmeldtAar
        });

        /*
        *
        * */
        await router.push("/steg/2");
    };
    const currentYear = new Date().getFullYear();
    const years = [currentYear - 1, currentYear - 2, currentYear - 3];

    return (
        <>
            <Breadcrumbs />
            <div className="items flex flex-col pt-4">
                <Image
                    src="/ikoner/wallet_circle.svg"
                    height="100"
                    width="100"
                    alt="lommebok ikon"
                    className={" flex items-center"}
                ></Image>
                <Heading size="large" level="2" spacing>
                    Sykmelding
                </Heading>
            </div>

            <form onSubmit={handleSubmit}>
                <JaNeiRadio
                    tittel="Er du sykmeldt?"
                    readMoreTittel="Hvorfor spør vi om du er sykmeldt."
                    state={open}
                    setState={setOpen}
                />
                {open == "Ja" && (
                    <>
                        <Heading size="small">Hvilket år ble du sykmeldt?</Heading>
                        <TextField size="medium" label="" id="sykmelding" className="w-1/5 " error={error && (<div className="list-disc font-bold w-full text-red-500" >{}</div>)}/>
                        {error && state.sykmeldtAar && (<div className="list-disc ml-5 font-bold text-red-500 mb-4 -mt-6" >{error}</div>)}
                    </>
                )}
                <div className="mt-4">
                    <Button variant="primary">Neste</Button>
                </div>
            </form>
        </>
    );
};

export default Sykmelding;
