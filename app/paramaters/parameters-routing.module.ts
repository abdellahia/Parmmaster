import { ParametersListComponent } from './parameters-list/parameters-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParamsDetailsComponent } from './params-details/params-details.component';
import { AppAuthGuard } from '../app.authguard';

const routes: Routes = [
  {
    path: 'parameters/:arbpl',
    component: ParametersListComponent,
    canActivate: [AppAuthGuard],
    children: [
      { path: 'details/:dbParamId', component: ParamsDetailsComponent, canActivate: [AppAuthGuard]},
      // { path: '', redirectTo: '/parameters', pathMatch: 'full'},
    ]
  },
  // { path: '', redirectTo: '/parameters', pathMatch: 'full'},
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ParametersRoutingModule { }
