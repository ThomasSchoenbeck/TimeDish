/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { TimesheetService } from './timesheet.service';
import { Http } from '@angular/http';

describe('Service: Timesheet', () => {
  beforeEach(() => {
    addProviders([TimesheetService]);
  });

  it('should ...',
    inject([TimesheetService],
      (service: TimesheetService) => {
        expect(service).toBeTruthy();
      }));
});
