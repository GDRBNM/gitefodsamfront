import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Huissier} from "../../../models/Huissier";
import {GestionHuissierService} from "../../../../services/gestion-huissier.service";
import {authentificationService} from "../../../../services/authentification.service";

@Component({
  selector: 'app-gestion-huissier',
  templateUrl: './gestion-huissier.component.html',
  styleUrls: ['./gestion-huissier.component.css'],
})
export class GestionHuissierComponent implements OnInit,OnDestroy{
 huissiers;
 huissierSubscription :Subscription;
 operation:string="Ajouter";
 hussierSuject:Subject<Huissier>=new  Subject();
  motClet:string= "";
  currentPage:0;
  totalPage: 0;
   closeResult: string;
 private currentHuissier:Huissier={id:null,nom:"",prenom:"",email:"",tel:"",adresse:"",active:true}

  constructor(private  huissierService :GestionHuissierService
              ,private toastr:ToastrService,private auth:authentificationService,private mds:NgbModal) { }

  ngOnInit() {
   this.huissierSubscription= this.huissierService.huissierSubject.subscribe((data)=>{
      this.huissiers=data;
    })
    this.huissierService.emitHiussierSubject();
    this.huissierService.getHuissier();
    this.emit()
  }
  ngOnDestroy(){
    this.huissierSubscription.unsubscribe();
  }

  
  onShow(){}
  onDelete(){
    console.log(this.currentHuissier)
    if(this.currentHuissier.active){
    if(this.huissierService.deleteHuissier(this.currentHuissier)){
      this.toastr.info("HUISSIER DESACTIVER AVEC SUCCES","SUPRESSION")
    }
    }
  }

  onUpdate(huissier:Huissier){
    this.currentHuissier=huissier;
    this.operation="Modifier"
    this.emit();
    console.log(huissier);
  };

  onAjouter() {
    this.operation="Ajouter"
    this.currentHuissier={id:null,nom:"",prenom:"",email:"",tel:"",adresse:"",active:true};
    this.emit();


  }

  Onchose(h) {
    this.currentHuissier=h;
  }

  emit(){
    this.hussierSuject.next(this.currentHuissier);
  }

  Onsearch(motClet: string) {
    this.huissierService.geHuissierNameContainsKey(motClet.toLocaleLowerCase());
  }

  getPage(url:string) {
    console.log(url);
    this.huissierService.getDataByPage(url);
  }

  onStatus(h) {
    if(h.active){
      h.active=false;
      if(this.huissierService.updateHuissier(h)){
        this.toastr.info("staus modifier avec succes",'modifier status')
      }else {
        this.toastr.error("staus modifier avec succes",'modifier status')
      }
  }else{
    h.active=true;
      if(this.huissierService.updateHuissier(h)){
        this.toastr.info("staus modifier avec succes",'modifier status')
      }else {
        this.toastr.error("staus modifier avec succes",'modifier status')
      }
    }
  }



}
