import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {authentificationService} from './authentification.service';
import {Observable} from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private authService: authentificationService , private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.loadToken() != null) {
      return true;
    } else {
      this.router.navigate(['login']);
    }
  }


}
