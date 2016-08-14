import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Workpackage } from '../../models/workpackage.model';
import { TimeRecord } from '../../models/time-record.model';

import { TimeRecordService } from '../../shared/time-record.service';
import { WorkpackageService} from '../../shared/workpackage.service';

@Component({
  moduleId: module.id,
  selector: '[time-record]', //http://stackoverflow.com/questions/34556277/angular2-table-rows-as-component/34558208#34558208
  templateUrl: 'time-record.component.html',
  styleUrls: ['time-record.component.css'],
  providers: [ TimeRecordService, WorkpackageService ]
})
export class TimeRecordComponent implements OnInit {

  private workpackage: Workpackage;
  @Input('time-record') item: TimeRecord; //same above url
  @Output() recalc = new EventEmitter<any>();
  // @Output() recalc: any;
  private timeRecord: TimeRecord;

  constructor(private timeRecordService: TimeRecordService, private workpackageService: WorkpackageService) { }

  update(event, item) {
    // console.log(`this is an update using: event: ${event} and ngModel: ${JSON.stringify(item)}`);

    // console.info(event);
    // console.info(item);

    this.timeRecordService.updateTimeRecord(item).subscribe(data => this.timeRecord = data);

    if (this.timeRecord = item) {
      console.log(`timeRecord: both timeRecords are the same after put;`);
    } else {
      console.warn(`timeRecord: both timeRecords are NOT the same after put;`);
    }

    this.recalc.emit(item);
  }

  ngOnInit() {
    this.workpackageService.getWorkpackage(this.item.workpackageId).subscribe(data => this.workpackage = data);
  }

}
