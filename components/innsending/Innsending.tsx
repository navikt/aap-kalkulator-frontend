import {useRouter} from "next/router";
import React, {useContext} from "react";
import {ResultState, State} from "../../pages/_app";
import {Button, GuidePanel, Heading} from "@navikt/ds-react";
import Divider from "../divider/Divider";

const Innsending = () => {
    const router = useRouter()
    const {state, setState} = useContext(State)
    const {resultat, setResultat} = useContext(ResultState)
    const handleSubmit = async (event: React.MouseEvent) => {
        event.preventDefault()
        const endpoint = "http://0.0.0.0:8080/beregning"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(state),
        }

        const response = await fetch(endpoint, options)

        const result = await response.json()

        setResultat(result)
        await router.push("/resultat")
    }
    return (<>
        <div className="items-center flex flex-col pt-4">
            <Heading size="large" level="2" spacing>
                Send inn
            </Heading>
            <Divider />
        </div>
        <Button onClick={handleSubmit}>Send inn</Button>
    </>)
}

export default Innsending