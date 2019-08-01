import { DataService } from '../../core/data.services';
import { Component, OnInit, Input } from '@angular/core';
import * as ngxToastr from 'ngx-toastr';
import { IParameter } from '../../shared/interfaces';
import { SorterService } from '../../core/sorter.service';
import { ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-parameters-list',
  templateUrl: './parameters-list.component.html',
  styleUrls: ['./parameters-list.component.css']
})
export class ParametersListComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  private _parameters: IParameter[] = [];
  // tslint:disable-next-line: variable-name
  private _subs = new SubSink();
  selected: any[];
  arbpl: string;
  public faMapMarkerAlt = faMapMarkerAlt;

  @Input() get parameters(): IParameter[] {
    return this._parameters;
  }


  set parameters(value: IParameter[]) {
    if (value) {
      this.filteredParameters = this._parameters = value;
      this.calculateParameters();
    }
  }

  parametersTotal: number;
  filteredParameters: IParameter[] = [];

  constructor(private sorterService: SorterService,
              private dataService: DataService,
              private route: ActivatedRoute,
              private toastr: ngxToastr.ToastrService,
  ) {
    this.arbpl = this.route.snapshot.paramMap.get('arbpl');
    this.getParameters(this.arbpl);
  }

  async ngOnInit() {
    this.route.url.subscribe(url => {
      this.arbpl = this.route.snapshot.paramMap.get('arbpl');
      this.getParameters(this.arbpl);
    });
  }

  getParameters(arbpl: string) {
    this._subs.sink = this.dataService.getParameters(arbpl).subscribe(
      result => {
        this.parameters = result;
      },
      error => {
        console.error(error);
        this.toastr.error('No parameter details found', 'Error!');
      }
    );

  }

  calculateParameters() {
    this.parametersTotal = 0;
    this.filteredParameters.forEach((param: any) => {
      this.parametersTotal++;
    });
  }

  filter(data: string) {
    if (data) {
      this.calculateParameters();
      this.filteredParameters = this.parameters.filter((param: IParameter) => {
        if (this.newMethod(param)) {
          return param.dbParamLongtext.toLowerCase().indexOf(data.toLowerCase()) > -1;
        }
      });
    } else {
      this.filteredParameters = this.parameters;
    }
    this.calculateParameters();
  }

  private newMethod(param: IParameter) {
    return param.dbParamLongtext;
  }

  sort(prop: string) {
    this.sorterService.sort(this.parameters, prop);
    console.log(this.parameters);
  }



}
