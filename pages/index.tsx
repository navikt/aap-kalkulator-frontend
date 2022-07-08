import type { NextPage } from "next"
import { Calculator } from "@navikt/ds-icons"
import { BodyLong, Button, Heading } from "@navikt/ds-react"
import Divider from "../components/divider/Divider"
import Container from "../components/container/Container"
import { useRouter } from "next/router"
import {BreadcrumbsInterface} from "../components/breadcrumbs/breadcrumbsInterface";
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";

const crumbs: BreadcrumbsInterface[] = [
    { tittel: 'Inntekt', sti: "/steg/1", erKlikkbar: true, steg: 2, isChecked:false },
    { tittel: 'Arbeidsgrad', sti: "/steg/2", erKlikkbar: false, steg: 3, isChecked:false },
    { tittel: 'Barn', sti: "/steg/3", erKlikkbar: false, steg: 4, isChecked:false },
    { tittel: 'Resultat', sti: "/steg/4", erKlikkbar: false, steg: 5, isChecked:false },
]

const Home: NextPage = () => {
    const router = useRouter()
    const handleStart = async () => {
        await router.push("/steg/1")
    }
    return (
        <>
            <Breadcrumbs crumbs={crumbs} />
            <div className="flex flex-col items-center">
                <Calculator className="h-14 w-14 my-4" />
                <Heading
                    level="2"
                    size="large"
                    spacing
                    aria-label="Hvor mye kan jeg få?"
                >
                    Hvor mye kan jeg få?
                </Heading>
                <Divider />
            </div>
            <div className="flex flex-col items-center mt-4">
                <BodyLong spacing>
                    Lord Vader will provide us with the location of the Rebel
                    fortress by the time this station is operational. We will
                    then crush the Rebellion with one swift stroke. It looks
                    like Sandpeople did this, all right. Look, here are Gaffi
                    sticks, Bantha tracks.
                </BodyLong>
                <Button
                    onClick={handleStart}
                    className="w-20"
                    variant="primary"
                    aria-label="Start"
                >
                    Start
                </Button>
            </div>
        </>
    )
}

export default Home
