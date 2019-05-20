

import {Injectable} from "@angular/core";
import {authentificationService} from "./authentification.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class GestionMed{

  constructor(private authService:authentificationService,private http:HttpClient){}


  getAllNotificationMED() {
    return this.http.get(this.authService.host+"/notificationDeMiseEnDemeures?size=5");
  }

  getParticularHuissierProperties(url){
    console.log(url);
   let urls:string;
   urls=url;
    return this.http.get(urls);
  }
}
