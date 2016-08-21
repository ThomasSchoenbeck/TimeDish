import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import '../rxjs-operators';
import { environment } from '../environment';

import { Timesheet } from '../models/timesheet.model';
import { TimeRecord } from '../models/time-record.model';

@Injectable()
export class TimesheetService {

  private timesheet: Timesheet;
  private timeRecord: TimeRecord;

  private timeSheetURL = environment.API_BASE_URL + '/timesheet';

  constructor(private http: Http) { }

  getTimeSheetByWeekId(weekId): Observable<Timesheet> {
    return this.http.get(this.timeSheetURL + `?weekId=${weekId}`)
                    .map((res: Response) => {
                      let body = res.json();
                      return body[0] || { };
                    })
                    // .map(this.extractData)
                    .catch(this.handleError)
  }

updateTimesheet(timesheet: Timesheet): Observable<Timesheet> {
    let body = JSON.stringify({ timesheet });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    console.log(timesheet);
    console.log(body);

    return this.http.put(this.timeSheetURL + '/' + timesheet.id , timesheet, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  createTimeSheetByWeekId(weekId): Observable<Timesheet> {

    let setTime: string = '00:00';
    // let timeSheet = new Timesheet(weekId, false, setTime, setTime, setTime, setTime, setTime, setTime, setTime, setTime, setTime, setTime, setTime, setTime, setTime, setTime, setTime, setTime, setTime, setTime, setTime, setTime, setTime);
    let timeSheet = new Timesheet(weekId, weekId, false, setTime);

    let body = JSON.stringify({ timeSheet });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.timeSheetURL, timeSheet, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    // return body.data || { };
    // return body[0] || { };
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
