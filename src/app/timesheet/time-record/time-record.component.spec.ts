/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { TimeRecordComponent } from './time-record.component';

import { TimeRecordService } from '../../shared/time-record.service';
import { WorkpackageService } from '../../shared/workpackage.service';

describe('Component: TimeRecord', () => {
  it('should create an instance', () => {

    let timeRecordService: TimeRecordService;
    let workpackageService: WorkpackageService;

    let component = new TimeRecordComponent(timeRecordService, workpackageService);
    expect(component).toBeTruthy();
  });
});
