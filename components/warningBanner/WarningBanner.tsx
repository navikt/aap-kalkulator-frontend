import { Alert, BodyShort } from "@navikt/ds-react";
import React from "react"

const WarningBanner = (text:{text:string}) => {
    return (
        <div className="px-4 md:px-12">
                <div className="max-w-[900px] mx-auto">
                    <div className="pt-3 max-w-[600px]">
                        <Alert variant="info">
                            {text.text}
                        </Alert>
                    </div>
                </div>
            </div>
    )
}

export default WarningBanner
