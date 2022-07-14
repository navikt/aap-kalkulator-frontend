import { Radio, RadioGroup, ReadMore } from "@navikt/ds-react"
import { useState } from "react"

const JaNeiRadio = ({
    tittel,
    readMore,
    readMoreTittel,
    state,
    setState,
}: {
    tittel: string
    readMoreTittel?: string
    readMore?: string
    state: string
    setState: (newState: string) => void
}) => {
    const radioStyle = "flex-grow border-[1px] px-2 rounded-md hover:shadow"
    const selectedStyle =
        "bg-interaction-primary-hover-subtle border-interaction-primary"
    const description =
        <ReadMore header={readMoreTittel}>{readMore}</ReadMore>

    return (
        <RadioGroup
            className="grow"
            legend={tittel}
            description={readMore !== undefined && (description)}
            onChange={setState}
            value={state}
        >
            <div className="flex flex-row gap-4 mb-4 mt-4">
                <Radio
                    className={`${radioStyle} ${
                        state == "Ja" && selectedStyle
                    }`}
                    value="Ja"
                >
                    Ja
                </Radio>
                <Radio
                    className={`${radioStyle} ${
                        state == "Nei" && selectedStyle
                    }`}
                    value="Nei"
                >
                    Nei
                </Radio>
            </div>
        </RadioGroup>
    )
}

export default JaNeiRadio
