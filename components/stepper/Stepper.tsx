import { Edit, Notes, NotesFilled, Success } from "@navikt/ds-icons"
import { BodyShort, Link } from "@navikt/ds-react"
import React, { useContext, useRef } from "react"
import Divider from "../divider/Divider"
import { useRouter } from "next/router"
import { State } from "../../pages/_app"

const Step = ({
    title,
    stepNumber,
    isLast,
}: {
    title: string
    stepNumber: number
    isLast: boolean
}) => {
    const { state } = useContext(State)
    const router = useRouter()
    const path = router.asPath.split("/")
    const current_step = parseInt(path[path.length - 1])
    const isCurrentPage = stepNumber === current_step
    const circleStyling =
        "flex rounded-full w-8 h-8 md:w-8 md:h-8  items-center justify-center mb-2"
    const stepStyling = `flex flex-col items-center justify-center row-span-2 w-20 ${
        isLast && "col-span-2"
    } gap-0`

    const isCompleted = current_step > stepNumber

    const onClick = async (url: string, e: React.MouseEvent) => {
        e.preventDefault()

        await router.push(url)
    }

    const circle =
        isCompleted && !isCurrentPage ? (
            <div
                aria-hidden="true"
                className={`text-feedback-success-icon bg-feedback-success-background ${circleStyling}`}
            >
                <Success className="w-8 h-8" />
            </div>
        ) : isCurrentPage ? (
            <div
                aria-hidden="true"
                className={`bg-feedback-info-background border-feedback-info-border border-2 ${circleStyling}`}
            >
                <Edit className="w-4 h-4 text-feedback-info-icon" />
            </div>
        ) : (
            <div
                aria-hidden="true"
                className={`border-2 border-border text-text-muted ${circleStyling}`}
            >
                {stepNumber}
            </div>
        )

    if (!isCompleted) {
        return (
            <div
                aria-label={title}
                aria-current={isCurrentPage}
                className={`${stepStyling}`}
            >
                {circle}
                <BodyShort aria-hidden="true" as="span" size="small">
                    {title}
                </BodyShort>
            </div>
        )
    }

    return (
        <Link
            href="#"
            onClick={(e) => onClick(`/steg/${stepNumber}`, e)}
            className={`${stepStyling}`}
        >
            {circle}
            <BodyShort as="span" size="small">
                {title}
            </BodyShort>
        </Link>
    )
}

const Stepper = () => {
    const stepperRef = useRef<HTMLElement>(null)
    const steps = ["Helse", "Inntekt", "Barn", "Resultat"]
    return (
        <nav aria-label="Steg i skjema" ref={stepperRef}>
            <ul className="flex flex-row justify-center pb-4 items-center md:px-8 px-0">
                {steps.map((step, index) => {
                    return (
                        <li
                            className="grid grid-cols-2 grid-rows-2 place-items-center justify-items-center"
                            key={index}
                        >
                            <Step
                                isLast={index == steps.length - 1}
                                title={step}
                                stepNumber={index + 1}
                            />
                            {index !== steps.length - 1 && <Divider />}
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Stepper
