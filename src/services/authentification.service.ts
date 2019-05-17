import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';





//car le service est injectable
@Injectable()

export class authentificationService{
  // l'adrsse de notre application dans la partie backend
  public host:string="http://localhost:8080";
  public jwtToken:string=null;
  private roles:Array<any>=null;
  //injection de http au service http client


  //retorne un object de type observable
  public getRessource(url){
    return this.http.get(this.host+url);
  }
  constructor(private  http:HttpClient){

  }
  //envoie de la requete a notre partie backend
  login(user){
    //ajout d'une option pour ne pas recuperer les donner au format JSON
    return this.http.post(this.host+"/login",user,{observe:'response'});
  }


  //enregistrement du token dans le local storage
  saveToken(jwt:string){
    this.jwtToken=jwt;
    localStorage.setItem('token',jwt);
    // acces au claims de notre jwt
    this.roles=JSON.parse(atob(this.jwtToken.replace("Bearer ","").split('.')[1])).roles;

    console.log(this.roles);
  }

  loadRoles(){
    if (this.jwtToken!=null){
      this.loadToken();
      this.roles=JSON.parse(atob(this.jwtToken.replace("Bearer ","").split('.')[1])).roles;

    }
  }
//chargement du token du local storage
  loadToken(){
   return this.jwtToken=localStorage.getItem('token');
  }

  //affichage de la liste des taches
  getTasks(){
    if (this.jwtToken==null)this.loadToken();
    return this.http.get(this.host+"/tasks",
      {headers:new HttpHeaders({'authorization':this.jwtToken})});
  }

  //supression du token
  logout(){
    this.jwtToken=null;
    localStorage.removeItem('token');
  }

  //verifier si on n'est admin
  isAdmin():boolean {
    this.loadRoles();
    if (this.roles == null) {
      return false;
    } else {
      for (let r of this.roles) {
        if (r.authority == 'ADMIN') return true;
      }
      return false;
    }
  }

  //verifier si on n'est Agent du recouvrement
  isAgentRecouvrement() {
    this.loadRoles();
    if (this.roles == null) {
      return false;
    } else {
      for (let r of this.roles) {
        if (r.authority == 'AGENT') return true;
      }
      return false;
    }
  }
  //verifier si on n'est Responsable recouvrement
  isResponsableRecouvrement(){
    this.loadRoles();
   if(this.roles==null){
     return false;
   }else {
     for (let r of this.roles){
       if (r.authority=='RESPONSABLE')return true;
     }
     return false;
   }
   }



}
