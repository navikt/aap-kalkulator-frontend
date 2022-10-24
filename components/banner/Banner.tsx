import { BodyShort, Heading } from "@navikt/ds-react"
import React from "react"
import { useFeatureToggleIntl } from "../../hooks/useFeatureToggleIntl"
import Image from "next/image"

const Banner = ({ updated }: { updated: string }) => {
    const { formatMessage } = useFeatureToggleIntl()
    return (
        <header className="flex flex-col h-auto bg-[#ffffff] border-b-[#0084aa] border-solid border-b-4 text-center ">
            <div className="flex flex-row items-center justify-center h-full space-x-4 mr-4">
                <div className="flex items-center ml-4 invisible md:visible">
                    <Image
                        src="/aap/kalkulator/ikoner/kalkulator_square.svg"
                        height="40"
                        width="40"
                        alt="calculator icon"
                    />
                </div>
                <Heading
                    size="large"
                    level="1"
                    aria-label={formatMessage("banner.title")}
                >
                    {formatMessage("banner.title")}
                </Heading>
            </div>
            <div className="flex flex-row md:w-4/6 lg:w-2/5 mx-auto space-x-2 py-3 md:pl-24">
                <p className="text-sm">{formatMessage("banner.description")}</p>
                <p className="text-gray-400 text-sm">
                    {formatMessage("banner.updated")}
                    {process.env.NEXT_PUBLIC_LAST_UPDATED}
                </p>
            </div>
        </header>
    )
}

export default Banner
