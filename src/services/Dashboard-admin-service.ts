
import {Injectable} from "@angular/core";
import {authentificationService} from "./authentification.service";

@Injectable()
export class DashbordAdminService{

  constructor(private AuthService:authentificationService){

  }

  getHealth(){
   return this.AuthService.getRessource("/actuator/health");
  }

  getHttpTrace(){
    return this.AuthService.getRessource("/actuator/httptrace");
  }
}
