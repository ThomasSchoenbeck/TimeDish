/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { TimesheetComponent } from './timesheet.component';

import { TimesheetService } from '../shared/timesheet.service';
import { TimeRecordService } from '../shared/time-record.service';
import { ProjectsService } from '../shared/projects.service';
import { WorkpackageService } from '../shared/workpackage.service';

import { Router, ActivatedRoute } from '@angular/router';

describe('Component: Timesheet', () => {
  it('should create an instance', () => {
    let timesheetService: TimesheetService;
    let timeRecordService: TimeRecordService;
    let projectsService: ProjectsService;
    let workpackageService: WorkpackageService;
    let router: Router;
    let activatedRoute: ActivatedRoute;

    let component = new TimesheetComponent(timesheetService, timeRecordService, projectsService, workpackageService, router, activatedRoute );
    expect(component).toBeTruthy();
  });
});
