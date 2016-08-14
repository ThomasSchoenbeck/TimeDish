import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import '../rxjs-operators';
import { environment } from '../environment';
import { Workpackage } from '../models/workpackage.model';

@Injectable()
export class WorkpackageService {

  private workpackagesURL = environment.API_BASE_URL + '/workpackages';

  constructor(private http: Http) { }

  getWorkpackages (): Observable<Workpackage[]> {
    return this.http.get(this.workpackagesURL)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getWorkpackage (id: number): Observable<Workpackage> {
    return this.http.get(this.workpackagesURL + '/' + id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getWorkpackagesById (ArrayOfWorkpackages: Array<any>): Observable<Workpackage[]> {
    console.log(`WorkpackageService: ArrayOfWorkpackages(length: ${ArrayOfWorkpackages.length}): ${JSON.stringify(ArrayOfWorkpackages)}`);
    if (ArrayOfWorkpackages.length > 0 ) {
      let idString: string = '';

      ArrayOfWorkpackages.forEach(element => {
        // console.log(`WorkpackageService: element ${JSON.stringify(element.id)}`);
        if (idString === '') {
          idString = idString + '?id=' + element.id;
        } else {
          idString = idString + '&id=' + element.id; 
        }
      });

      console.log(`WorkpackageService: idString: ${idString}`);
      return this.http.get(this.workpackagesURL + idString)
                      .map(this.extractData)
                      .catch(this.handleError);
    } else {
      console.log(`WorkpackageService: return empty Observable`);
      return Observable.of(null);
    }
  }

  private extractData(res: Response) {
    let body = res.json();
    // return body.data || { };
    return body || { };
  }
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}

