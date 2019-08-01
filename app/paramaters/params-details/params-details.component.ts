import { ArbplClaim } from './../../core/arbplClaim';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, CanDeactivate } from '@angular/router';
import * as ngxToastr from 'ngx-toastr';
import { DataService } from '../../core/data.services';
import { IParameter } from '../../shared/interfaces';
import { SorterService } from '../../core/sorter.service';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { IMsehcode } from 'src/app/shared/mseh';
import { MessageBus } from 'src/app/core/messageBus.service';
import { SubSink } from 'subsink';
import { Observable } from 'rxjs';
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';


@Component({
  selector: 'app-params-details',
  templateUrl: './params-details.component.html',
  styleUrls: ['./params-details.component.css']
})

export class ParamsDetailsComponent implements OnInit, CanDeactivate<any> {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;

  @Input() get msehCode(): IMsehcode {
    return this.mseh;
  }
  @Input() event: Event;

  mseh: IMsehcode;
  arbpl: string;
  dbParamId: string;
  parameters: IParameter[] = [];
  parameter: IParameter;
  parameterOrig: IParameter;
  http: any;
  form: NgForm;
  // contactForm: FormGroup;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private sorterService: SorterService,
              private dataService: DataService,
              private route: ActivatedRoute,
              private toastr: ngxToastr.ToastrService,
              private router: Router,
  ) {
    // this.contactForm = this.createFormGroup();
  }

  /*createFormGroup() {
    return new FormGroup({
      dbParamId: new FormControl(''),
      laenge: new FormControl(''),
      leistVol: new FormControl(''),
      dbParamShorttext: new FormControl(''),
      dbParamLongtext: new FormControl(''),
      arbpl: new FormControl(''),
      werks: new FormControl(''),
      msehCode: new FormControl(''),
      ungWert: new FormControl(''),
      obgWert: new FormControl(''),
      technParm: new FormControl(''),
      direktEinst: new FormControl(''),
      slayerAggr: new FormControl(''),
      parametersTotal: new FormControl(''),
      opcTagName: new FormControl('')
    });
  }*/

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.arbpl = this.route.parent.snapshot.paramMap.get('arbpl');
      this.dbParamId = this.route.snapshot.paramMap.get('dbParamId');
      this.pubData(this.dbParamId, this.arbpl);
      this.pubMsehCode(this.arbpl);
 });
    this.arbpl = this.route.parent.snapshot.paramMap.get('arbpl');
    this.dbParamId = this.route.snapshot.paramMap.get('dbParamId');
    this.dataService.getParameter(this.arbpl, this.dbParamId).subscribe(() => {
      this.pubData(this.dbParamId, this.arbpl);
      this.pubMsehCode(this.arbpl);
    });
  }

  private pubData(dbParamId: string, arbpl: string) {
    this.dataService.getParameter(arbpl, dbParamId).subscribe((parameter: IParameter) => {
      this.parameter = parameter;
      this.parameterOrig = Object.assign({}, parameter);
    });
  }

  private pubMsehCode(arpbl: string) {
    this.dataService.getmsehCode(arpbl).subscribe((mseh: IMsehcode) => {
      this.mseh = mseh;
    });
  }

  updateParameter(parameter: IParameter, arbpl: string) {
    this.dataService.updateParameter(parameter, arbpl).subscribe(() => {
    });
  }

  sort(prop: string) {
    this.sorterService.sort(this.parameters, prop);
  }

  register(myForm: NgForm) {
    console.log('Successful registration');
    console.log(myForm);
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  discardChanges(f: NgForm) {
    console.log(JSON.stringify(this.parameter) + ' parameter modified');
    console.log(JSON.stringify(this.parameterOrig) + ' original parameter value');
    this.parameter = this.parameterOrig;
    // tslint:disable-next-line: no-string-literal
    this.form['_touched'] = false;
    // this.form.reset();
    // this.f.control.markAsDirty();
    console.log(JSON.stringify(this.parameter) + ' parameter after discard');
    // this.router.navigate(['./parameters', this.dbParamId]);
  }

  /*revert() {
    this.contactForm.reset();
  }*/
}
