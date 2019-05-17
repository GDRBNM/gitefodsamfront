import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {authentificationService} from "./authentification.service";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorJwtService implements HttpInterceptor {

  constructor(private authService: authentificationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.headers.has('Authorization') && (this.authService.jwtToken != null)) {
      request = request.clone({setHeaders: {Authorization: this.authService.jwtToken}})
    }
    return next.handle(request);
  }
}
