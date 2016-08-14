/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { WorkpackageService } from './workpackage.service';

describe('Service: Workpackage', () => {
  beforeEach(() => {
    addProviders([WorkpackageService]);
  });

  it('should ...',
    inject([WorkpackageService],
      (service: WorkpackageService) => {
        expect(service).toBeTruthy();
      }));
});
