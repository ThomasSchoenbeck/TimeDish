import { Injectable } from '@angular/core';

import { Http, URLSearchParams, Response } from '@angular/http';

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
  private timeRecordURL = environment.API_BASE_URL + '/timerecord';

  constructor(private http: Http) { }

  getTimeSheetByWeekId(weekId): Observable<Timesheet> {
    return this.http.get(this.timeSheetURL + `?weekId:${weekId}`)
                    .map((res: Response) => {
                      let body = res.json();
                      return body[0] || { };
                    })
                    .catch(this.handleError)
  }

  getTimeRecordByWeekId(weekId): Observable<TimeRecord[]> {
    return this.http.get(this.timeRecordURL + `?weekId:${weekId}`)
                    .map(this.extractData)
                    .catch(this.handleError)
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
