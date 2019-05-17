

import {Injectable} from '@angular/core';
import {authentificationService} from "./authentification.service";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/index";

@Injectable()
export class NotificationDeMEDService {


  constructor(private authService: authentificationService, private Http: HttpClient) {
  }

  AjouterNotif(client, huissier, MED) {

    return this.Http.post(this.authService.host + "/SaveMED?idClient=" + client.id + "&idHuissier=" + huissier + "&type=" + client.type, MED, {headers: new HttpHeaders({'authorization': this.authService.jwtToken})})

  }

  uploadDonneesPDF(file: File, resp):Observable<HttpEvent<{}>> {
    let formadata:FormData =new FormData();
    //envoyer au serveur du fichier
    //le terme 'file' est le mm pour l'url du backend
    formadata.append('file',file);
    //envoie de formedata a notre url '/uploadPhoto'
    const  req=new HttpRequest('POST',this.authService.host+'/uploadPdf/'+resp.id,formadata,{
      //chargement de la progression
      reportProgress:true,
      //type de reponse http sous forme de text
      responseType:'text'
    });
    return this.Http.request(req);
  }

}
