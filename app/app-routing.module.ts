import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForbiddenComponent } from './forbidden/forbidden.component';


const routes: Routes = [
  { path: 'forbidden', component: ForbiddenComponent},
  // { path: '', redirectTo: '/parameters', pathMatch: 'full'},
  /*
    { path: 'kke-pm6/details/:dbParamId', component: ParamsDetailsComponent, data: { arbpl: 'kkepm6' }, canActivate: [AppAuthGuard] },
    { path: 'obk-pm5/details/:dbParamId', component: ParamsDetailsComponent, data: { arbpl: 'obkpm5' }, canActivate: [AppAuthGuard] },
  */
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
