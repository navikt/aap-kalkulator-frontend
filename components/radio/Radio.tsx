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
    errorId?: string
    isError: boolean
}) => {
    const { formatMessage } = useFeatureToggleIntl()
    const radioStyle = "flex-grow border-[1px] px-2 rounded-md hover:shadow"
    const selectedStyle = "bg-surface-action-subtle-hover border-surface-action"
    const description = <ReadMore header={readMoreTitle}>{readMore}</ReadMore>

    return (
        <RadioGroup
            aria-errormessage={errorId}
            className=""
            legend={<Label className="text-xl">{title}</Label>}
            description={readMore !== undefined && description}
            onChange={onChange}
            value={state == undefined ? "" : state ? "Ja" : "Nei"}
            error={isError && <div className="hidden"></div>}
        >
            <DSRadio value="Ja">{formatMessage("options.yes")}</DSRadio>
            <DSRadio value="Nei">{formatMessage("options.no")}</DSRadio>
        </RadioGroup>
    )
}

export default Radio
