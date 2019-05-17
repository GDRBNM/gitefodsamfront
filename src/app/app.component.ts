import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {authentificationService} from "../services/authentification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService:authentificationService,private router:Router){

  }

  isAuthentificated(){
    return this.authService.loadToken()!=null;
  }
  onLogout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
