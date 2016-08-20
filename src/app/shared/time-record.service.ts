import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import '../rxjs-operators';
import { environment } from '../environment';

import { TimeRecord } from '../models/time-record.model';

@Injectable()
export class TimeRecordService {

  private timeRecord: TimeRecord;

  private timeRecordURL = environment.API_BASE_URL + '/timerecord';

  constructor(private http: Http) { }

  getTimeRecordByWeekId(weekId): Observable<TimeRecord[]> {
    return this.http.get(this.timeRecordURL + `?weekId=${weekId}`)
                    .map(this.extractData)
                    .catch(this.handleError)
  }

  updateTimeRecord(timeRecord: TimeRecord): Observable<TimeRecord> {
    let body = JSON.stringify({ timeRecord });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    console.log(timeRecord);
    console.log(body);

    return this.http.put(this.timeRecordURL + '/' + timeRecord.id , timeRecord, options)
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