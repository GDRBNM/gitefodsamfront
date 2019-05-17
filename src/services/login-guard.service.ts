import { Injectable } from '@angular/core';
import {Observable} from "rxjs/index";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {authentificationService} from "./authentification.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

  constructor(private authService: authentificationService , private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.loadToken()==null) {
      return true;
    } else {
      this.router.navigate(['']);
    }
  }


}
