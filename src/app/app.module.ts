import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './template/header/header.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { FooterComponent } from './template/footer/footer.component';
import { LoginComponent } from './pages/component/login/login.component';
import { SidebarRightComponent } from './template/sidebar-right/sidebar-right.component';
import {GestionClientService} from '../services/gestionClient.service';
import {AuthGuardService} from '../services/auth-guard-service';
import {authentificationService} from '../services/authentification.service';
import {GestionClientComponent} from "./pages/component/gestion-client/gestion-client.component";
import {DetailClientMedComponent} from "./pages/component/detail-client-med/detail-client-med.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { StarterComponent } from './pages/component/starter/starter.component';
import {IdentityRevealedValidatorDirective} from "../services/identity-revealed.directive";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DataTablesModule} from "angular-datatables";
import { TableauDeBordAdminComponent } from './pages/component/tableau-de-bord-admin/tableau-de-bord-admin.component';
import {HttpInterceptorJwtService} from "../services/http-interceptor-jwt.service";
import {AgentGuardService} from "../services/agent-guard.service";
import {AdminGuardService} from "../services/admin-guard.service";
import {GestionHuissierComponent} from "./pages/component/gestion-huissier/gestion-huissier.component";
import {HuissieFormComponent} from "./pages/component/huissie-form/huissie-form.component";
import {GestionHuissierService} from "../services/gestion-huissier.service";
import {DashbordAdminService} from "../services/Dashboard-admin-service";
import {MEDFORMComponent} from "./pages/component/med-form/med-form.component";
import {NotificationDeMEDService} from "../services/notificationDeMEDService";

//import {MatButtonModule, MatCheckboxModule } from '@angular/cdk';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    SidebarRightComponent,
    GestionClientComponent,
    DetailClientMedComponent,
    HuissieFormComponent,
    GestionHuissierComponent,
    StarterComponent,
    IdentityRevealedValidatorDirective,
    TableauDeBordAdminComponent,
    MEDFORMComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
  // MatButtonModule, MatCheckboxModule,
    DataTablesModule,
    ToastrModule.forRoot({timeOut:3000,progressBar:true,progressAnimation:'increasing'}),
  ],
  providers: [
    authentificationService,
    AuthGuardService,
    AgentGuardService,
    AdminGuardService,
    GestionHuissierService,
    GestionClientService,
    DashbordAdminService,
    NotificationDeMEDService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorJwtService, multi: true}
    ,NgbModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
