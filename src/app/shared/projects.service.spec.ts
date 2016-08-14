/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ProjectsService } from './projects.service';
import { Http } from '@angular/http';

describe('Service: Projects', () => {
  beforeEach(() => {
    addProviders([ProjectsService]);
  });

  it('should ...',
    inject([ProjectsService],
      (service: ProjectsService) => {
        expect(service).toBeTruthy();
      }));
});
