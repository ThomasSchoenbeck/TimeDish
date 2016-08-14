/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { ProjectComponent } from './project.component';
import { ProjectsService } from '../shared/projects.service';

describe('Component: Project', () => {
  it('should create an instance', () => {
    let projectsService: ProjectsService;
    let component = new ProjectComponent(projectsService);
    expect(component).toBeTruthy();
  });
});
