import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from "rxjs/index";
import {ToastrService} from "ngx-toastr";
import {GestionHuissierService} from "../../../../services/gestion-huissier.service";
import {NotificationDeMEDService} from "../../../../services/notificationDeMEDService";

declare var $: any;

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

  constructor(private  huissierService :GestionHuissierService,private toastr:ToastrService,private notifMEDService:NotificationDeMEDService) { }

  ngOnInit() {

    this.listHuissier();

  }

  onAjouterNotif(MED) {
console.log(MED);
let med:any={};
med={
  "dateNotification": MED.dateNotification,
  "soldeNotification":MED.soldeNotification,
  "statusNotification": 0,
  "soldeInitiale": MED.soldeInitiale,
  "dateOctroie": MED.dateOctroie,
  "numeroCompte": MED.numeroCompte
}
console.log(this.currentClient);

MED.huissier= parseInt(MED.huissier);
let fichier:File=MED.file;
this.notifMEDService.AjouterNotif(this.currentClient,MED.huissier,med,fichier).
subscribe(resp=>{
  console.log(resp);
    this.toastr.info('Le PV a éte ajouter Avec succes!', "Ajouter un PV!");
    $('#responsive-modal').modal('toggle');

},error2 => {
  console.log(error2);
//  this.toastr.error(error2.error.apierror.message +" "+ error2.error.apierror.debugMessage , 'Erreur');
  }
)
  }

  private listHuissier() {
    this.huissierSubscription= this.huissierService.huissierSubject.subscribe((data)=>{
      this.Huissier=data;
    }
    )
    this.huissierService.getHuissier();
    this.huissierService.emitHiussierSubject();
  }




  onSelectedFile(event) {
    //on selectionne les fichies qui ont ete selectionner
    //{} des fichier selectionner
    this.selectedFiles=event.target.files;

  }

}
