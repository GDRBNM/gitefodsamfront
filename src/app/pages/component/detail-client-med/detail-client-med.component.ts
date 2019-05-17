import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GestionClientService} from "../../../../services/gestionClient.service";

import {authentificationService} from "../../../../services/authentification.service";

@Component({
  selector: 'app-detail-client-med',
  templateUrl: './detail-client-med.component.html',
  styleUrls: ['./detail-client-med.component.css']
})
export class DetailClientMedComponent implements OnInit {
  // d: number = 2;
  notificationDeMiseEnDemeures:any;
  IDNMED:any;
  constructor(private authService: authentificationService, private route: ActivatedRoute, private router: Router, private clientService: GestionClientService) {
  }

  ngOnInit() {

    this.IDNMED = this.route.snapshot.params['id'];
    this.getDetailMIEDClient("/clients/"+this.IDNMED+"/notificationDeMiseEnDemeures");
  }

//liste des produit selctionner
  private getDetailMIEDClient(url) {
    this.clientService.getRessource(url)
      .subscribe(data=>{
          this.notificationDeMiseEnDemeures=data;
        },error2 => {
          console.log(error2);
        }
      )
  }
}

