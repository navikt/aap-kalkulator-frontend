import { Radio, RadioGroup } from "@navikt/ds-react"
import { useState } from "react"

const JaNeiRadio = ({
    tittel,
    state,
    setState,
}: {
    tittel: string
    state: string
    setState: (newState: string) => void
}) => {
    const radioStyle="flex-grow border-[1px] px-2 rounded-md hover:shadow"
    const selectedStyle="bg-interaction-primary-hover-subtle border-interaction-primary"
    return (
        <RadioGroup className="grow" legend={tittel} onChange={setState} value={state}>
            <div className="flex flex-row gap-4 mb-4">
            <Radio className={`${radioStyle} ${state=='Ja' && selectedStyle}`} value="Ja" >Ja</Radio>
            <Radio className={`${radioStyle} ${state=='Nei' && selectedStyle}`} value="Nei">Nei</Radio>
            </div>
        </RadioGroup>
    )
}

export default JaNeiRadio