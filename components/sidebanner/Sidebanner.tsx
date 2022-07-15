import { Heading } from "@navikt/ds-react"

const Sidebanner = ({ tittel }: { tittel: string }) => {
    return (
        <header className="flex flex-col items-center justify-center h-14 bg-[#CCF1D6] border-b-[#06893A] border-solid border-b-4">
            <Heading size="medium" level="1" aria-label={tittel}>
                {tittel}
            </Heading>
        </header>
    )
}

export default Sidebanner