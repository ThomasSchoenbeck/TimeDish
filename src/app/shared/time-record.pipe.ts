import { Pipe, PipeTransform } from '@angular/core';

import { TimeRecord } from '../models/time-record.model';

@Pipe({ name: 'timeRecord' })
export class TimeRecordPipe implements PipeTransform {

  transform(allTimeRecords: TimeRecord[], projectId?: number): any {
    return allTimeRecords.filter(timeRecord => timeRecord.projectId == projectId);
  }

}
      // console.log(`timeRecordPipe: projectId:  ${timeRecord.projectId} == ${projectId} `);
      // console.info(`timeRecordPipe: returning: timeRecord: ${JSON.stringify(timeRecord)}`);