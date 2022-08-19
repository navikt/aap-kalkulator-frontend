import { StateInterface } from "../state/State"
import React from "react";

export interface ResultInterface {
    resultat: number
    personInfo: StateInterface
    logs: Array<string>
}

export class Result {
    resultat: number = 0;
    personInfo: StateInterface | undefined;
    logs: Array<string> = [];
    constructor(personInfo: StateInterface) {
        this.personInfo = personInfo
    }
}
