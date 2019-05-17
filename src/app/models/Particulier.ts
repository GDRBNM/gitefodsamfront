import {Client} from "./Client";

export class Particulier extends Client{

private _prenom:string;
  constructor(nom: string,adresse: string,email: string,tel: number,actif: boolean,prenom:string) {
    super(nom,adresse,email,tel,actif);
  this._prenom=prenom;
  }



  get prenom(): string {
    return this._prenom;
  }

  set prenom(value: string) {
    this._prenom = value;
  }
}

