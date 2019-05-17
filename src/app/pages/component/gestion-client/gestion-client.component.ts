import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {authentificationService} from "../../../../services/authentification.service";
import {HttpClient} from "@angular/common/http";
import {GestionClientService} from "../../../../services/gestionClient.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Subscription} from "rxjs/index";
declare var $;
@Component({
  selector: 'app-gestion-client',
  templateUrl: './gestion-client.component.html',
  styleUrls: ['./gestion-client.component.css']
})
export class GestionClientComponent implements OnInit {
  @ViewChild('datatable') table:ElementRef;
  datatable:any;
  particuliers;
  associations;
  entreprises;
  partiPolitiques;
  activationFormePaticulier:boolean=false;
  activationFormeAssociation:boolean=false;
  activationFormeEntreprise:boolean=false;
  activationFormePartiePolitique:boolean=false;
  typeClient:string;
  update:string;
  id:string; Nom:string;Prenom:string;Adresse:string;Telephone:string;Email:string;
  Recepisse:string;RaisonSociale:string;  IdPartie: string;NumClient:string;
  ActivationChampId:boolean=false;
  //variable pour les messsage de succes
  mode:number;
  Actif:string="vrais";
  closeResult: string;
  ParticulierRecherche:string;
  AssociationRecherche:string;
  EntrepriseRecherche:string;
  PartiePolitiqueRecherche:string;
  Tabulation:any="particulier";
  /*
  * pour les tabs
  */
  pa:boolean;
  ass:boolean;
  entre:boolean;
  partiepoli:boolean;
  private currentClientStatus: boolean=true;
   currentClient: any;
  /*
  *
  * fin pour les tabs
  * */
  constructor(private modalService: NgbModal,private toaster:ToastrService,private router:Router,private authService:authentificationService,private http:HttpClient,private clientService:GestionClientService) {}
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  Allparticulier(){
    this.clientService.getAllParticulier()
      .subscribe(data=>{
          this.particuliers=data;
          console.log(data);
        },
        //en cas d'erreur
        error2 => {
          this.authService.logout();
          console.log(error2);
          this.router.navigateByUrl("/login");
        }
      )
  }
  Allassociations(){
    this.clientService.getAllAssociation()
      .subscribe(data=>{
          this.associations=data;
        },
        error2 => {
          this.authService.logout();
          console.log(error2);
          this.router.navigateByUrl("/login");
        }
      )

  }
  AllEntreprises(){
    this.clientService.getAllEntreprises()
      .subscribe(data=>{
          this.entreprises=data;
        },
        error2 => {
          this.authService.logout();
          console.log(error2);
          this.router.navigateByUrl("/login");
        }
      )


  }

  AllPartiePolitique(){
    this.clientService.getAllPartiPolitique()
      .subscribe(data=>{
          this.partiPolitiques=data;
        },
        error2 => {
          this.authService.logout();
          console.log(error2);
          this.router.navigateByUrl("/login");
        }
      )

  }
  ngOnInit() {

    //liste des particuliers
    this.Allparticulier();
    //liste des associations
this.Allassociations();

    //liste des entreprises
this.AllEntreprises();
    //liste des paties politiques
this.AllPartiePolitique();
  }



/*
* gestion des tabs
*
*/
  tab(chaine) {
  if(chaine==="particulier"){
    this.pa=true;
    this.ass=false;
    this.entre=false;
    this.partiepoli=false;
  }else if(chaine==="association"){
    this.ass=true;
    this.pa=false;
    this.entre=false;
    this.partiepoli=false;
  }else if(chaine==="entreprise"){
    this.pa=false;
    this.ass=false;
    this.entre=true;
    this.partiepoli=false;
  }else if (chaine==="partie"){
    this.pa=false;
    this.ass=false;
    this.entre=false;
    this.partiepoli=true;
  }
  }
  /*
  * fin gestion des tabs
  *
  */

  getParticulierNotificationMiseEndemeure(id) {
    this.router.navigateByUrl("/clients/"+id+"/notificationDeMiseEnDemeures");
  }

  MakeAllActivationFormeFalse(){
    this.activationFormePaticulier=false;
    this.activationFormeAssociation=false;
    this.activationFormeEntreprise=false;
    this.activationFormePartiePolitique=false;
    this.ActivationChampId=false;
  }

  ActivationFormePaticulier(typeclient) {
    this.VidageChamp();
    this.update="";
    this.MakeAllActivationFormeFalse();
    this.activationFormePaticulier=true;
    console.log(typeclient);
    this.typeClient=typeclient;
    this.mode=null;
  }


