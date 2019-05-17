import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/index";
import {authentificationService} from "./authentification.service";

@Injectable({
  providedIn: 'root'
})
export class AgentGuardService implements CanActivate{

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    if (this.authService.isAgentRecouvrement()) {
      return true;
    } else {
      this.router.navigate(['']);
    }


  }


  constructor(private authService: authentificationService , private router: Router) {}

}
