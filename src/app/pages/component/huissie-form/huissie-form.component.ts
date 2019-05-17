import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {invalid} from "@angular/compiler/src/render3/view/util";
import {GestionHuissierService} from 'src/services/gestion-huissier.service';
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {Huissier} from "../../../models/Huissier";

declare var $: any;

@Component({
  selector: 'app-huissie-form',
  templateUrl: './huissie-form.component.html',
  styleUrls: ['./huissie-form.component.css'],
})
export class HuissieFormComponent implements OnInit, OnDestroy {
  huissierForm: FormGroup;
  @Input()
  curentHuissier: Observable<Huissier>;
  huissier = {id: null, nom: "", prenom: "", email: "", tel: "", adresse: ""};
  @Input()
  operation: string = "Ajouer";

  constructor(private  formbulder: FormBuilder,
              private huissierService: GestionHuissierService, private toastr: ToastrService,) {
  }

  get nom() {
    return this.huissierForm.get('nom')
  }

  get prenom() {
    return this.huissierForm.get('prenom')
  }

  get adresse() {
    return this.huissierForm.get('adresse')
  }

  get email() {
    return this.huissierForm.get('email')
  }

  get tel() {
    return this.huissierForm.get('tel')
  }

  ngOnDestroy(): void {

  }

  ngOnInit() {
    this.curentHuissier.subscribe(huissier => {
      this.huissier = huissier;
      this.huissier = new Huissier(huissier.id, huissier.nom,
        huissier.prenom, huissier.adresse, huissier.email, huissier.tel, huissier.active);
    })
    this.initForm();
  }

  initForm() {
    this.huissierForm = this.formbulder.group(
      {
        'nom': new FormControl(this.huissier.nom, [Validators.required, Validators.pattern('[a-zA-Z]*')]),
        'prenom': new FormControl(this.huissier.prenom, [Validators.required, Validators.pattern('[a-zA-Z]+')]),
        'email': new FormControl(this.huissier.email, [Validators.nullValidator, Validators.email]),
        'tel': new FormControl(this.huissier.tel, [Validators.required, Validators.minLength(8), Validators.pattern('[0-9]+')]),
        'adresse': new FormControl(this.huissier.adresse)
      })

  }

  onSubmitFrom() {
    if (this.huissierForm.invalid) {
      this.toastr.error("le formulaire est invalide")
    } else {
      const formValuer = this.huissierForm.value;
      if (this.operation == "Ajouter") {
        console.log(formValuer);
        const huissier = formValuer;
        huissier.active = true;
        if (this.huissierService.addHuissier(huissier)) {
          this.toastr.info('Huissier ajouter Avec succes!', "Ajouter d'un huisier!");
          $('#responsive-modal').modal('toggle');
          this.huissier = {id: null, nom: "", prenom: "", email: "", tel: "", adresse: ""};
          this.initForm();
          this.huissier = {id: null, nom: "", prenom: "", email: "", tel: "", adresse: ""};
        } else {
          this.toastr.error('une erreur se produite lors de l ajout de l huissier!', "Ajouter d'un huisier!");
        }

      } else if (this.operation == "Modifier") {
        const huissier = formValuer;
        huissier.id = this.huissier.id;
        console.log(huissier);

        if (this.huissierService.updateHuissier(huissier)) {
          this.toastr.info('Huissier Modifier Avec Succes!', 'Modifier Huissier!');
          $('#responsive-modal').modal('toggle');

        } else {
          this.toastr.error("une erreur se produit l'or de la Modification de l'Huissier !", "Modifier  huisier!");

        }
        this.huissier = {id: null, nom: "", prenom: "", email: "", tel: "", adresse: ""};
      }


    }

  }
}
