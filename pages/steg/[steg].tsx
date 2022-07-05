import { useRouter } from "next/router"
import Container from "../../components/container/Container"
import { Button, TextField } from "@navikt/ds-react"
import React, { useContext, useState } from "react"
import { ResultInterface } from "../../components/result/Result"
import { ResultState } from "../_app"
import Inntekt from "../../components/sporsmal/Inntekt"
import Barn from "../../components/sporsmal/Barn"

const Steg = () => {
    const router = useRouter()
    const { steg } = router.query
    const stegnummer = typeof steg === "string" ? parseInt(steg) : 1

    const sporsmal = [<Inntekt key={0} />, <Barn key={1} />]

    return sporsmal[stegnummer - 1]
}

export default Steg
