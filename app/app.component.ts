import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  title = 'parmmaster';

  userDetails: KeycloakProfile;

  constructor(private keycloakService: KeycloakService,
  ) {
  }

  async ngOnInit() {
    if (await this.keycloakService.isLoggedIn()) {
      this.userDetails = await this.keycloakService.loadUserProfile();
    }
  }
  register(myForm: NgForm) {
    console.log('Successful registration');
    console.log(myForm);
  }



}


