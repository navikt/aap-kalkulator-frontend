import { Edit, Notes, NotesFilled, Success } from "@navikt/ds-icons"
import { BodyShort, Link } from "@navikt/ds-react"
import NextLink from "next/link"
import React, { useContext, useRef } from "react"
import Divider from "../divider/Divider"
import { useRouter } from "next/router"
import { State } from "../../pages/_app"
import { useFeatureToggleIntl } from "../../hooks/useFeatureToggleIntl"

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
    const path = router.asPath.split("/")
    const current_step =
        path[path.length - 1] == "resultat"
            ? 5
            : parseInt(path[path.length - 1])
    const isCurrentPage = stepNumber === current_step
    const circleStyling =
        "flex rounded-full w-8 h-8 items-center justify-center mb-2"
    const stepStyling = `flex flex-col items-center justify-center row-span-2 w-20 ${
        isLast && "col-span-2"
    } gap-0`

    const isCompleted = current_step > stepNumber

    const circle =
        isCompleted && !isCurrentPage ? (
            <div
                aria-hidden="true"
                className={`text-icon.success bg-surface-success-subtle ${circleStyling}`}
            >
                <Success title="success" className="w-8 h-8" />
            </div>
        ) : isCurrentPage ? (
            <div
                aria-hidden="true"
                className={`bg-surface-info-subtle border-border-info border-2 ${circleStyling}`}
            >
                <Edit
                    aria-hidden
                    title="edit"
                    className="w-4 h-4 text-info-icon"
                />
            </div>
        ) : (
            <div
                aria-hidden="true"
                className={`border-2 border-border-strong text-text-subtle ${circleStyling}`}
            >
                {stepNumber}
            </div>
        )

    if (!isCompleted) {
        return (
            <div aria-current={isCurrentPage} className={`${stepStyling}`}>
                {circle}
                <BodyShort aria-hidden="true" as="span" size="small">
                    {title}
                </BodyShort>
            </div>
        )
    }

    return (
        <NextLink passHref href={`/steg/${stepNumber}`} legacyBehavior>
            <Link className={`${stepStyling}`}>
                {circle}
                <BodyShort as="span" size="small">
                    {title}
                </BodyShort>
            </Link>
        </NextLink>
    )
}

const Stepper = () => {
    const stepperRef = useRef<HTMLElement>(null)
    const { formatMessage } = useFeatureToggleIntl()
    const steps = [
        formatMessage("helse.title"),
        formatMessage("income.title"),
        formatMessage("work.title"),
        formatMessage("children.title"),
        formatMessage("result.stepTitle"),
    ]
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
