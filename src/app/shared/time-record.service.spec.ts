/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { TimeRecordService } from './time-record.service';

describe('Service: TimeRecord', () => {
  beforeEach(() => {
    addProviders([TimeRecordService]);
  });

  it('should ...',
    inject([TimeRecordService],
      (service: TimeRecordService) => {
        expect(service).toBeTruthy();
      }));
});
