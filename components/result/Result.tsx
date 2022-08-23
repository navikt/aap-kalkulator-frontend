import { StateInterface } from "../state/State"
import React, { ReactElement } from "react"

export interface ResultInterface {
    resultat: number
    personInfo: StateInterface
    logs: Array<ReactElement>
}

export class Result {
    resultat: number = 0
    personInfo: StateInterface | undefined
    logs: Array<ReactElement> = []
    constructor(personInfo: StateInterface) {
        this.personInfo = personInfo
    }
}
