import { Component, OnInit } from '@angular/core';
import {DashbordAdminService} from "../../../../services/Dashboard-admin-service";

@Component({
  selector: 'app-tableau-de-bord-admin',
  templateUrl: './tableau-de-bord-admin.component.html',
  styleUrls: ['./tableau-de-bord-admin.component.css']
})
export class TableauDeBordAdminComponent implements OnInit {

  constructor(private AdminService:DashbordAdminService) { }
  Health:any;
  TotalSpace:number;
  FreeSpace:number;
  PourcentageFreeSpace:number;
  PourcentageFreeSpaceLabel:number;
  NomBaseDeDonnee:string;
  HttpTrace:any;
  TableauDeTraceHttp:any=[];
  ngOnInit() {
    // la sante de l'environement
    this.getHealth();
    //httpTrace
    this.getHttpTrace();
  }

  getHealth() {
    this.AdminService.getHealth().
    subscribe(resp=>{
        this.Health=resp;
        this.getToaltalSpace(this.Health);
        this.getFreeSpace(this.Health);
        this.getSpacePourcentage();
        this.getDataBaseName(this.Health);
        console.log(resp);
      },error=>{
        console.log(error);
      }
    )
  }

  getToaltalSpace(Health){
    this.TotalSpace=this.Health.details.diskSpace.details.total/1000000000;
  }

  private getFreeSpace(FreeSpace: number) {
    this.FreeSpace=this.Health.details.diskSpace.details.free/1000000000;
  }


  private getSpacePourcentage() {
    this.PourcentageFreeSpace=Math.round(((this.TotalSpace-this.FreeSpace)*100)/this.TotalSpace);
   this.PourcentageFreeSpaceLabel= Math.round(this.PourcentageFreeSpace);
    console.log(this.PourcentageFreeSpace);
  let valeur=5;
    for (let i=0;i<=100;i=i+5){
    //console.log(i);
  if (this.PourcentageFreeSpace>=i && this.PourcentageFreeSpace<=valeur){
    this.PourcentageFreeSpace=i;
  }else {
    if (valeur>=100){
      valeur=100;
      //console.log(valeur);
      break;
    }else {
      valeur=valeur+5;
      //console.log(valeur);
    }

    }
    }

  }

  private getDataBaseName(Health) {
    this.NomBaseDeDonnee=this.Health.details.db.details.database;
  }

  private getHttpTrace() {
    this.AdminService.getHttpTrace()
      .subscribe(resp=>{
        this.HttpTrace=resp;
       // console.log(resp);
      //  console.log(this.HttpTrace.traces.length);
        this.creationTableauTrace(this.HttpTrace.traces.length);
      })
  }

  private creationTableauTrace(length) {
    for (var i=0;i<=length-1;i++){

      this.TableauDeTraceHttp.push(this.HttpTrace.traces[i]);

    }
    console.log(this.TableauDeTraceHttp);
  }
}
