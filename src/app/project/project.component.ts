import { Component, OnInit } from '@angular/core';

import { Project } from '../models/project.model';
import { ProjectsService } from '../shared/projects.service';

@Component({
  moduleId: module.id,
  selector: 'project',
  templateUrl: 'project.component.html',
  styleUrls: ['project.component.css'],
  providers: [ ProjectsService ]
})
export class ProjectComponent implements OnInit {

  private projects: Project[];
  private errorMessage: string;

  constructor(private projectsService: ProjectsService) { }

  getProjects() {
    this.projectsService.getProjects()
                     .subscribe(
                       data =>  {
                         this.projects = data;
                         console.log(`projects: ${JSON.stringify(this.projects)}`);
                        },
                       error =>  this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.getProjects();
  }

}
