import { StateInterface } from '../state/State';

export interface ResultInterface {
  resultat: number;
  personInfo: StateInterface;
  logs: Array<{ id: string; values?: Record<string, string | undefined> | undefined }>;
}

export class Result {
  resultat: number = 0;
  personInfo: StateInterface | undefined;
  logs: Array<{ id: string; values?: Record<string, string | undefined> | undefined }> = [];
  constructor(personInfo: StateInterface) {
    this.personInfo = personInfo;
  }
}
