import { Component, OnInit } from '@angular/core';
import {GestionMed} from "../../../../services/gestion-med";
import {ToastrService} from "ngx-toastr";
import {GestionClientService} from "../../../../services/gestionClient.service";

@Component({
  selector: 'app-gestion-med',
  templateUrl: './gestion-med.component.html',
  styleUrls: ['./gestion-med.component.css']
})
export class GestionMedComponent implements OnInit {
  notificationDeMiseEnDemeures:any;

  //pdfSrc: string =  "D:\\admin_sys\\PFE\\FrontEndAngular\\SGDRFRONT\\src\\assets\\INTRODUCTION_SPRING_MVC.pdf";

  constructor( private gestionNotifService:GestionMed,private toastr:ToastrService,private clientService:GestionClientService) { }

  ngOnInit() {
    this.listNotificationDeMED();
//this.getHuissierProperties(this.notificationDeMiseEnDemeures,"k")
  }

  private listNotificationDeMED() {
    this.gestionNotifService.getAllNotificationMED().
    subscribe(resp=>{
      this.notificationDeMiseEnDemeures=resp;
    },error2 => {
console.log(error2);

      }

    )
  }

  getPage(page){
    this.clientService.Pagination(page)
      .subscribe(resp=>{
        this.notificationDeMiseEnDemeures=resp;
      })
  }

}
