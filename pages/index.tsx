import type { NextPage } from "next"
import { Calculator } from "@navikt/ds-icons"
import { BodyLong, Button, Heading } from "@navikt/ds-react"
import Divider from "../components/divider/Divider"
import Container from "../components/container/Container"
import { useRouter } from "next/router"
import {Breadcrumbs, Crumb} from "../components/breadcrumbs/Breadcrumbs";

const Home: NextPage = () => {
    const router = useRouter()
    const handleStart = async () => {
        await router.push("/steg/1")
    }
    return (
        <>
            <Breadcrumbs> <Crumb href={"/steg/2"}> hei </Crumb> </Breadcrumbs>
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
