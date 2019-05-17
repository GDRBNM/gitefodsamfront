

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpBackend} from '@angular/common/http';
import {authentificationService} from './authentification.service';
import { Observable } from 'rxjs';
import {Particulier} from "../app/models/Particulier";

@Injectable()
export class GestionClientService {

  private host: string = "http://localhost:8080";
private Particulier:Particulier[]=[];
  constructor(private authService: authentificationService, private http: HttpClient) {
  }

  /*
  * Afiichage de la liste des particulier
  *
  * */

  emitParticulier(){

  }

  getAllParticulier() {

    if (this.authService.jwtToken == null) this.authService.loadToken();

    return this.http.get(this.host+"/particuliers?size=5",{headers:new HttpHeaders({'authorization':this.authService.jwtToken})})

  }

  /*
* fin Afiichage de la liste des particulier
*
* */


  /*
  * Afiichage de la liste des Associations
  *
  * */

  getAllAssociation() {

    if (this.authService.jwtToken == null) this.authService.loadToken();

    return this.http.get(this.host+"/associations?size=5",{headers:new HttpHeaders({'authorization':this.authService.jwtToken})})

  }

  /*
* fin Afiichage de la liste des Associations
*
* */



  /*
* Afiichage du detail de la mise en demeure concernant un client
*
*/

  getDetailMIEDClient(id) {
    if (this.authService.jwtToken == null) this.authService.loadToken();
    return this.http.get(this.host+"/clients/"+id,{headers:new HttpHeaders({'authorization':this.authService.jwtToken})});

  }

  /*
  * fin Afiichage de la liste des particulier
  *
  * */


  //retorne un object de type observable
  public getRessource(url){
    return this.http.get(this.host+url);
  }

  /*
  *  Enregistrement d'un client
  *
  * */

/*
  SaveClient(client,typeClient){

    if (typeClient==="particulier"){

      return this.http.post(this.host+"/particuliers",client,{headers:new HttpHeaders({'authorization':this.authService.jwtToken})});
    }else if (typeClient==="association"){
      return this.http.post(this.host+"/associations",client,{headers:new HttpHeaders({'authorization':this.authService.jwtToken})});

    }else if (typeClient==="entreprise"){
      return this.http.post(this.host+"/entreprises",client,{headers:new HttpHeaders({'authorization':this.authService.jwtToken})});

    }else if (typeClient==="partiePolitique"){
      return this.http.post(this.host+"/partiPolitiques",client,{headers:new HttpHeaders({'authorization':this.authService.jwtToken})});

    }

  }
  */
  UpdateChangementStatusClients(p){
    return this.http.put(this.host+"/clients/"+p.id,p,{headers:new HttpHeaders({'authorization':this.authService.jwtToken})})
  }
    SaveClient(client,typeClient,update){
      if (typeClient==="association" && update===""){
        client.actif=true;
        return this.http.post(this.host+"/associations",client,{headers:new HttpHeaders({'authorization':this.authService.jwtToken})});

      }else if (typeClient==="association" && update==="update"){
        return this.http.put(this.host+"/associations/"+client.id,client,{headers:new HttpHeaders({'authorization':this.authService.jwtToken})});
      }
      if (typeClient==="particulier" &&update=="" ){
        client.actif=true;
        return this.http.post(this.host+"/particuliers",client,{headers:new HttpHeaders({'authorization':this.authService.jwtToken})});
      }
      else if (typeClient==="particulier" &&update=="update"){
        return this.http.put(this.host+"/particuliers/"+client.id,client,{headers:new HttpHeaders({'authorization':this.authService.jwtToken})});
      }


      if  (typeClient==="entreprise" && update==""){
        client.actif=true;
        return this.http.post(this.host+"/entreprises",client,{headers:new HttpHeaders({'authorization':this.authService.jwtToken})});

      }else if (typeClient==="entreprise" && update=="update"){
        console.log(client);
        return this.http.put(this.host+"/entreprises/"+client.id,client,{headers:new HttpHeaders({'authorization':this.authService.jwtToken})});

      }

      if (typeClient==="partiePolitique" && update==""){
        client.actif=true;
        return this.http.post(this.host+"/partiPolitiques",client,{headers:new HttpHeaders({'authorization':this.authService.jwtToken})});

      }else if(typeClient==="partiePolitique" && update=="update"){
        return this.http.put(this.host+"/partiPolitiques/"+client.id,client,{headers:new HttpHeaders({'authorization':this.authService.jwtToken})});

      }
    }

  /*
  *
  *
  *
  * */
  getAllEntreprises() {
    if (this.authService.jwtToken == null) this.authService.loadToken();

    return this.http.get(this.host+"/entreprises?size=5",{headers:new HttpHeaders({'authorization':this.authService.jwtToken})})

  }

  getAllPartiPolitique() {
    if (this.authService.jwtToken == null) this.authService.loadToken();

    return this.http.get(this.host+"/partiPolitiques?size=5",{headers:new HttpHeaders({'authorization':this.authService.jwtToken})})

  }


  SearchParticulier(r: any) {
    return this.http.get(this.host+"/particuliers/search/findByNomContainsOrPrenomContainsOrEmailContainsOrTelContains?nom="+r+"&prenom="+r+"&email="+r+"&tel="+r+"&size=5",
      {headers:new HttpHeaders({'authorization':this.authService.jwtToken})})
  }
  SearchAssociation(r: any) {
    return this.http.get(this.host+"/associations/search/findByNomContainsOrRecepisseContainsOrAdresseContainsOrEmailContainsOrTelContains?nom="+r+"&recepisse="+r+"&email="+r+"&tel="+r+"&adresse="+r+"&size=5",
      {headers:new HttpHeaders({'authorization':this.authService.jwtToken})})
  }


  SearchEntreprises(r: any) {
    return this.http.get(this.host+"/entreprises/search/findByNomContainsOrRaisonSocialeContainsOrAdresseContainsOrEmailContainsOrTelContainsOrNumeroContains?nom="+r+"&raisonSociale="+r+"&email="+r+"&tel="+r+"&adresse="+r+"&numero="+r+"&size=5",
      {headers:new HttpHeaders({'authorization':this.authService.jwtToken})})

  }

  SearchPartiePolitique(r: any) {
    return this.http.get(this.host+"/partiPolitiques/search/findByNomContainsOrIdPartieContainsOrAdresseContainsOrEmailContainsOrTelContains?nom="+r+"&idPartie="+r+"&email="+r+"&tel="+r+"&adresse="+r+"&size=5",
      {headers:new HttpHeaders({'authorization':this.authService.jwtToken})});
  }

    Pagination(page: any) {
    return  this.http.get(page,{headers:new HttpHeaders({'authorization':this.authService.jwtToken})});
  }

}
