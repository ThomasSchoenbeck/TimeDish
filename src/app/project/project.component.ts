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
  private selectedProjects: Project[] = [];
  private errorMessage: string;

  constructor(private projectsService: ProjectsService) { }

  selectProject(project) {
    project.selected = !project.selected; //it should become it's opposite
    console.log(`project selected is: ${project.selected}`);
    this.projectsService.updateProject(project).subscribe(data => {
      project = data;
    });

    let partOfArray: boolean = false;
    // partOfArray ? true : this.selectedProjects.indexOf(project) != -1;
    if (this.selectedProjects.indexOf(project) != -1) {
      partOfArray = true;
    }
    
    console.log(`ProjectComponent: selectProject(): indexOf ${this.selectedProjects.indexOf(project) != -1}`);
    console.log(`ProjectComponent: selectProject(): ${project.name} is part of Array: ${partOfArray}`);

    if (project.selected && !partOfArray) {
      this.selectedProjects.push(project);
      console.log(`pushing - ${project.name} - into array`);
    } else if (!project.selected && partOfArray) {
      this.selectedProjects.splice(this.selectedProjects.indexOf(project));
      console.log(`removing - ${project.name} - from array`);
    }
    console.log(this.selectedProjects);
  }

  getProjects() {
    this.projectsService.getProjects()
                     .subscribe(
                       data =>  {
                         this.projects = data;
                        //  console.log(`projects: ${JSON.stringify(this.projects)}`);
                         
                         data.forEach(element => {
                           if (element.selected) {
                             console.log(`adding project (${element.name}) to selection based on status`);
                             this.selectedProjects.push(element);
                           }
                         });

                        },
                       error =>  this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.getProjects();
  }

}
