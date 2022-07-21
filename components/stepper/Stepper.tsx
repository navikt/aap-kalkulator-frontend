import { Success } from "@navikt/ds-icons"
import { BodyShort, Link } from "@navikt/ds-react"
import React, { useRef } from "react"
import Divider from "../divider/Divider"
import { useRouter } from "next/router"

const Step = ({
    title,
    stepNumber,
    isLast,
}: {
    title: string
    stepNumber: number
    isLast: boolean
}) => {
    const router = useRouter()
    const path = router.asPath
    const current_step = parseInt(path.split("/").at(-1)!!)
    const isCurrentPage = stepNumber === current_step
    const circleStyling =
        "flex rounded-full w-8 h-8 md:w-8 md:h-8  items-center justify-center mb-2"
    const stepStyling = `flex flex-col items-center justify-center row-span-2 w-20 ${
        isLast && "col-span-2"
    } gap-0`

    const isCompleted = current_step > stepNumber

    const circle = isCompleted ? (
        <div
            className={`text-feedback-success-icon bg-feedback-success-background ${circleStyling}`}
        >
            <Success className="w-8 h-8" />
        </div>
    ) : isCurrentPage ? (
        <div
            className={`bg-feedback-info-background border-feedback-info-border border-2 ${circleStyling}`}
        >
            {stepNumber}
        </div>
    ) : (
        <div
            className={`border-2 border-border text-text-muted ${circleStyling}`}
        >
            {stepNumber}
        </div>
    )

    if (!isCompleted) {
        return (
            <div className={`${stepStyling}`}>
                {circle}
                <BodyShort as="span" size="small">
                    {title}
                </BodyShort>
            </div>
        )
    }
    return (
        <Link href={`/steg/${stepNumber}`} className={`${stepStyling}`}>
            {circle}
            <BodyShort as="span" size="small">
                {title}
            </BodyShort>
        </Link>
    )
}

const Stepper = () => {
    const stepperRef = useRef<HTMLElement>(null)
    const steps = ["Sykmelding", "Inntekt", "Arbeid", "Barn", "Resultat"]
    return (
        <nav ref={stepperRef}>
            <ul className="flex flex-row justify-center pb-4 items-center md:px-8 px-0">
                {steps.map((step, index) => {
                    return (
                        <div
                            className="grid grid-cols-2 grid-rows-2 place-items-center justify-items-center"
                            key={index}
                        >
                            <Step
                                isLast={index == steps.length - 1}
                                title={step}
                                stepNumber={index + 1}
                            />
                            {index !== steps.length - 1 && <Divider />}
                        </div>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Stepper
