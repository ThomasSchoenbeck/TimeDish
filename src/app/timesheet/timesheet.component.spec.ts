/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { TimesheetComponent } from './timesheet.component';

import { TimesheetService } from '../shared/timesheet.service';
import { ProjectsService } from '../shared/projects.service';
import { WorkpackageService } from '../shared/workpackage.service';

describe('Component: Timesheet', () => {
  it('should create an instance', () => {
    let timesheetService: TimesheetService;
    let projectsService: ProjectsService;
    let workpackageService: WorkpackageService;

    let component = new TimesheetComponent(timesheetService, projectsService, workpackageService);
    expect(component).toBeTruthy();
  });
});
