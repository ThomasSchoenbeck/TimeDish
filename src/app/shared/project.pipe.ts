import { Pipe, PipeTransform } from '@angular/core';

import { Project } from '../models/project.model';

@Pipe({ name: 'project' })
export class ProjectPipe implements PipeTransform {

  transform(allProjects: Project[], id?: number): any {
    return allProjects.filter(project => project.id == id);
  }

}