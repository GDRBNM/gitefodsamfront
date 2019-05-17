import {ChangeDetectorRef, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Subject } from 'rxjs';
import {ChangeDetection} from "@angular/cli/lib/config/schema";
import {authentificationService} from "./authentification.service";

@Injectable({
  providedIn: 'root'
})
export class GestionHuissierService {
  public host: string = "http://localhost:8080/huissiers";
  private isDone:boolean=true;

 private huissiers;

 huissierSubject=new Subject();

   constructor(private http: HttpClient ,private authService:authentificationService) {
   }


  emitHiussierSubject(){
    this.huissierSubject.next(this.huissiers);
  }

  /**
   *recuper la liste des huissier 
   **/


  getHuissier(){
     this.http.get(this.host+'?size=5',{headers:new HttpHeaders({'authorization':this.authService.jwtToken})})
       .subscribe(data=>{
        this.huissiers=data;
        this.emitHiussierSubject();
    },err=>{});
  }

  /**
   * @param huissier 
   * ajoute un huissier
   */
  addHuissier(huissier){
    this.http.post(this.host,huissier)
      .subscribe(success=> {
        this.isDone=true;
      this.getHuissier();

    },err=>{
      this.isDone=false;

    });
  return this.isDone;
}
/*
* met a jour les donnees d'un huissier
* */

 updateHuissier(huissier){
    console.log(huissier);
    this.http.put(this.host+'/'+huissier.id,huissier,{headers:new HttpHeaders({'authorization':this.authService.jwtToken})})
      .subscribe(data=>{
      this.getHuissier();
      this.isDone=true;
    },error1 => {
      this.isDone=false;
    });
   return this.isDone;
 }

 /*
 * desactive un huissier
 * */
 deleteHuissier(huissier){
   this.http.delete(this.host+'/'+huissier.id,{headers:new HttpHeaders({'authorization':this.authService.jwtToken})})
     .subscribe(succes=>{
     this.isDone=true;
   },err=>{
     this.isDone=false;
   });
   this.getHuissier();
   return this.isDone;
 }

  /**
   *
   * @param key
   * recupere la liste des huissier dont
   * le ou prenom ou tel contient le mots key
   */
  geHuissierNameContainsKey(key:string){
     this.http.get(this.host + '/' + 'search/findByNomContainsOrPrenomContainsOrTelContainsOrEmailContains'
       + '?' + 'nom=' + key + '&prenom=' + key + '&tel=' + key +'&email='+key+ '&size=5',
       {headers:new HttpHeaders({'authorization':this.authService.jwtToken})})
       .subscribe(data => {
       this.huissiers = data;
       this.emitHiussierSubject();
     })
}

/*
*recuper la liste des huissier par page
*
*/
getDataByPage(url){
   this.http.get(url).subscribe(data=>{
   this.huissiers=data;
   this.emitHiussierSubject()
   })
}


}
