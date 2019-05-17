
export class Client{

  public nom: string;
  public adresse: string;
  public email: string;
  public tel: number;
  public actif: boolean;

  constructor(nom: string,adresse: string,email: string,tel: number,actif: boolean) {

    this.nom=nom;this.adresse=adresse;this.email=email;this.tel=tel;this.actif=actif;
  }

//constructor(){}
}
