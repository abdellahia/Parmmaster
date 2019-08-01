/*import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs';
import { IParameter } from './shared/interfaces';


@Injectable()
export class ApiService {

  constructor(
    private http: Http,
  ) {
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
  public getAllParameters(): Observable<IParameter[]> {
    return this.http
      .get(API_URL + '/parameters')
      .map(response => {
        const parameters = response.json();
        return parameters.map((parameter) => new parameter(parameter));
      })
      .catch(this.handleError);
  }

  public createParameter(parameter: IParameter): Observable<IParameter> {
    return this.http
      .post(API_URL + '/parameters', parameter)
      .map(response => {
        return new Parameter(response.json());
      })
      .catch(this.handleError);
  }

  public getParameterById(tparameterId: number): Observable<IParameter> {
    return this.http
      .get(API_URL + '/parameters/' + tparameterId)
      .map(response => {
        return new Parameter(response.json());
      })
      .catch(this.handleError);
  }


  public updateParameter(parameter: IParameter): Observable<IParameter> {
    return this.http
      .put(API_URL + '/parameters/' + parameter.dbParamId, parameter)
      .map(response => {
        return new Parameter(response.json());
      })
      .catch(this.handleError);
  }

  public deleteParameterById(ParametrerId: number): Observable<null> {
    return this.http
      .delete(API_URL + '/parameters/' + ParametrerId)
      .map(response => null)
      .catch(this.handleError);
  }
}*/
