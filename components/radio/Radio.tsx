import { Radio as DSRadio, RadioGroup, ReadMore } from "@navikt/ds-react"
import React from "react"

const Radio = ({
    title,
    readMore,
    readMoreTitle,
    state,
    setState,
}: {
    title: string
    readMoreTitle?: string
    readMore?: string | React.ReactElement
    state: string
    setState: (newState: string) => void
}) => {
    const radioStyle = "flex-grow border-[1px] px-2 rounded-md hover:shadow"
    const selectedStyle =
        "bg-interaction-primary-hover-subtle border-interaction-primary"
    const description = <ReadMore header={readMoreTitle}>{readMore}</ReadMore>

    return (
        <RadioGroup
            className="grow"
            legend={title}
            description={readMore !== undefined && description}
            onChange={setState}
            value={state}
        >
            <div className="flex flex-row gap-4 mb-4 mt-4">
                <DSRadio
                    className={`${radioStyle} ${
                        state == "Ja" && selectedStyle
                    }`}
                    value="Ja"
                >
                    Ja
                </DSRadio>
                <DSRadio
                    className={`${radioStyle} ${
                        state == "Nei" && selectedStyle
                    }`}
                    value="Nei"
                >
                    Nei
                </DSRadio>
            </div>
        </RadioGroup>
    )
}

export default Radio
