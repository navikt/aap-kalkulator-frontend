import { BodyShort, Heading } from "@navikt/ds-react"
import React from "react"
import { useFeatureToggleIntl } from "../../hooks/useFeatureToggleIntl"

const WarningBanner = (text:{text:string}) => {
    const { formatMessage } = useFeatureToggleIntl()
    return (
        <div className="justify-center bg-blue-300 flex gap-8 border-b-deepblue-400 border-b-4">
                <div className="">
                    <div className="flex py-3 items-baseline">
                        <BodyShort className="">
                            {formatMessage(text.text)}
                        </BodyShort>
                    </div>
                </div>
            </div>
    )
}

export default WarningBanner
