

import {Injectable} from '@angular/core';
import {authentificationService} from "./authentification.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class NotificationDeMEDService {


  constructor(private authService: authentificationService, private Http: HttpClient) {
  }

  AjouterNotif(client, huissier, MED, file:File) {

    return this.Http.post(this.authService.host + "/SaveMED?idClient=" + client.id + "&idHuissier=" + huissier + "&type=" + client.type + "&file=" + file, MED, {headers: new HttpHeaders({'authorization': this.authService.jwtToken})})


  }
}
