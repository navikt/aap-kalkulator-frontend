import { Label, Radio as DSRadio, RadioGroup, ReadMore } from "@navikt/ds-react"
import React from "react"
import { useFeatureToggleIntl } from "../../hooks/useFeatureToggleIntl"

const Radio = ({
    title,
    readMore,
    readMoreTitle,
    state,
    onChange,
    errorId,
    isError,
}: {
    title: string
    readMoreTitle?: string
    readMore?: string | React.ReactElement
    state?: boolean
    onChange: (newState: string) => void
    errorId: string
    isError: boolean
}) => {
    const { formatMessage } = useFeatureToggleIntl()
    const radioStyle = "flex-grow border-[1px] px-2 rounded-md hover:shadow"
    const selectedStyle =
        "bg-interaction-primary-hover-subtle border-interaction-primary"
    const description = <ReadMore header={readMoreTitle}>{readMore}</ReadMore>

    return (
        <RadioGroup
            aria-errormessage={errorId}
            className="grow"
            legend={<Label className="text-xl">{title}</Label>}
            description={readMore !== undefined && description}
            onChange={onChange}
            value={state == undefined ? "" : state ? "Ja" : "Nei"}
            error={isError && <div className="hidden"></div>}
        >
            <div className="flex flex-row gap-4 mb-4 mt-4">
                <DSRadio
                    className={`${radioStyle} ${state && selectedStyle}`}
                    value="Ja"
                >
                    {formatMessage("options.yes")}
                </DSRadio>
                <DSRadio
                    className={`${radioStyle} ${
                        state != undefined && !state && selectedStyle
                    }`}
                    value="Nei"
                >
                    {formatMessage("options.no")}
                </DSRadio>
            </div>
        </RadioGroup>
    )
}

export default Radio