  ActivationFormePaticulierUpdate(typeclient,p){
    this.update="update";
    this.MakeAllActivationFormeFalse();
    this.currentClientStatus=p.actif;
    this.ActivationChampId=true;
    this.activationFormePaticulier=true;
    console.log(typeclient);
    this.typeClient=typeclient;
    this.mode=null;
    this.Nom=p.nom;
    this.Prenom=p.prenom;
    this.Email=p.email;
    this.Telephone=p.tel;
    this.Adresse=p.adresse;
    this.id=p.id;
    this.NumClient=p.numClient;
  }

  ActivationFormeAssociationUpdate(typeclient,p){
    this.update="update";
    this.currentClientStatus=p.actif;
    this.ActivationFormeAssociation(typeclient);
    this.ActivationChampId=true;
    this.Nom=p.nom;
    this.Recepisse=p.recepisse;
    this.Email=p.email;
    this.Telephone=p.tel;
    this.Adresse=p.adresse;
    this.id=p.id;
    this.NumClient=p.numClient;
  }



  ActivationFormeAssociation(typeclient){
    this.MakeAllActivationFormeFalse();
    this.VidageChamp();
    this.update="";
    this.activationFormeAssociation=true;
    console.log(typeclient);
    this.typeClient=typeclient;
    this.mode=null;
  }

  ActivationFormeEntreprise(typeclient){
    this.MakeAllActivationFormeFalse();
    this.update="";
    this.activationFormeEntreprise=true;
    console.log(typeclient);
    this.typeClient=typeclient;
    this.mode=null;
  }

  ActivationFormeEntrepriseUpdate(typeclient,p){
    this.update="update";
    this.ActivationFormeEntreprise(typeclient);
    this.ActivationChampId=true;
    this.Nom=p.nom;
    this.Email=p.email;
    this.Telephone=p.tel;
    this.Adresse=p.adresse;
    this.id=p.id;
    this.RaisonSociale=p.raisonSociale;

    this.currentClientStatus=p.actif;
    console.log(p.actif);
  }


  ActivationFormePartiePolitique(typeclient){
    this.MakeAllActivationFormeFalse();
    this.update="";
    this.activationFormePartiePolitique=true;
    console.log(typeclient);
    this.typeClient=typeclient;
    this.mode=null;
  }

  ActivationFormePartiePolitiqueUpdate(typeclient,p){
    this.update="update";
    //console.log(this.ActivationChampId);
    this.ActivationFormePartiePolitique(typeclient);
    this.ActivationChampId=true;
    this.Nom=p.nom;
    this.Email=p.email;
    this.Telephone=p.tel;
    this.Adresse=p.adresse;
    this.id=p.id;
    this.IdPartie=p.idPartie;

    this.currentClientStatus=p.actif;
    console.log(p.actif);
    this.NumClient=p.numClient;
  }


  zte(){
    return true;
  }

