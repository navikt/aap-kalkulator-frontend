import { BodyShort, Heading } from "@navikt/ds-react"
import React from "react"
import { useFeatureToggleIntl } from "../../hooks/useFeatureToggleIntl"
import Image from "next/image"

const Banner = ({ updated }: { updated: string }) => {
    const { formatMessage } = useFeatureToggleIntl()
    return (
        <header className="flex flex-col items-center justify-center h-16 md:h-24 bg-[#ffffff] border-b-[#0084aa] border-solid border-b-4 text-center ">
            <div className="flex flex-row items-center justify-center h-full space-x-4">
                <Image
                    src="/aap/kalkulator/ikoner/kalkulator_square.svg"
                    height="40"
                    width="40"
                    alt="calculator icon"
                    className=" flex items-center"
                />
                <Heading
                    size="large"
                    level="1"
                    aria-label={formatMessage("banner.title")}
                >
                    {formatMessage("banner.title")}
                </Heading>
            </div>
            <BodyShort spacing>
                {formatMessage("banner.description")} {updated}
            </BodyShort>
        </header>
    )
}

export default Banner
