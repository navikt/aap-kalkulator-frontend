import { BodyShort } from "@navikt/ds-react"
import React from "react"

const WarningBanner = (text:{text:string}) => {
    return (
        <div className="justify-center bg-blue-100 flex gap-8 border-b-deepblue-400 border-b-4">
                <div className="">
                    <div className="flex py-3 items-baseline">
                        <BodyShort className="">
                            {text.text}
                        </BodyShort>
                    </div>
                </div>
            </div>
    )
}

export default WarningBanner
