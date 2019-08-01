import { ParameterUpdated } from './../core/events/ParameterUpdated';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { DataService } from '../core/data.services';
import { ActivatedRoute, Router } from '@angular/router';
import { ArbplClaim } from '../core/arbplClaim';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { SubSink } from 'subsink';
import * as ngxToastr from 'ngx-toastr';
import 'bootstrap/dist/js/bootstrap.bundle';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  arb: ArbplClaim;
  public AvailArbpl: ArbplClaim[] = [];
  public arbpl: ArbplClaim;
  userDetails: KeycloakProfile;
  public faMapMarkerAlt = faMapMarkerAlt;
// tslint:disable-next-line: variable-name
  private _subs = new SubSink();

  @Output() eventClicked = new EventEmitter<Event>();

  onClick(event: Event): void {
    this.eventClicked.emit(event);
  }

  constructor(private keycloakService: KeycloakService,
              private toastr: ngxToastr.ToastrService,
              private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService, ) {
  }

  async ngOnInit() {
    if (await this.keycloakService.isLoggedIn()) {
      this.userDetails = await this.keycloakService.loadUserProfile();
    }
    this._subs.sink = this.dataService.getArbpl().subscribe(
      result => {
        this.AvailArbpl = result;
        console.log(this.AvailArbpl);
        if (this.AvailArbpl.length > 0) {
          const arbpl = this.AvailArbpl[0];
          this.onArbplChange(arbpl);
        }
      },
      error => {
        console.error(error);
        this.toastr.error('No arplz found', 'Error!');
      }
    );

  }

  public onArbplChange(arbpl: ArbplClaim) {
     this.arbpl = arbpl;
     this.router.navigate(['parameters', arbpl.id]);
  }
}