  VidageChamp(){
    this.Nom="";
    this.Prenom="";
    this.Email="";
    this.Telephone="";
    this.Adresse="";
    this.id="";
    this.Recepisse="";
    this.RaisonSociale="";
    this.IdPartie="";
    this.NumClient="";
  }
  onSaveClient(client) {
    console.log(client);
//this.VidageChamp();
    console.log(this.typeClient);
    client.actif=this.currentClientStatus;
    console.log(client);
    if(this.typeClient==="particulier"){
      //this.clientService.SaveClient(client,this.typeClient,this.update)

      this.clientService.SaveClient(client,this.typeClient,this.update)
        .subscribe(resp=>{
            this.VidageChamp();
            let message:string="modifié";
            if (this.update==""){
              message="Ajouté";
            }
          this.toaster.info('Ce particulier a été '+message+ ' avec succes', 'Particulier');

          this.Allparticulier();
          this.modalService.dismissAll();
            console.log(resp);
          //liste des particuliers
          },error2 => {
          console.log(error2.error.apierror.message);

          //console.log(error.apierror.message);
          //console.log(error.apierror.message);
          this.toaster.error(error2.error.apierror.message +" "+ error2.error.apierror.debugMessage , 'Particulier');
            console.log(error2);
          }
        )
    }


    else if(this.typeClient==="association"){
      //this.clientService.SaveClient(client,this.typeClient,this.update)
      console.log(this.update);

      this.clientService.SaveClient(client,this.typeClient,this.update)
        .subscribe(resp=>{
            this.VidageChamp();
            console.log(resp);
          let message:string="modifié";
          if (this.update==""){
            message="Ajouté";
          }
          this.toaster.info('Cet Association a été '+message+ ' avec succes', 'Association');
          this.Allassociations();
          this.modalService.dismissAll();
          },error2 => {
          this.toaster.error('Erreur'+error2.error.apierror.message +" "+ error2.error.apierror.debugMessage, 'Association');
            console.log("Erreur dans survenue sur l'enregistrement de l'association"+error2);
          }
        )
    }

    else if(this.typeClient==="entreprise"){
      //this.clientService.SaveClient(client,this.typeClient,this.update)
      this.clientService.SaveClient(client,this.typeClient,this.update)
        .subscribe(resp=>{
            this.VidageChamp();
            console.log(resp);
          let message:string="modifié";
          if (this.update==""){
            message="Ajouté";
          }
          this.toaster.info('Cet Entreprise a été '+message+ ' avec succes', 'Entreprise');

          this.AllEntreprises();
            this.modalService.dismissAll();

          },error2 => {
          this.toaster.info('Erreur'+error2.error.apierror.message +" "+ error2.error.apierror.debugMessage, 'Entreprise');
            console.log(error2);
          }
        )
    }
    else if(this.typeClient==="partiePolitique"){
      //this.clientService.SaveClient(client,this.typeClient,this.update)
      this.clientService.SaveClient(client,this.typeClient,this.update)
        .subscribe(resp=>{
            this.VidageChamp();
            console.log(resp);
          let message:string="modifié";
          if (this.update==""){
            message="Ajouté";
          }
          this.toaster.info('Ce Partie politique a été '+message+ ' avec succes', 'Partie politique');


            this.AllPartiePolitique();
          this.modalService.dismissAll();
          },error2 => {
          this.toaster.info('Erreur'+error2.error.apierror.message +" "+ error2.error.apierror.debugMessage, 'Partie politique');
            console.log(error2);
          }
        )
    }



  }

  OnUpdateChangementStatusClients(p) {

    if(p.actif==true){
       p.actif=false;
    }else {p.actif=true;}
    this.clientService.UpdateChangementStatusClients(p)
      .subscribe(resp=>{
        this.toaster.info("le status de ce client a été modifier avec succes ","Modification status");
console.log(resp);
        },
        error2 => {
      this.toaster.error("erreur survenue lors de la modification du status du client"+error2.error.apierror.message +" "+ error2.error.apierror.debugMessage,"Modification status");
        }
      )
}

  OnSearchParticulier(Recherche){
    Recherche=Recherche.toLowerCase();
    this.clientService.SearchParticulier(Recherche)
      .subscribe(resp=>{
        this.particuliers=resp;
      }

      )
  }

  OnSearchAssociation(AssociationRecherche: String) {
    //AssociationRecherche=AssociationRecherche.toLowerCase();
    this.clientService.SearchAssociation(AssociationRecherche)
      .subscribe(resp=>{
        this.associations=resp;
      })

  }
  OnSearchEntreprise(EntrepriseRecherche){
    EntrepriseRecherche=EntrepriseRecherche.toLowerCase();
    this.clientService.SearchEntreprises(EntrepriseRecherche)
      .subscribe(resp=>{
        this.entreprises=resp;
      })

  }

  OnSearchPartiePolitique(PartieRecherche){
    PartieRecherche=PartieRecherche.toLowerCase();
    this.clientService.SearchPartiePolitique(PartieRecherche)
      .subscribe(resp=>{
        this.partiPolitiques=resp;
      })

  }

  /*
  *
  *     Methode pour la pagination
  *
  */
  getPage(page){
    this.clientService.Pagination(page)
      .subscribe(resp=>{
        this.particuliers=resp;
      })
  }
  getPageAssociation(page){
    this.clientService.Pagination(page)
      .subscribe(resp=>{
        this.associations=resp;
      })
  }

  getPageEntreprises(page) {
    this.clientService.Pagination(page)
      .subscribe(resp=>{
        this.entreprises=resp;
      })

  }
  getPagePartiePolitique(page) {
    this.clientService.Pagination(page)
      .subscribe(resp=>{
        this.partiPolitiques=resp;
      })

  }

  /*
  *
  *  fin    Methode pour la pagination
  *
  */

  onSelected(p) {
  this.currentClient=p;
}
}
