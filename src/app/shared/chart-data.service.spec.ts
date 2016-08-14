/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ChartDataService } from './chart-data.service';

describe('Service: ChartData', () => {
  beforeEach(() => {
    addProviders([ChartDataService]);
  });

  it('should ...',
    inject([ChartDataService],
      (service: ChartDataService) => {
        expect(service).toBeTruthy();
      }));
});
