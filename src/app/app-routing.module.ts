import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./pages/component/login/login.component";
import {AuthGuardService} from "../services/auth-guard-service";
import {GestionClientComponent} from "./pages/component/gestion-client/gestion-client.component";
import {DetailClientMedComponent} from "./pages/component/detail-client-med/detail-client-med.component";
import {AdminGuardService} from "../services/admin-guard.service";
import {LoginGuardService} from "../services/login-guard.service";
import {StarterComponent} from "./pages/component/starter/starter.component";
import {AgentGuardService} from "../services/agent-guard.service";
import {TableauDeBordAdminComponent} from "./pages/component/tableau-de-bord-admin/tableau-de-bord-admin.component";
import {GestionHuissierComponent} from "./pages/component/gestion-huissier/gestion-huissier.component";
import {GestionMedComponent} from "./pages/component/gestion-med/gestion-med.component";

const routes: Routes = [
  {path:"login",component:LoginComponent,canActivate:[LoginGuardService]},
  { path:'clients',component:GestionClientComponent ,canActivate:[AuthGuardService,AgentGuardService]},
  {path:'clients/:id/notificationDeMiseEnDemeures',component:DetailClientMedComponent},
  {path:"TableauDeBordAdmin",component:TableauDeBordAdminComponent},
  {path:'TableauDeBord1',component:StarterComponent},
  {path:'med',component:GestionMedComponent},
  {path: '',component:StarterComponent,canActivate:[AuthGuardService]},
  {path:'huissiers',component:GestionHuissierComponent ,canActivate:[AuthGuardService,AgentGuardService]},
  {path:'**',redirectTo:'/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
