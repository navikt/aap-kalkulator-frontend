import Image from "next/image"
import { Heading } from "@navikt/ds-react"
import React from "react"

const QuestionHeader = ({
    image,
    alt,
    tittel,
}: {
    image: string
    alt: string
    tittel: string
}) => {
    return (
        <>
            <div
                aria-hidden="true"
                className="flex flex-col items-center pt-4 mb-4"
            >
                <img
                    aria-hidden
                    src={image}
                    height="100"
                    width="100"
                    alt={alt}
                    className="block"
                />
            </div>
            <Heading size="large" level="2" spacing>
                {tittel}
            </Heading>
        </>
    )
}

export default QuestionHeader
