/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { ReportComponent } from './report.component';

import { ChartDataService } from '../shared/chart-data.service';

describe('Component: Report', () => {
  it('should create an instance', () => {

    let chartDataService: ChartDataService
    let component = new ReportComponent(chartDataService);
    expect(component).toBeTruthy();
  });
});
