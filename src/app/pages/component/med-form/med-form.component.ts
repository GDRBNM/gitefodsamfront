import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from "rxjs/index";
import {ToastrService} from "ngx-toastr";
import {GestionHuissierService} from "../../../../services/gestion-huissier.service";
import {NotificationDeMEDService} from "../../../../services/notificationDeMEDService";
import {HttpEventType, HttpResponse} from "@angular/common/http";

declare let $: any;

@Component({
  selector: 'app-med-form',
  templateUrl: './med-form.component.html',
  styleUrls: ['./med-form.component.css']
})

export class MEDFORMComponent implements OnInit {
  huissierSubscription :Subscription;
  Huissier:any;

  @Input()
  currentClient;
  private selectedFiles;
  private currentFileUpload;
  progress;
  constructor(private  huissierService :GestionHuissierService,private toastr:ToastrService,private notifMEDService:NotificationDeMEDService) { }

  ngOnInit() {

    this.listHuissier();

  }

  onAjouterNotif(MED) {
    console.log(MED);
    let med:any;
    med={
      "dateNotification": MED.dateNotification,
      "soldeNotification":MED.soldeNotification,
      "statusNotification": 0,
      "soldeInitiale": MED.soldeInitiale,
      "dateOctroie": MED.dateOctroie,
      "numeroCompte": MED.numeroCompte
    };
    console.log(this.currentClient);

    MED.huissier= parseInt(MED.huissier);

    this.notifMEDService.AjouterNotif(this.currentClient,MED.huissier,med).
    subscribe(resp=>{
        console.log(resp);

        this.toastr.info('Le PV a éte ajouter Avec succes!', "Ajouter un PV!");
        $('#responsive-modal').modal('toggle');

        /*
        *
        * enregistrement du fichier pdf
        *
        */


        this.progress=0;
        //recupere un fichier
        this.currentFileUpload=this.selectedFiles.item(0);

        //appel au service
        //on fait un subscribe
        this.notifMEDService.uploadDonneesPDF(this.currentFileUpload,resp)
          .subscribe(event=>{
//      console.log(resp)
            //  this.toastr.info('Le pdf du PV a éte ajouter Avec succes!', "Ajouter un PV PDF");
//information de la progression du fichier
            if (event.type===HttpEventType.UploadProgress){
              //envent.loaded ce le nombre d'octet uploader et le total l'octet total de la photo
              //this.progress=Math.round(100*event.loaded/event.total);
              //   console.log(this.progress)
            }else if(event instanceof HttpResponse){
//alert("Fin de telechargement");

              this.progress="";
            }
          },error2 => {
            console.log(error2);
          })




        /*
        *
        *
        * fin enregistrement du document
        *
        *
        * */










      },error2 => {
        console.log(error2);
//  this.toastr.error(error2.error.apierror.message +" "+ error2.error.apierror.debugMessage , 'Erreur');
      }
    )
  }

  private listHuissier() {
    this.huissierSubscription= this.huissierService.huissierSubject.subscribe((data)=>{
        this.Huissier=data;
      },error2 => {
      console.log(error2);
      }
    );
    this.huissierService.getHuissier();
    this.huissierService.emitHiussierSubject();
  }




  onSelectedFile(event) {
    //on selectionne les fichies qui ont ete selectionner
    //{} des fichier selectionner
    this.selectedFiles=event.target.files;

  }

}
