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
            <div aria-hidden="true" className="flex flex-col pt-4 mb-4">
                <Image
                    src={image}
                    height="100"
                    width="100"
                    alt={alt}
                    className=" flex items-center"
                ></Image>
            </div>
            <Heading size="large" level="2" spacing>
                {tittel}
            </Heading>
        </>
    )
}

export default QuestionHeader
