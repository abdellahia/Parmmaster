import { MessageBus } from './core/messageBus.service';
import { AppAuthGuard } from './app.authguard';

import { DataService } from './core/data.services';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './utils/app-init';
import { APP_INITIALIZER } from '@angular/core';
import { ParametersListComponent } from './paramaters/parameters-list/parameters-list.component';
import { FilterTextboxComponent } from './paramaters/parameters-list/filter-textbox.component';
import { SorterService } from './core/sorter.service';
import { SharedModule } from './shared/shared.module';
import { ParamsDetailsComponent } from './paramaters/params-details/params-details.component';
import { ParamsDetailsModule } from './paramaters/params-details/params-details.module';
import { NumberValidatorDirective } from './shared/numbervalidation.directive';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ParametersModule } from './paramaters/parameters.module';
import { HeaderComponent } from './header/header.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ParametersListComponent,
    FilterTextboxComponent,
    ParamsDetailsComponent,
    NumberValidatorDirective,
    ForbiddenComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // tslint:disable-next-line: deprecation
    HttpModule,
    SharedModule,
    ParamsDetailsModule,
    AppRoutingModule,
    NgSelectModule,
    UiSwitchModule,
    KeycloakAngularModule,
    ParametersModule,
    NgZorroAntdModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [SorterService,
              DataService,
              {
                provide: APP_INITIALIZER,
                useFactory: initializer,
                multi: true,
                deps: [KeycloakService]
              },
              AppAuthGuard,
              MessageBus,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
