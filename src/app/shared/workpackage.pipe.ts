import { Pipe, PipeTransform } from '@angular/core';

import { Workpackage } from '../models/workpackage.model';

@Pipe({ name: 'workpackage' })
export class WorkpackagePipe implements PipeTransform {

  transform(allWorkpackages: Workpackage[], id?: number): any {
    // return allWorkpackages.filter(workpackage => workpackage.id == id);
    return allWorkpackages.filter(workpackage => {
      // console.log(`workpackgePipe: ${workpackage.id} == ${id}`)
     return workpackage.id == id;
    });
  }

}