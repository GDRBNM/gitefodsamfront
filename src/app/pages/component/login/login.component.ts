import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {authentificationService} from "../../../../services/authentification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mode:number=0;
  //creation d'un object de type authentification authticationService qui sera injecter dans notre code
  constructor(public authService:authentificationService,private route:Router) {

  }

  ngOnInit() {

  }
  onLogin(user){
       console.log(user);

    this.authService.login(user)
    //enregistremnt en temps qu'observateur
    //si l'authentification marche
      .subscribe(resp=>{
          //recuperation du jwt
          let jwt =resp.headers.get('Authorization');
          console.log(jwt);
          this.authService.saveToken(jwt);

          //redirection
          this.route.navigate(['']);

        },

        err=>{
//le mode est initialiser en cas d'erreur
          this.mode=1;
        })
    console.log(user);
  }
}
