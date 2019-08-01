import { ArbplClaim } from './arbplClaim';
import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IParameter } from '../../app/shared/interfaces';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {
  constructor(private http: HttpClient) { }

  @Input() // object to bind to internal methods

  baseUrl = 'assets/';
  parameters: IParameter[] = [];
  parameterNew: IParameter;
  private apiUrl = environment.apiUrl;

  getParameters(arbpl: string): Observable<IParameter[]> {
    return this.http.get<IParameter[]>(this.apiUrl + '/v1/parameter' + '?arbpl=' + arbpl)
      .pipe(
        catchError(this.handleError)
      );
  }


  getParameter(arbpl: string, dbParamId: string): Observable<IParameter> {
    return this.http.get<IParameter>(this.apiUrl + '/v1/parameter/' + dbParamId + '?arbpl=' + arbpl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getmsehCode(arbpl: string): Observable<any> {
    return this.http.get<string>(this.apiUrl + '/v1/Master/mseh' + '?arbpl=' + arbpl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getArbpl(): Observable<any> {
    return this.http.get<ArbplClaim[]>(this.apiUrl + '/v1/Auth/arbplclaims')
      .pipe(
        catchError(this.handleError)
      );
  }

  updateParameter(parameter: IParameter, arbpl: string) {
    const body = JSON.stringify(parameter);
    console.log(parameter.dbParamId);
    return this.http.post(this.apiUrl + '/v1/parameter/' + parameter.dbParamId + '?arbpl=' + arbpl,
      body, httpOptions);
  }

  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      // tslint:disable-next-line: deprecation
      return Observable.throw(errMessage);
    }
    // tslint:disable-next-line: deprecation
    return Observable.throw(error || 'Node.js server error');
  }

}
